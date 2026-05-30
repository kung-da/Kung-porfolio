import { useEffect, useRef } from "react";
import { SAKURA_POINT_FSH, SAKURA_POINT_VSH } from "@/lib/sakura-shaders";

type Vec3 = { x: number; y: number; z: number; array?: Float32Array };

type SakuraProgram = WebGLProgram & {
  uniforms: {
    uProjection: WebGLUniformLocation | null;
    uModelview: WebGLUniformLocation | null;
    uResolution: WebGLUniformLocation | null;
    uOffset: WebGLUniformLocation | null;
    uDOF: WebGLUniformLocation | null;
    uFade: WebGLUniformLocation | null;
  };
  attributes: {
    aPosition: number;
    aEuler: number;
    aMisc: number;
  };
};

type RenderSpec = {
  width: number;
  height: number;
  aspect: number;
  dpr: number;
  resolution: Float32Array;
};

const PARTICLE_COUNT = 4000;
const FLOATS_PER_PARTICLE = 8;
const BYTES_PER_PARTICLE = FLOATS_PER_PARTICLE * Float32Array.BYTES_PER_ELEMENT;
const SORT_EVERY_FRAMES = 5;
const MAX_DELTA = 0.045;
const FIELD_HEIGHT = 20;
const FIELD_DEPTH = 22;
const PI2 = Math.PI * 2;

const createVec3 = (x: number, y: number, z: number): Vec3 => ({ x, y, z });

const normalize = (v: Vec3) => {
  const len = Math.hypot(v.x, v.y, v.z);
  if (len > 0.00001) {
    v.x /= len;
    v.y /= len;
    v.z /= len;
  }
  return v;
};

const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

const vecArray = (v: Vec3) => {
  if (!v.array) v.array = new Float32Array(3);
  v.array[0] = v.x;
  v.array[1] = v.y;
  v.array[2] = v.z;
  return v.array;
};

const identityMatrix = () =>
  new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

const loadProjection = (matrix: Float32Array, aspect: number, angle: number, near: number, far: number) => {
  const h = near * Math.tan((angle * Math.PI) / 360) * 2;
  const w = h * aspect;

  matrix[0] = (2 * near) / w;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = (2 * near) / h;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = -(far + near) / (far - near);
  matrix[11] = -1;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = (-2 * far * near) / (far - near);
  matrix[15] = 0;
};

