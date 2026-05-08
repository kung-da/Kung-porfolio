import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseVy: number;
  maxVy: number;
  rotation: number;
  rotationSpeed: number;
  wobblePhase: number;
  layer: 0 | 1 | 2;
  alpha: number;
}

function drawSakuraPetal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rotation: number,
  fill: string,
  shadow: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  // shadow pass
  ctx.fillStyle = shadow;
  ctx.translate(1, 1);
  for (let i = 0; i < 5; i++) {
    ctx.rotate((Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.4, -r * 0.4, r, -r * 0.1, r * 0.95, r * 0.3);
    ctx.bezierCurveTo(r * 0.9, r * 0.7, r * 0.4, r * 0.8, 0, r * 0.5);
    ctx.closePath();
    ctx.fill();
  }
  ctx.translate(-1, -1);
  ctx.fillStyle = fill;
  for (let i = 0; i < 5; i++) {
    ctx.rotate((Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.4, -r * 0.4, r, -r * 0.1, r * 0.95, r * 0.3);
    ctx.bezierCurveTo(r * 0.9, r * 0.7, r * 0.4, r * 0.8, 0, r * 0.5);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

const LAYER_CFG = [
  { sizeMin: 4, sizeMax: 8, vyMin: 0.4, vyMax: 0.8, alphaMin: 0.3, alphaMax: 0.5 },
  { sizeMin: 8, sizeMax: 14, vyMin: 0.8, vyMax: 1.4, alphaMin: 0.6, alphaMax: 0.8 },
  { sizeMin: 14, sizeMax: 22, vyMin: 1.4, vyMax: 2.2, alphaMin: 0.85, alphaMax: 1 },
];

export const SakuraCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const enragedRef = useRef(false);

  useEffect(() => {
    const onEnrage = (e: Event) => {
      enragedRef.current = (e as CustomEvent).detail?.isEnraged ?? false;
    };
    window.addEventListener("enraged-mode", onEnrage);
    return () => window.removeEventListener("enraged-mode", onEnrage);
  }, []);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let petals: Petal[] = [];
    let scrollDelta = 0;
    let prevY = window.scrollY;
    let raf = 0;
    let mobile = window.innerWidth < 768;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mobile = window.innerWidth < 768;
    };

    const makePetal = (layer: 0 | 1 | 2, recycled = false): Petal => {
      const cfg = LAYER_CFG[layer];
      const baseVy = cfg.vyMin + Math.random() * (cfg.vyMax - cfg.vyMin);
      return {
        x: Math.random() * window.innerWidth,
        y: recycled ? -20 : Math.random() * window.innerHeight,
        r: cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin),
        vx: (Math.random() - 0.5) * 0.4,
        vy: baseVy,
        baseVy,
        maxVy: cfg.vyMax,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        wobblePhase: Math.random() * Math.PI * 2,
        layer,
        alpha: cfg.alphaMin + Math.random() * (cfg.alphaMax - cfg.alphaMin),
      };
    };

    const buildPetals = () => {
      const total = mobile ? 30 : 60;
      const per = Math.floor(total / 3);
      petals = [];
      for (let l = 0; l < 3; l++) {
        for (let i = 0; i < per; i++) petals.push(makePetal(l as 0 | 1 | 2));
      }
    };

    const onScroll = () => {
      scrollDelta = window.scrollY - prevY;
      prevY = window.scrollY;
    };

    resize();
    buildPetals();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      scrollDelta *= 0.92;

      const enraged = enragedRef.current;
      const fill = enraged ? "#8B1A1A" : "#F6D7E3";
      const shadow = enraged ? "#5A0E0E" : "#E8A5C0";
      const speedMul = enraged ? 3 : 1;

      for (const p of petals) {
        p.vy += scrollDelta * 0.06;
        p.vy = Math.min(p.vy, p.maxVy * 3);
        p.vy = Math.max(p.vy, p.baseVy);

        p.x += p.vx + Math.sin(p.wobblePhase) * 0.3;
        p.y += p.vy * speedMul;
        p.rotation += p.rotationSpeed;
        p.wobblePhase += 0.02;

        if (p.y > window.innerHeight + 20) {
          p.y = -20;
          p.x = Math.random() * window.innerWidth;
          p.vy = p.baseVy;
        }
        if (p.x < -30) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 30) p.x = -20;

        ctx.globalAlpha = p.alpha;
        if (p.layer === 0) ctx.filter = "blur(1px)";
        else ctx.filter = "none";
        drawSakuraPetal(ctx, p.x, p.y, p.r, p.rotation, fill, shadow);
      }
      ctx.globalAlpha = 1;
      ctx.filter = "none";

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};
