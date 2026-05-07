import { useEffect, useRef } from "react";
import {
  SAKURA_POINT_VSH, SAKURA_POINT_FSH,
  FX_COMMON_VSH, BG_FSH, FX_BRIGHTBUF_FSH, FX_DIRBLUR_FSH,
  PP_FINAL_VSH, PP_FINAL_FSH,
} from "@/lib/sakura-shaders";

/* ─── tiny math helpers (ported from original) ─── */
const V3 = {
  create: (x: number, y: number, z: number) => ({ x, y, z, array: null as Float32Array | null }),
  normalize(v: { x: number; y: number; z: number }) {
    let l = v.x * v.x + v.y * v.y + v.z * v.z;
    if (l > 1e-5) { l = 1 / Math.sqrt(l); v.x *= l; v.y *= l; v.z *= l; }
  },
  cross(out: any, a: any, b: any) { out.x = a.y * b.z - a.z * b.y; out.y = a.z * b.x - a.x * b.z; out.z = a.x * b.y - a.y * b.x; },
  arrayForm(v: any): Float32Array {
    if (v.array) { v.array[0] = v.x; v.array[1] = v.y; v.array[2] = v.z; }
    else v.array = new Float32Array([v.x, v.y, v.z]);
    return v.array!;
  },
};

const M44 = {
  identity: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
  loadProjection(m: Float32Array, aspect: number, vdeg: number, near: number, far: number) {
    const h = near * Math.tan(vdeg * Math.PI / 180 * 0.5) * 2, w = h * aspect;
    m.fill(0); m[0] = 2*near/w; m[5] = 2*near/h; m[10] = -(far+near)/(far-near); m[11] = -1; m[14] = -2*far*near/(far-near);
  },
  loadLookAt(m: Float32Array, vpos: any, vlook: any, vup: any) {
    const f = V3.create(vpos.x-vlook.x, vpos.y-vlook.y, vpos.z-vlook.z); V3.normalize(f);
    const s = V3.create(0,0,0); V3.cross(s, vup, f); V3.normalize(s);
    const t = V3.create(0,0,0); V3.cross(t, f, s); V3.normalize(t);
    m[0]=s.x;m[1]=t.x;m[2]=f.x;m[3]=0; m[4]=s.y;m[5]=t.y;m[6]=f.y;m[7]=0; m[8]=s.z;m[9]=t.z;m[10]=f.z;m[11]=0;
    m[12]=-(vpos.x*m[0]+vpos.y*m[4]+vpos.z*m[8]); m[13]=-(vpos.x*m[1]+vpos.y*m[5]+vpos.z*m[9]); m[14]=-(vpos.x*m[2]+vpos.y*m[6]+vpos.z*m[10]); m[15]=1;
  },
};

/* ─── Blossom particle ─── */
class Blossom {
  velocity = [0,0,0]; rotation = [0,0,0]; position = [0,0,0]; euler = [0,0,0];
  size = 1; alpha = 1; zkey = 0;
  baseVelocity = [0,0,0]; // store original velocity for scroll effect
  update(dt: number) {
    for (let i = 0; i < 3; i++) { this.position[i] += this.velocity[i] * dt; this.euler[i] += this.rotation[i] * dt; }
  }
}