const loadLookAt = (matrix: Float32Array, position: Vec3, lookAt: Vec3, up: Vec3) => {
  const front = normalize(createVec3(position.x - lookAt.x, position.y - lookAt.y, position.z - lookAt.z));
  const side = normalize(cross(up, front));
  const top = normalize(cross(front, side));

  matrix[0] = side.x;
  matrix[1] = top.x;
  matrix[2] = front.x;
  matrix[3] = 0;
  matrix[4] = side.y;
  matrix[5] = top.y;
  matrix[6] = front.y;
  matrix[7] = 0;
  matrix[8] = side.z;
  matrix[9] = top.z;
  matrix[10] = front.z;
  matrix[11] = 0;
  matrix[12] = -(position.x * matrix[0] + position.y * matrix[4] + position.z * matrix[8]);
  matrix[13] = -(position.x * matrix[1] + position.y * matrix[5] + position.z * matrix[9]);
  matrix[14] = -(position.x * matrix[2] + position.y * matrix[6] + position.z * matrix[10]);
  matrix[15] = 1;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

class SakuraParticle {
  position = [0, 0, 0];
  velocity = [0, 0, 0];
  rotation = [0, 0, 0];
  euler = [0, 0, 0];
  size = 1;
  alpha = 1;
  zkey = 0;
  sway = Math.random() * PI2;
  swaySpeed = 1;

  reset(areaX: number, areaY: number, areaZ: number, randomY = true) {
    const drift = normalize(createVec3(rand(0.55, 1.05), rand(-1.28, -0.76), rand(0.08, 0.58)));
    const speed = rand(1.7, 3.3);

    this.velocity[0] = drift.x * speed;
    this.velocity[1] = drift.y * speed;
    this.velocity[2] = drift.z * speed;
    this.rotation[0] = rand(-Math.PI, Math.PI) * 0.42;
    this.rotation[1] = rand(-Math.PI, Math.PI) * 0.58;
    this.rotation[2] = rand(-Math.PI, Math.PI) * 0.72;
    this.position[0] = rand(-areaX, areaX);
    this.position[1] = randomY ? rand(-areaY, areaY) : areaY + rand(0.2, 2.4);
    this.position[2] = rand(-areaZ, areaZ);
    this.euler[0] = rand(0, PI2);
    this.euler[1] = rand(0, PI2);
    this.euler[2] = rand(0, PI2);
    this.size = rand(0.82, 1.1);
    this.alpha = rand(0.68, 0.98);
    this.swaySpeed = rand(0.68, 1.08);
  }

  update(delta: number, elapsed: number, areaX: number, areaY: number, areaZ: number) {
    this.sway += delta * this.swaySpeed;
    const wave = Math.sin(this.sway + elapsed * 0.68);

    this.position[0] += (this.velocity[0] + wave * 0.35) * delta;
    this.position[1] += this.velocity[1] * delta;
    this.position[2] += (this.velocity[2] + Math.cos(this.sway) * 0.18) * delta;

    this.euler[0] = (this.euler[0] + this.rotation[0] * delta) % PI2;
    this.euler[1] = (this.euler[1] + this.rotation[1] * delta) % PI2;
    this.euler[2] = (this.euler[2] + this.rotation[2] * delta) % PI2;

    if (this.position[1] < -areaY - 1.8 || this.position[0] > areaX + 2.2 || this.position[2] > areaZ + 2) {
      this.reset(areaX, areaY, areaZ, false);
      this.position[0] = rand(-areaX * 1.15, areaX * 0.35);
    }
    if (this.position[0] < -areaX - 2) this.position[0] = areaX + 1.2;
    if (this.position[2] < -areaZ - 2) this.position[2] = areaZ + 1.2;
  }
}

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const createSakuraProgram = (gl: WebGLRenderingContext): SakuraProgram | null => {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, SAKURA_POINT_VSH);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, SAKURA_POINT_FSH);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram() as SakuraProgram | null;
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  program.uniforms = {
    uProjection: gl.getUniformLocation(program, "uProjection"),
    uModelview: gl.getUniformLocation(program, "uModelview"),
    uResolution: gl.getUniformLocation(program, "uResolution"),
    uOffset: gl.getUniformLocation(program, "uOffset"),
    uDOF: gl.getUniformLocation(program, "uDOF"),
    uFade: gl.getUniformLocation(program, "uFade"),
  };
  program.attributes = {
    aPosition: gl.getAttribLocation(program, "aPosition"),
    aEuler: gl.getAttribLocation(program, "aEuler"),
    aMisc: gl.getAttribLocation(program, "aMisc"),
  };

  return program;
};

const SakuraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.error("WebGL context could not be initialized.");
      return;
    }

    const program = createSakuraProgram(gl);
    if (!program) return;

    const render: RenderSpec = {
      width: 0,
      height: 0,
      aspect: 1,
      dpr: 1,
      resolution: new Float32Array(3),
    };

    const projection = {
      angle: 60,
      near: 0.1,
      far: 100,
      matrix: identityMatrix(),
    };
    const camera = {
      position: createVec3(0, 0, 100),
      lookAt: createVec3(0, 0, 0),
      up: createVec3(0, 1, 0),
      dof: createVec3(10, 4.6, 8.5),
      matrix: identityMatrix(),
    };
    const field = {
      x: 20,
      y: FIELD_HEIGHT,
      z: FIELD_DEPTH,
      fade: createVec3(10, FIELD_DEPTH, 0.1),
      offset: new Float32Array([0, 0, 0]),
    };

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new SakuraParticle());
    const data = new Float32Array(PARTICLE_COUNT * FLOATS_PER_PARTICLE);
    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      return;
    }

    let animationFrame = 0;
    let resizeFrame = 0;
    let frame = 0;
    let visible = true;
    let previousTime = performance.now();
    let elapsed = 0;

    const updateSize = (resetParticles = false) => {
      const rect = canvas.getBoundingClientRect();
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.floor(rect.width * nextDpr));
      const nextHeight = Math.max(1, Math.floor(rect.height * nextDpr));

      if (nextWidth === render.width && nextHeight === render.height && nextDpr === render.dpr) {
        return;
      }

      render.dpr = nextDpr;
      render.width = nextWidth;
      render.height = nextHeight;
      render.aspect = render.width / render.height;
      render.resolution[0] = render.width;
      render.resolution[1] = render.height;
      render.resolution[2] = render.aspect;

      canvas.width = render.width;
      canvas.height = render.height;
      gl.viewport(0, 0, render.width, render.height);

      field.x = FIELD_HEIGHT * render.aspect;
      field.fade.x = 10;
      field.fade.y = field.z;
      field.fade.z = 0.1;
      camera.position.z = field.z + projection.near;
      projection.angle = (Math.atan2(field.y, camera.position.z + field.z) * 360) / Math.PI;
      loadProjection(projection.matrix, render.aspect, projection.angle, projection.near, projection.far);

      if (resetParticles) {
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          particles[i].reset(field.x, field.y, field.z);
        }
      }
    };

    const scheduleSizeUpdate = () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        updateSize();
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0.02;
    }, { threshold: [0, 0.02] });

    observer.observe(canvas);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleSizeUpdate) : null;
    resizeObserver?.observe(canvas);
    window.addEventListener("resize", scheduleSizeUpdate, { passive: true });

    updateSize(true);

    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(program.attributes.aPosition);
    gl.enableVertexAttribArray(program.attributes.aEuler);
    gl.enableVertexAttribArray(program.attributes.aMisc);
    gl.vertexAttribPointer(program.attributes.aPosition, 3, gl.FLOAT, false, BYTES_PER_PARTICLE, 0);
    gl.vertexAttribPointer(program.attributes.aEuler, 3, gl.FLOAT, false, BYTES_PER_PARTICLE, 12);
    gl.vertexAttribPointer(program.attributes.aMisc, 2, gl.FLOAT, false, BYTES_PER_PARTICLE, 24);

    const renderParticles = (delta: number) => {
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const particle = particles[i];
        particle.update(delta, elapsed, field.x, field.y, field.z);
        particle.zkey =
          camera.matrix[2] * particle.position[0] +
          camera.matrix[6] * particle.position[1] +
          camera.matrix[10] * particle.position[2] +
          camera.matrix[14];
      }

      if (frame % SORT_EVERY_FRAMES === 0) {
        particles.sort((a, b) => a.zkey - b.zkey);
      }

      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const particle = particles[index];
        const offset = index * FLOATS_PER_PARTICLE;
        data[offset] = particle.position[0];
        data[offset + 1] = particle.position[1];
        data[offset + 2] = particle.position[2];
        data[offset + 3] = particle.euler[0];
        data[offset + 4] = particle.euler[1];
        data[offset + 5] = particle.euler[2];
        data[offset + 6] = particle.size;
        data[offset + 7] = particle.alpha;
      }

      gl.useProgram(program);
      gl.uniformMatrix4fv(program.uniforms.uProjection, false, projection.matrix);
      gl.uniformMatrix4fv(program.uniforms.uModelview, false, camera.matrix);
      gl.uniform3fv(program.uniforms.uResolution, render.resolution);
      gl.uniform3fv(program.uniforms.uDOF, vecArray(camera.dof));
      gl.uniform3fv(program.uniforms.uFade, vecArray(field.fade));

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);

      for (let ix = -1; ix <= 1; ix += 1) {
        for (let iy = -1; iy <= 1; iy += 1) {
          field.offset[0] = ix * field.x * 2;
          field.offset[1] = iy * field.y * 2;
          field.offset[2] = 0;
          gl.uniform3fv(program.uniforms.uOffset, field.offset);
          gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
        }
      }
    };

    const animate = (now: number) => {
      animationFrame = requestAnimationFrame(animate);
      if (!visible || document.hidden) {
        previousTime = now;
        return;
      }

      const delta = Math.min((now - previousTime) / 1000, MAX_DELTA);
      previousTime = now;
      elapsed += delta;
      frame += 1;

      loadLookAt(camera.matrix, camera.position, camera.lookAt, camera.up);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      renderParticles(delta);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleSizeUpdate);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sakura"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
        contain: "strict",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
};

export default SakuraBackground;
