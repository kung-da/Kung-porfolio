import React, { useEffect, useRef } from 'react';

const sakura_point_vsh = `
uniform mat4 uProjection;
uniform mat4 uModelview;
uniform vec3 uResolution;
uniform vec3 uOffset;
uniform vec3 uDOF;  //x:focus distance, y:focus radius, z:max radius
uniform vec3 uFade; //x:start distance, y:half distance, z:near fade start

attribute vec3 aPosition;
attribute vec3 aEuler;
attribute vec2 aMisc; //x:size, y:fade

varying vec3 pposition;
varying float psize;
varying float palpha;
varying float pdist;

varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 normal;

varying float diffuse;
varying float specular;
varying float rstop;
varying float distancefade;

void main(void) {
    // Projection is based on vertical angle
    vec4 pos = uModelview * vec4(aPosition + uOffset, 1.0);
    gl_Position = uProjection * pos;
    gl_PointSize = aMisc.x * uProjection[1][1] / -pos.z * uResolution.y * 0.5;
    
    pposition = pos.xyz;
    psize = aMisc.x;
    pdist = length(pos.xyz);
    palpha = smoothstep(0.0, 1.0, (pdist - 0.1) / uFade.z);
    
    vec3 elrsn = sin(aEuler);
    vec3 elrcs = cos(aEuler);
    mat3 rotx = mat3(
        1.0, 0.0, 0.0,
        0.0, elrcs.x, elrsn.x,
        0.0, -elrsn.x, elrcs.x
    );
    mat3 roty = mat3(
        elrcs.y, 0.0, -elrsn.y,
        0.0, 1.0, 0.0,
        elrsn.y, 0.0, elrcs.y
    );
    mat3 rotz = mat3(
        elrcs.z, elrsn.z, 0.0, 
        -elrsn.z, elrcs.z, 0.0,
        0.0, 0.0, 1.0
    );
    mat3 rotmat = rotx * roty * rotz;
    normal = rotmat[2];
    
    mat3 trrotm = mat3(
        rotmat[0][0], rotmat[1][0], rotmat[2][0],
        rotmat[0][1], rotmat[1][1], rotmat[2][1],
        rotmat[0][2], rotmat[1][2], rotmat[2][2]
    );
    normX = trrotm[0];
    normY = trrotm[1];
    normZ = trrotm[2];
    
    const vec3 lit = vec3(0.6917144638660746, 0.6917144638660746, -0.20751433915982237);
    
    float tmpdfs = dot(lit, normal);
    if(tmpdfs < 0.0) {
        normal = -normal;
        tmpdfs = dot(lit, normal);
    }
    diffuse = 0.4 + tmpdfs;
    
    vec3 eyev = normalize(-pos.xyz);
    if(dot(eyev, normal) > 0.0) {
        vec3 hv = normalize(eyev + lit);
        specular = pow(max(dot(hv, normal), 0.0), 20.0);
    }
    else {
        specular = 0.0;
    }
    
    rstop = clamp((abs(pdist - uDOF.x) - uDOF.y) / uDOF.z, 0.0, 1.0);
    rstop = pow(rstop, 0.5);
    //-0.69315 = ln(0.5)
    distancefade = min(1.0, exp((uFade.x - pdist) * 0.69315 / uFade.y));
}
`;