export const SakuraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let gl: WebGLRenderingContext | null = null;
    try { gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext; }
    catch { return; }
    if (!gl) return;
    const G = gl;

    let animating = true;
    let scrollGravity = 0;      // current scroll-boost
    let scrollTarget = 0;       // target scroll-boost

    /* scroll-gravity listener */
    const onWheel = (e: WheelEvent) => { scrollTarget = Math.min(12, Math.abs(e.deltaY) * 0.08); };
    window.addEventListener("wheel", onWheel, { passive: true });

    /* ── render spec ── */
    const spec = {
      w: 0, h: 0, aspect: 1, arr: new Float32Array(3),
      hw: 0, hh: 0, hArr: new Float32Array(3),
      mainRT: null as any, wFullRT0: null as any, wFullRT1: null as any, wHalfRT0: null as any, wHalfRT1: null as any,
    };
    const setSize = (w: number, h: number) => {
      spec.w = w; spec.h = h; spec.aspect = w / h;
      spec.arr[0] = w; spec.arr[1] = h; spec.arr[2] = spec.aspect;
      spec.hw = w >> 1; spec.hh = h >> 1;
      spec.hArr[0] = spec.hw; spec.hArr[1] = spec.hh; spec.hArr[2] = spec.hw / spec.hh;
    };

    /* ── RT helpers ── */
    const deleteRT = (rt: any) => { G.deleteFramebuffer(rt.fb); G.deleteRenderbuffer(rt.rb); G.deleteTexture(rt.tex); };
    const createRT = (w: number, h: number) => {
      const fb = G.createFramebuffer()!, rb = G.createRenderbuffer()!, tex = G.createTexture()!;
      G.bindTexture(G.TEXTURE_2D, tex);
      G.texImage2D(G.TEXTURE_2D, 0, G.RGBA, w, h, 0, G.RGBA, G.UNSIGNED_BYTE, null);
      G.texParameteri(G.TEXTURE_2D, G.TEXTURE_WRAP_S, G.CLAMP_TO_EDGE);
      G.texParameteri(G.TEXTURE_2D, G.TEXTURE_WRAP_T, G.CLAMP_TO_EDGE);
      G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MAG_FILTER, G.LINEAR);
      G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MIN_FILTER, G.LINEAR);
      G.bindFramebuffer(G.FRAMEBUFFER, fb);
      G.framebufferTexture2D(G.FRAMEBUFFER, G.COLOR_ATTACHMENT0, G.TEXTURE_2D, tex, 0);
      G.bindRenderbuffer(G.RENDERBUFFER, rb);
      G.renderbufferStorage(G.RENDERBUFFER, G.DEPTH_COMPONENT16, w, h);
      G.framebufferRenderbuffer(G.FRAMEBUFFER, G.DEPTH_ATTACHMENT, G.RENDERBUFFER, rb);
      G.bindTexture(G.TEXTURE_2D, null); G.bindRenderbuffer(G.RENDERBUFFER, null); G.bindFramebuffer(G.FRAMEBUFFER, null);
      return { fb, rb, tex, w, h, dtx: new Float32Array([1/w, 1/h]) };
    };

    /* ── shader compile ── */
    const compile = (type: number, src: string) => {
      const s = G.createShader(type)!; G.shaderSource(s, src); G.compileShader(s);
      if (!G.getShaderParameter(s, G.COMPILE_STATUS)) { console.error(G.getShaderInfoLog(s)); G.deleteShader(s); return null; }
      return s;
    };
    const mkProg = (vs: string, fs: string, unis: string[], attrs: string[]) => {
      const v = compile(G.VERTEX_SHADER, vs), f = compile(G.FRAGMENT_SHADER, fs);
      if (!v || !f) return null;
      const p = G.createProgram()!; G.attachShader(p, v); G.attachShader(p, f); G.deleteShader(v); G.deleteShader(f); G.linkProgram(p);
      if (!G.getProgramParameter(p, G.LINK_STATUS)) { console.error(G.getProgramInfoLog(p)); return null; }
      const u: any = {}, a: any = {};
      unis.forEach(n => u[n] = G.getUniformLocation(p, n));
      attrs.forEach(n => a[n] = G.getAttribLocation(p, n));
      return { p, u, a };
    };
    const useProg = (pr: any) => { G.useProgram(pr.p); for (const k in pr.a) G.enableVertexAttribArray(pr.a[k]); };
    const unuseProg = (pr: any) => { for (const k in pr.a) G.disableVertexAttribArray(pr.a[k]); G.useProgram(null); };

    /* ── effect program helper ── */
    const mkFx = (vs: string, fs: string, exU?: string[]) => {
      const unis = ["uResolution", "uSrc", "uDelta", ...(exU || [])];
      const pr = mkProg(vs, fs, unis, ["aPosition"])!;
      useProg(pr);
      const buf = G.createBuffer()!;
      G.bindBuffer(G.ARRAY_BUFFER, buf);
      G.bufferData(G.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), G.STATIC_DRAW);
      G.bindBuffer(G.ARRAY_BUFFER, null);
      unuseProg(pr);
      return { pr, buf };
    };
    const useFx = (fx: any, src: any) => {
      useProg(fx.pr);
      G.uniform3fv(fx.pr.u.uResolution, spec.arr);
      if (src) { G.uniform2fv(fx.pr.u.uDelta, src.dtx); G.uniform1i(fx.pr.u.uSrc, 0); G.activeTexture(G.TEXTURE0); G.bindTexture(G.TEXTURE_2D, src.tex); }
    };
    const drawFx = (fx: any) => { G.bindBuffer(G.ARRAY_BUFFER, fx.buf); G.vertexAttribPointer(fx.pr.a.aPosition, 2, G.FLOAT, false, 0, 0); G.drawArrays(G.TRIANGLE_STRIP, 0, 4); };

    /* ── camera & projection ── */
    const proj = { angle: 60, nf: new Float32Array([0.1, 100]), mat: M44.identity() };
    const cam = { pos: V3.create(0,0,100), look: V3.create(0,0,0), up: V3.create(0,1,0), dof: V3.create(10,4,8), mat: M44.identity() };

    /* ── particles ── */
    const NUM = 1600;
    const particles: Blossom[] = [];
    let pfProg: any = null, pfBuf: WebGLBuffer | null = null;
    const pfData = new Float32Array(NUM * 8);
    const pfOff = new Float32Array(3);
    const pfFader = V3.create(0, 10, 0);
    const pfArea = V3.create(20, 20, 20);

    const initParticles = () => {
      pfArea.x = pfArea.y * spec.aspect;
      pfFader.x = 10; pfFader.y = pfArea.z; pfFader.z = 0.1;
      const sym = () => Math.random() * 2 - 1;
      const tmp = V3.create(0,0,0);
      for (let i = 0; i < NUM; i++) {
        const b = particles[i] || new Blossom(); particles[i] = b;
        tmp.x = sym()*0.3+0.8; tmp.y = sym()*0.2-1; tmp.z = sym()*0.3+0.5; V3.normalize(tmp);
        const spd = 2+Math.random();
        b.velocity = [tmp.x*spd, tmp.y*spd, tmp.z*spd];
        b.baseVelocity = [...b.velocity];
        b.rotation = [sym()*Math.PI, sym()*Math.PI, sym()*Math.PI];
        b.position = [sym()*pfArea.x, sym()*pfArea.y, sym()*pfArea.z];
        b.euler = [Math.random()*6.28, Math.random()*6.28, Math.random()*6.28];
        b.size = 0.9+Math.random()*0.1;
      }
    };

    /* ── effect lib ── */
    let fxBg: any, fxBright: any, fxBlur: any, fxFinal: any;

    const createScene = () => {
      pfProg = mkProg(SAKURA_POINT_VSH, SAKURA_POINT_FSH,
        ["uProjection","uModelview","uResolution","uOffset","uDOF","uFade"],
        ["aPosition","aEuler","aMisc"])!;
      useProg(pfProg);
      pfBuf = G.createBuffer();
      G.bindBuffer(G.ARRAY_BUFFER, pfBuf);
      G.bufferData(G.ARRAY_BUFFER, pfData, G.DYNAMIC_DRAW);
      G.bindBuffer(G.ARRAY_BUFFER, null);
      unuseProg(pfProg);
      fxBg = mkFx(FX_COMMON_VSH, BG_FSH, ["uTimes"]);
      fxBright = mkFx(FX_COMMON_VSH, FX_BRIGHTBUF_FSH);
      fxBlur = mkFx(FX_COMMON_VSH, FX_DIRBLUR_FSH, ["uBlurDir"]);
      fxFinal = mkFx(PP_FINAL_VSH, PP_FINAL_FSH, ["uBloom"]);
    };

    const initScene = () => {
      initParticles();
      cam.pos.z = pfArea.z + proj.nf[0];
      proj.angle = Math.atan2(pfArea.y, cam.pos.z + pfArea.z) * 180 / Math.PI * 2;
      M44.loadProjection(proj.mat, spec.aspect, proj.angle, proj.nf[0], proj.nf[1]);
    };

    /* ── set viewports & RTs ── */
    const setViewports = () => {
      setSize(G.canvas.width, G.canvas.height);
      G.clearColor(0.2, 0.2, 0.5, 1); G.viewport(0, 0, spec.w, spec.h);
      const mk = (key: string, w: number, h: number) => { if ((spec as any)[key]) deleteRT((spec as any)[key]); (spec as any)[key] = createRT(w, h); };
      mk("mainRT", spec.w, spec.h); mk("wFullRT0", spec.w, spec.h); mk("wFullRT1", spec.w, spec.h);
      mk("wHalfRT0", spec.hw, spec.hh); mk("wHalfRT1", spec.hw, spec.hh);
    };

    /* ── render functions ── */
    const renderBg = () => { G.disable(G.DEPTH_TEST); useFx(fxBg, null); G.uniform2f(fxBg.pr.u.uTimes, ti.elapsed, ti.delta); drawFx(fxBg); unuseProg(fxBg.pr); G.enable(G.DEPTH_TEST); };

    const renderFlowers = () => {
      const PI2 = Math.PI * 2;
      const wrap = (b: Blossom, c: number, lim: number) => {
        if (Math.abs(b.position[c]) - b.size * 0.5 > lim) b.position[c] += (b.position[c] > 0 ? -2 : 2) * lim;
      };
      // Scroll gravity: lerp current toward target, decay target
      scrollGravity += (scrollTarget - scrollGravity) * 0.08;
      scrollTarget *= 0.94;

      for (let i = 0; i < NUM; i++) {
        const b = particles[i];
        // Apply scroll gravity boost to velocity temporarily
        b.velocity[1] = b.baseVelocity[1] - scrollGravity * 2.5;
        b.velocity[0] = b.baseVelocity[0] + Math.sin(ti.elapsed * 3 + i) * scrollGravity * 0.4;
        b.rotation[0] = b.rotation[0] + scrollGravity * 0.02;
        b.rotation[2] = b.rotation[2] + scrollGravity * 0.01;

        b.update(ti.delta);
        wrap(b, 0, pfArea.x); wrap(b, 1, pfArea.y); wrap(b, 2, pfArea.z);
        for (let c = 0; c < 3; c++) { b.euler[c] %= PI2; if (b.euler[c] < 0) b.euler[c] += PI2; }
        b.alpha = 1;
        b.zkey = cam.mat[2]*b.position[0] + cam.mat[6]*b.position[1] + cam.mat[10]*b.position[2] + cam.mat[14];
      }
      particles.sort((a, b) => a.zkey - b.zkey);

      let ip = 0, ie = NUM * 3, im = NUM * 6;
      for (let i = 0; i < NUM; i++) {
        const b = particles[i];
        pfData[ip]=b.position[0]; pfData[ip+1]=b.position[1]; pfData[ip+2]=b.position[2]; ip+=3;
        pfData[ie]=b.euler[0]; pfData[ie+1]=b.euler[1]; pfData[ie+2]=b.euler[2]; ie+=3;
        pfData[im]=b.size; pfData[im+1]=b.alpha; im+=2;
      }

      G.enable(G.BLEND); G.blendFunc(G.SRC_ALPHA, G.ONE_MINUS_SRC_ALPHA);
      useProg(pfProg);
      G.uniformMatrix4fv(pfProg.u.uProjection, false, proj.mat);
      G.uniformMatrix4fv(pfProg.u.uModelview, false, cam.mat);
      G.uniform3fv(pfProg.u.uResolution, spec.arr);
      G.uniform3fv(pfProg.u.uDOF, V3.arrayForm(cam.dof));
      G.uniform3fv(pfProg.u.uFade, V3.arrayForm(pfFader));
      G.bindBuffer(G.ARRAY_BUFFER, pfBuf);
      G.bufferData(G.ARRAY_BUFFER, pfData, G.DYNAMIC_DRAW);
      G.vertexAttribPointer(pfProg.a.aPosition, 3, G.FLOAT, false, 0, 0);
      G.vertexAttribPointer(pfProg.a.aEuler, 3, G.FLOAT, false, 0, NUM*3*4);
      G.vertexAttribPointer(pfProg.a.aMisc, 2, G.FLOAT, false, 0, NUM*6*4);

      // draw offset copies
      const offsets = [[-1,-1],[-1,1],[1,-1],[1,1]];
      for (const [ox,oy] of offsets) {
        pfOff[0]=pfArea.x*ox; pfOff[1]=pfArea.y*oy; pfOff[2]=pfArea.z*-2;
        G.uniform3fv(pfProg.u.uOffset, pfOff); G.drawArrays(G.POINTS, 0, NUM);
      }
      pfOff[0]=0; pfOff[1]=0; pfOff[2]=0;
      G.uniform3fv(pfProg.u.uOffset, pfOff); G.drawArrays(G.POINTS, 0, NUM);
      G.bindBuffer(G.ARRAY_BUFFER, null); unuseProg(pfProg);
      G.enable(G.DEPTH_TEST); G.disable(G.BLEND);
    };

    const renderPost = () => {
      G.disable(G.DEPTH_TEST);
      const bind = (rt: any, clear: boolean) => { G.bindFramebuffer(G.FRAMEBUFFER, rt.fb); G.viewport(0,0,rt.w,rt.h); if(clear){G.clearColor(0,0,0,0);G.clear(G.COLOR_BUFFER_BIT|G.DEPTH_BUFFER_BIT);} };
      bind(spec.wHalfRT0, true); useFx(fxBright, spec.mainRT); drawFx(fxBright); unuseProg(fxBright.pr);
      for (let i = 0; i < 2; i++) {
        const p = 1.5+i, s = 2+i;
        bind(spec.wHalfRT1, true); useFx(fxBlur, spec.wHalfRT0); G.uniform4f(fxBlur.pr.u.uBlurDir, p,0,s,0); drawFx(fxBlur); unuseProg(fxBlur.pr);
        bind(spec.wHalfRT0, true); useFx(fxBlur, spec.wHalfRT1); G.uniform4f(fxBlur.pr.u.uBlurDir, 0,p,0,s); drawFx(fxBlur); unuseProg(fxBlur.pr);
      }
      G.bindFramebuffer(G.FRAMEBUFFER, null); G.viewport(0,0,spec.w,spec.h); G.clear(G.COLOR_BUFFER_BIT|G.DEPTH_BUFFER_BIT);
      useFx(fxFinal, spec.mainRT); G.uniform1i(fxFinal.pr.u.uBloom, 1); G.activeTexture(G.TEXTURE1); G.bindTexture(G.TEXTURE_2D, spec.wHalfRT0.tex); drawFx(fxFinal); unuseProg(fxFinal.pr);
      G.enable(G.DEPTH_TEST);
    };

    /* ── time ── */
    const ti = { start: 0, prev: 0, delta: 0, elapsed: 0 };

    /* ── resize ── */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      setViewports();
      initScene();
    };

    /* ── init ── */
    resize();
    createScene();
    initScene();
    ti.start = ti.prev = performance.now();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    /* ── loop ── */
    let raf = 0;
    const tick = (now: number) => {
      if (!animating) return;
      ti.elapsed = (now - ti.start) / 1000;
      ti.delta = Math.min((now - ti.prev) / 1000, 0.05);
      ti.prev = now;
      M44.loadLookAt(cam.mat, cam.pos, cam.look, cam.up);
      G.enable(G.DEPTH_TEST);
      G.bindFramebuffer(G.FRAMEBUFFER, spec.mainRT.fb);
      G.viewport(0, 0, spec.mainRT.w, spec.mainRT.h);
      G.clearColor(0.005, 0, 0.05, 0);
      G.clear(G.COLOR_BUFFER_BIT | G.DEPTH_BUFFER_BIT);
      renderBg();
      renderFlowers();
      renderPost();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      animating = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", opacity: 0.55 }}
    />
  );
};