const sakura_point_fsh = `
#ifdef GL_ES
//precision mediump float;
precision highp float;
#endif

uniform vec3 uDOF;  //x:focus distance, y:focus radius, z:max radius
uniform vec3 uFade; //x:start distance, y:half distance, z:near fade start

const vec3 fadeCol = vec3(0.08, 0.03, 0.06);

varying vec3 pposition;
varying float psize;
varying float palpha;
varying float pdist;

varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 normal;

varying float diffuse;
varying float specular;
varying float rstop;
varying float distancefade;

float ellipse(vec2 p, vec2 o, vec2 r) {
    vec2 lp = (p - o) / r;
    return length(lp) - 1.0;
}

void main(void) {
    vec3 p = vec3(gl_PointCoord - vec2(0.5, 0.5), 0.0) * 2.0;
    vec3 d = vec3(0.0, 0.0, -1.0);
    float nd = normZ.z; 
    if(abs(nd) < 0.0001) discard;
    
    float np = dot(normZ, p);
    vec3 tp = p + d * np / nd;
    vec2 coord = vec2(dot(normX, tp), dot(normY, tp));
    
    //angle = 15 degree
    const float flwrsn = 0.258819045102521;
    const float flwrcs = 0.965925826289068;
    mat2 flwrm = mat2(flwrcs, -flwrsn, flwrsn, flwrcs);
    vec2 flwrp = vec2(abs(coord.x), coord.y) * flwrm;
    
    float r;
    if(flwrp.x < 0.0) {
        r = ellipse(flwrp, vec2(0.065, 0.024) * 0.5, vec2(0.36, 0.96) * 0.5);
    }
    else {
        r = ellipse(flwrp, vec2(0.065, 0.024) * 0.5, vec2(0.58, 0.96) * 0.5);
    }
    
    if(r > rstop) discard;
    
    vec3 col = mix(vec3(0.95, 0.74, 0.82), vec3(1.0, 0.85, 0.9), r);
    float grady = mix(0.0, 1.0, pow(coord.y * 0.5 + 0.5, 0.35));
    col *= vec3(1.0, grady, grady);
    col *= mix(0.8, 1.0, pow(abs(coord.x), 0.3));
    col = col * diffuse + specular;
    
    col = mix(fadeCol, col, distancefade);
    
    float alpha = (rstop > 0.001)? (0.5 - r / (rstop * 2.0)) : 1.0;
    alpha = smoothstep(0.0, 1.0, alpha) * palpha;
    
    gl_FragColor = vec4(col * 0.5, alpha);
}
`;


const SakuraBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const perf = {
            sortEvery: 2,
            maxDelta: 0.05
        };

        let gl: WebGLRenderingContext | null;
        try {
            gl = (canvas.getContext('experimental-webgl', { alpha: true }) ||
                  canvas.getContext('webgl', { alpha: true })) as WebGLRenderingContext;
        } catch (e) {
            console.error('WebGL not supported.', e);
            return;
        }

        if (!gl) {
            console.error('WebGL context could not be initialized.');
            return;
        }

        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            scrollVelocity += Math.abs(window.scrollY - lastScrollY) * 0.05;
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Utilities
        const Vector3: any = {};
        const Matrix44: any = {};

        Vector3.create = function(x: number, y: number, z: number) {
            return {'x':x, 'y':y, 'z':z};
        };
        Vector3.dot = function (v0: any, v1: any) {
            return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
        };
        Vector3.cross = function (v: any, v0: any, v1: any) {
            v.x = v0.y * v1.z - v0.z * v1.y;
            v.y = v0.z * v1.x - v0.x * v1.z;
            v.z = v0.x * v1.y - v0.y * v1.x;
        };
        Vector3.normalize = function (v: any) {
            let l = v.x * v.x + v.y * v.y + v.z * v.z;
            if(l > 0.00001) {
                l = 1.0 / Math.sqrt(l);
                v.x *= l;
                v.y *= l;
                v.z *= l;
            }
        };
        Vector3.arrayForm = function(v: any) {
            if(v.array) {
                v.array[0] = v.x;
                v.array[1] = v.y;
                v.array[2] = v.z;
            } else {
                v.array = new Float32Array([v.x, v.y, v.z]);
            }
            return v.array;
        };

        Matrix44.createIdentity = function () {
            return new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
        };
        Matrix44.loadProjection = function (m: any, aspect: number, vdeg: number, near: number, far: number) {
            let h = near * Math.tan(vdeg * Math.PI / 180.0 * 0.5) * 2.0;
            let w = h * aspect;
            
            m[0] = 2.0 * near / w;
            m[1] = 0.0;
            m[2] = 0.0;
            m[3] = 0.0;
            
            m[4] = 0.0;
            m[5] = 2.0 * near / h;
            m[6] = 0.0;
            m[7] = 0.0;
            
            m[8] = 0.0;
            m[9] = 0.0;
            m[10] = -(far + near) / (far - near);
            m[11] = -1.0;
            
            m[12] = 0.0;
            m[13] = 0.0;
            m[14] = -2.0 * far * near / (far - near);
            m[15] = 0.0;
        };
        Matrix44.loadLookAt = function (m: any, vpos: any, vlook: any, vup: any) {
            let frontv = Vector3.create(vpos.x - vlook.x, vpos.y - vlook.y, vpos.z - vlook.z);
            Vector3.normalize(frontv);
            let sidev = Vector3.create(1.0, 0.0, 0.0);
            Vector3.cross(sidev, vup, frontv);
            Vector3.normalize(sidev);
            let topv = Vector3.create(1.0, 0.0, 0.0);
            Vector3.cross(topv, frontv, sidev);
            Vector3.normalize(topv);
            
            m[0] = sidev.x;
            m[1] = topv.x;
            m[2] = frontv.x;
            m[3] = 0.0;
            
            m[4] = sidev.y;
            m[5] = topv.y;
            m[6] = frontv.y;
            m[7] = 0.0;
            
            m[8] = sidev.z;
            m[9] = topv.z;
            m[10] = frontv.z;
            m[11] = 0.0;
            
            m[12] = -(vpos.x * m[0] + vpos.y * m[4] + vpos.z * m[8]);
            m[13] = -(vpos.x * m[1] + vpos.y * m[5] + vpos.z * m[9]);
            m[14] = -(vpos.x * m[2] + vpos.y * m[6] + vpos.z * m[10]);
            m[15] = 1.0;
        };

        const timeInfo = {
            'start': 0, 'prev': 0,
            'delta': 0, 'elapsed': 0
        };

        const renderSpec: any = {
            'width': 0,
            'height': 0,
            'aspect': 1,
            'array': new Float32Array(3)
        };

        renderSpec.setSize = function(w: number, h: number) {
            renderSpec.width = w;
            renderSpec.height = h;
            renderSpec.aspect = renderSpec.width / renderSpec.height;
            renderSpec.array[0] = renderSpec.width;
            renderSpec.array[1] = renderSpec.height;
            renderSpec.array[2] = renderSpec.aspect;
        };


        function compileShader(shtype: number, shsrc: string) {
            const retsh = gl!.createShader(shtype);
            if (!retsh) return null;

            gl!.shaderSource(retsh, shsrc);
            gl!.compileShader(retsh);
            
            if(!gl!.getShaderParameter(retsh, gl!.COMPILE_STATUS)) {
                const errlog = gl!.getShaderInfoLog(retsh);
                gl!.deleteShader(retsh);
                console.error(errlog);
                return null;
            }
            return retsh;
        }

        function createShader(vtxsrc: string, frgsrc: string, uniformlist: string[] | null, attrlist: string[] | null) {
            const vsh = compileShader(gl!.VERTEX_SHADER, vtxsrc);
            const fsh = compileShader(gl!.FRAGMENT_SHADER, frgsrc);
            
            if(vsh == null || fsh == null) {
                return null;
            }
            
            const prog: any = gl!.createProgram();
            gl!.attachShader(prog, vsh);
            gl!.attachShader(prog, fsh);
            
            gl!.deleteShader(vsh);
            gl!.deleteShader(fsh);
            
            gl!.linkProgram(prog);
            if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) {
                const errlog = gl!.getProgramInfoLog(prog);
                console.error(errlog);
                return null;
            }
            
            if(uniformlist) {
                prog.uniforms = {};
                for(let i = 0; i < uniformlist.length; i++) {
                    prog.uniforms[uniformlist[i]] = gl!.getUniformLocation(prog, uniformlist[i]);
                }
            }
            
            if(attrlist) {
                prog.attributes = {};
                for(let i = 0; i < attrlist.length; i++) {
                    const attr = attrlist[i];
                    prog.attributes[attr] = gl!.getAttribLocation(prog, attr);
                }
            }
            
            return prog;
        }

        function useShader(prog: any) {
            gl!.useProgram(prog);
            for(const attr in prog.attributes) {
                gl!.enableVertexAttribArray(prog.attributes[attr]);
            }
        }

        function unuseShader(prog: any) {
            for(const attr in prog.attributes) {
                gl!.disableVertexAttribArray(prog.attributes[attr]);
            }
            gl!.useProgram(null);
        }

        const projection: any = {
            'angle': 60,
            'nearfar': new Float32Array([0.1, 100.0]),
            'matrix': Matrix44.createIdentity()
        };
        const camera: any = {
            'position': Vector3.create(0, 0, 100),
            'lookat': Vector3.create(0, 0, 0),
            'up': Vector3.create(0, 1, 0),
            'dof': Vector3.create(10.0, 4.0, 8.0),
            'matrix': Matrix44.createIdentity()
        };

        const pointFlower: any = {};
        let sceneStandBy = false;
        let frameCount = 0;

        class BlossomParticle {
            velocity: number[];
            rotation: number[];
            position: number[];
            euler: number[];
            size: number;
            alpha: number;
            zkey: number;

            constructor() {
                this.velocity = new Array(3);
                this.rotation = new Array(3);
                this.position = new Array(3);
                this.euler = new Array(3);
                this.size = 1.0;
                this.alpha = 1.0;
                this.zkey = 0.0;
            }

            setVelocity(vx: number, vy: number, vz: number) {
                this.velocity[0] = vx;
                this.velocity[1] = vy;
                this.velocity[2] = vz;
            }

            setRotation(rx: number, ry: number, rz: number) {
                this.rotation[0] = rx;
                this.rotation[1] = ry;
                this.rotation[2] = rz;
            }

            setPosition(nx: number, ny: number, nz: number) {
                this.position[0] = nx;
                this.position[1] = ny;
                this.position[2] = nz;
            }

            setEulerAngles(rx: number, ry: number, rz: number) {
                this.euler[0] = rx;
                this.euler[1] = ry;
                this.euler[2] = rz;
            }

            setSize(s: number) {
                this.size = s;
            }

            update(dt: number, et: number) {
                this.position[0] += this.velocity[0] * dt;
                // Add scroll momentum to the Y-axis velocity (falling downwards faster)
                this.position[1] += (this.velocity[1] - scrollVelocity) * dt;
                this.position[2] += this.velocity[2] * dt;
                
                this.euler[0] += this.rotation[0] * dt;
                this.euler[1] += this.rotation[1] * dt;
                this.euler[2] += this.rotation[2] * dt;
            }
        }

        function createPointFlowers() {
            const prm = gl!.getParameter(gl!.ALIASED_POINT_SIZE_RANGE);
            renderSpec.pointSize = {'min': prm[0], 'max': prm[1]};
            
            pointFlower.program = createShader(
                sakura_point_vsh, sakura_point_fsh,
                ['uProjection', 'uModelview', 'uResolution', 'uOffset', 'uDOF', 'uFade'],
                ['aPosition', 'aEuler', 'aMisc']
            );
            
            useShader(pointFlower.program);
            pointFlower.offset = new Float32Array([0.0, 0.0, 0.0]);
            pointFlower.fader = Vector3.create(0.0, 10.0, 0.0);
            
            pointFlower.numFlowers = 2000;
            pointFlower.particles = new Array(pointFlower.numFlowers);
            pointFlower.dataArray = new Float32Array(pointFlower.numFlowers * (3 + 3 + 2));
            pointFlower.positionArrayOffset = 0;
            pointFlower.eulerArrayOffset = pointFlower.numFlowers * 3;
            pointFlower.miscArrayOffset = pointFlower.numFlowers * 6;
            
            pointFlower.buffer = gl!.createBuffer();
            gl!.bindBuffer(gl!.ARRAY_BUFFER, pointFlower.buffer);
            gl!.bufferData(gl!.ARRAY_BUFFER, pointFlower.dataArray, gl!.DYNAMIC_DRAW);
            gl!.bindBuffer(gl!.ARRAY_BUFFER, null);
            
            unuseShader(pointFlower.program);
            
            for(let i = 0; i < pointFlower.numFlowers; i++) {
                pointFlower.particles[i] = new BlossomParticle();
            }
        }

        function initPointFlowers() {
            pointFlower.area = Vector3.create(20.0, 20.0, 20.0);
            pointFlower.area.x = pointFlower.area.y * renderSpec.aspect;
            
            pointFlower.fader.x = 10.0;
            pointFlower.fader.y = pointFlower.area.z;
            pointFlower.fader.z = 0.1;
            
            const PI2 = Math.PI * 2.0;
            const tmpv3 = Vector3.create(0, 0, 0);
            let tmpv = 0;
            const symmetryrand = function() {return (Math.random() * 2.0 - 1.0);};
            
            for(let i = 0; i < pointFlower.numFlowers; i++) {
                const tmpprtcl = pointFlower.particles[i];
                
                tmpv3.x = symmetryrand() * 0.3 + 0.8;
                tmpv3.y = symmetryrand() * 0.2 - 1.0;
                tmpv3.z = symmetryrand() * 0.3 + 0.5;
                Vector3.normalize(tmpv3);
                tmpv = 2.0 + Math.random() * 1.0;
                tmpprtcl.setVelocity(tmpv3.x * tmpv, tmpv3.y * tmpv, tmpv3.z * tmpv);
                
                tmpprtcl.setRotation(
                    symmetryrand() * PI2 * 0.5,
                    symmetryrand() * PI2 * 0.5,
                    symmetryrand() * PI2 * 0.5
                );
                
                tmpprtcl.setPosition(
                    symmetryrand() * pointFlower.area.x,
                    symmetryrand() * pointFlower.area.y,
                    symmetryrand() * pointFlower.area.z
                );
                
                tmpprtcl.setEulerAngles(
                    Math.random() * Math.PI * 2.0,
                    Math.random() * Math.PI * 2.0,
                    Math.random() * Math.PI * 2.0
                );
                
                tmpprtcl.setSize(0.9 + Math.random() * 0.1);
            }
        }

        function renderPointFlowers() {
            const PI2 = Math.PI * 2.0;
            const repeatPos = function (prt: any, cmp: number, limit: number) {
                if(Math.abs(prt.position[cmp]) - prt.size * 0.5 > limit) {
                    if(prt.position[cmp] > 0) {
                        prt.position[cmp] -= limit * 2.0;
                    } else {
                        prt.position[cmp] += limit * 2.0;
                    }
                }
            };
            const repeatEuler = function (prt: any, cmp: number) {
                prt.euler[cmp] = prt.euler[cmp] % PI2;
                if(prt.euler[cmp] < 0.0) {
                    prt.euler[cmp] += PI2;
                }
            };
            
            for(let i = 0; i < pointFlower.numFlowers; i++) {
                const prtcl = pointFlower.particles[i];
                prtcl.update(timeInfo.delta, timeInfo.elapsed);
                repeatPos(prtcl, 0, pointFlower.area.x);
                repeatPos(prtcl, 1, pointFlower.area.y);
                repeatPos(prtcl, 2, pointFlower.area.z);
                repeatEuler(prtcl, 0);
                repeatEuler(prtcl, 1);
                repeatEuler(prtcl, 2);
                
                prtcl.alpha = 1.0;
                
                prtcl.zkey = (camera.matrix[2] * prtcl.position[0]
                            + camera.matrix[6] * prtcl.position[1]
                            + camera.matrix[10] * prtcl.position[2]
                            + camera.matrix[14]);
            }
            
            if (frameCount % perf.sortEvery === 0) {
                pointFlower.particles.sort(function(p0: any, p1: any){return p0.zkey - p1.zkey;});
            }
            
            let ipos = pointFlower.positionArrayOffset;
            let ieuler = pointFlower.eulerArrayOffset;
            let imisc = pointFlower.miscArrayOffset;
            for(let i = 0; i < pointFlower.numFlowers; i++) {
                const prtcl = pointFlower.particles[i];
                pointFlower.dataArray[ipos] = prtcl.position[0];
                pointFlower.dataArray[ipos + 1] = prtcl.position[1];
                pointFlower.dataArray[ipos + 2] = prtcl.position[2];
                ipos += 3;
                pointFlower.dataArray[ieuler] = prtcl.euler[0];
                pointFlower.dataArray[ieuler + 1] = prtcl.euler[1];
                pointFlower.dataArray[ieuler + 2] = prtcl.euler[2];
                ieuler += 3;
                pointFlower.dataArray[imisc] = prtcl.size;
                pointFlower.dataArray[imisc + 1] = prtcl.alpha;
                imisc += 2;
            }
            
            gl!.enable(gl!.BLEND);
            gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
            
            const prog = pointFlower.program;
            useShader(prog);
            
            gl!.uniformMatrix4fv(prog.uniforms.uProjection, false, projection.matrix);
            gl!.uniformMatrix4fv(prog.uniforms.uModelview, false, camera.matrix);
            gl!.uniform3fv(prog.uniforms.uResolution, renderSpec.array);
            gl!.uniform3fv(prog.uniforms.uDOF, Vector3.arrayForm(camera.dof));
            gl!.uniform3fv(prog.uniforms.uFade, Vector3.arrayForm(pointFlower.fader));
            
            gl!.bindBuffer(gl!.ARRAY_BUFFER, pointFlower.buffer);
            gl!.bufferData(gl!.ARRAY_BUFFER, pointFlower.dataArray, gl!.DYNAMIC_DRAW);
            
            gl!.vertexAttribPointer(prog.attributes.aPosition, 3, gl!.FLOAT, false, 0, pointFlower.positionArrayOffset * Float32Array.BYTES_PER_ELEMENT);
            gl!.vertexAttribPointer(prog.attributes.aEuler, 3, gl!.FLOAT, false, 0, pointFlower.eulerArrayOffset * Float32Array.BYTES_PER_ELEMENT);
            gl!.vertexAttribPointer(prog.attributes.aMisc, 2, gl!.FLOAT, false, 0, pointFlower.miscArrayOffset * Float32Array.BYTES_PER_ELEMENT);
            
            for(let i = 1; i < 2; i++) {
                const zpos = i * -2.0;
                pointFlower.offset[0] = pointFlower.area.x * -1.0;
                pointFlower.offset[1] = pointFlower.area.y * -1.0;
                pointFlower.offset[2] = pointFlower.area.z * zpos;
                gl!.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
                gl!.drawArrays(gl!.POINT, 0, pointFlower.numFlowers);
                
                pointFlower.offset[0] = pointFlower.area.x * -1.0;
                pointFlower.offset[1] = pointFlower.area.y *  1.0;
                pointFlower.offset[2] = pointFlower.area.z * zpos;
                gl!.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
                gl!.drawArrays(gl!.POINT, 0, pointFlower.numFlowers);
                
                pointFlower.offset[0] = pointFlower.area.x *  1.0;
                pointFlower.offset[1] = pointFlower.area.y * -1.0;
                pointFlower.offset[2] = pointFlower.area.z * zpos;
                gl!.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
                gl!.drawArrays(gl!.POINT, 0, pointFlower.numFlowers);
                
                pointFlower.offset[0] = pointFlower.area.x *  1.0;
                pointFlower.offset[1] = pointFlower.area.y *  1.0;
                pointFlower.offset[2] = pointFlower.area.z * zpos;
                gl!.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
                gl!.drawArrays(gl!.POINT, 0, pointFlower.numFlowers);
            }
            
            pointFlower.offset[0] = 0.0;
            pointFlower.offset[1] = 0.0;
            pointFlower.offset[2] = 0.0;
            gl!.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
            gl!.drawArrays(gl!.POINT, 0, pointFlower.numFlowers);
            
            gl!.bindBuffer(gl!.ARRAY_BUFFER, null);
            unuseShader(prog);
            
            gl!.enable(gl!.DEPTH_TEST);
            gl!.disable(gl!.BLEND);
        }


        function createScene() {
            createPointFlowers();
            sceneStandBy = true;
        }

        function initScene() {
            initPointFlowers();
            camera.position.z = pointFlower.area.z + projection.nearfar[0];
            projection.angle = Math.atan2(pointFlower.area.y, camera.position.z + pointFlower.area.z) * 180.0 / Math.PI * 2.0;
            Matrix44.loadProjection(projection.matrix, renderSpec.aspect, projection.angle, projection.nearfar[0], projection.nearfar[1]);
        }

        function renderScene() {
            Matrix44.loadLookAt(camera.matrix, camera.position, camera.lookat, camera.up);
            
            gl!.enable(gl!.DEPTH_TEST);
            
            gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
            gl!.viewport(0, 0, renderSpec.width, renderSpec.height);
            gl!.clearColor(0.0, 0.0, 0.0, 0.0);
            gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
            
            renderPointFlowers();
        }

        function makeCanvasFullScreen(canvasElem: HTMLCanvasElement) {
            canvasElem.width = window.innerWidth;
            canvasElem.height = window.innerHeight;
        }

        function setViewports() {
            makeCanvasFullScreen(canvas!);
            renderSpec.setSize(gl!.canvas.width, gl!.canvas.height);
            
            gl!.clearColor(0.0, 0.0, 0.0, 0.0);
            gl!.viewport(0, 0, renderSpec.width, renderSpec.height);
        }

        function onResize() {
            setViewports();
            if(sceneStandBy) {
                initScene();
            }
        }

        window.addEventListener('resize', onResize);
        
        setViewports();
        createScene();
        initScene();
        
        timeInfo.start = performance.now();
        timeInfo.prev = timeInfo.start;
        
        let animationFrameId: number;
        let animating = true;
        let isVisible = true;

        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        
        if (canvas) observer.observe(canvas);

        function animate() {
            if (!animating) return;
            animationFrameId = requestAnimationFrame(animate);
            
            // SKIP HEAVY CALCULATIONS IF NOT VISIBLE
            if (!isVisible || document.hidden) return;

            const now = performance.now();
            timeInfo.elapsed = (now - timeInfo.start) / 1000.0;
            timeInfo.delta = Math.min((now - timeInfo.prev) / 1000.0, perf.maxDelta);
            timeInfo.prev = now;
            frameCount += 1;
            
            scrollVelocity *= 0.92;
            
            renderScene();
        }

        animate();

        return () => {
            animating = false;
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            id="sakura" 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default SakuraBackground;
