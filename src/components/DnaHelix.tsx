import { useEffect, useRef } from 'react';

const HIGHLIGHTED = new Set([5, 12, 18]);
const RUNGS = 24;
const SAMPLES = 180;
const TURNS = 2.1;

interface Point {
  x: number;
  y: number;
  z: number;
}

function readColor(element: Element, name: string, fallback: string): string {
  return getComputedStyle(element).getPropertyValue(name).trim() || fallback;
}

export function DnaHelix({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let colors = { a: '#34d399', b: '#a78bfa', hi: '#34d399', rung: '#2a3140' };
    let frameId = 0;
    let phase = 0.6;
    let isVisible = true;

    function updateColors() {
      if (!canvas) return;
      colors = {
        a: readColor(canvas, '--helix-a', colors.a),
        b: readColor(canvas, '--helix-b', colors.b),
        hi: readColor(canvas, '--helix-highlight', colors.hi),
        rung: readColor(canvas, '--helix-rung', colors.rung),
      };
    }

    function resize() {
      if (!canvas || !context) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function pointAt(t: number, strand: 1 | -1, width: number, height: number): Point {
      const amplitude = Math.min(width * 0.3, 112);
      const angle = t * TURNS * Math.PI * 2 + phase;
      const tilt = (t - 0.5) * width * 0.12;
      return {
        x: width / 2 + tilt + strand * Math.sin(angle) * amplitude,
        y: height * 0.06 + height * 0.88 * t,
        z: strand * Math.cos(angle),
      };
    }

    function drawStrand(strand: 1 | -1, color: string, front: boolean, width: number, height: number) {
      if (!context) return;
      context.strokeStyle = color;
      context.lineCap = 'butt';
      for (let index = 0; index < SAMPLES; index += 1) {
        const from = pointAt(index / SAMPLES, strand, width, height);
        const to = pointAt((index + 1) / SAMPLES, strand, width, height);
        const depth = (from.z + to.z) / 2;
        if (front !== depth >= 0) continue;
        context.globalAlpha = 0.18 + 0.82 * ((depth + 1) / 2);
        context.lineWidth = 1.2 + 0.9 * ((depth + 1) / 2);
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
      }
    }

    function draw() {
      if (!canvas || !context) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      drawStrand(1, colors.a, false, width, height);
      drawStrand(-1, colors.b, false, width, height);

      for (let index = 0; index < RUNGS; index += 1) {
        const t = (index + 0.5) / RUNGS;
        const a = pointAt(t, 1, width, height);
        const b = pointAt(t, -1, width, height);
        const highlight = HIGHLIGHTED.has(index);
        context.globalAlpha = highlight ? 0.95 : 0.9;
        context.strokeStyle = highlight ? colors.hi : colors.rung;
        context.lineWidth = highlight ? 1.5 : 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();

        for (const node of [a, b]) {
          const size = highlight ? 5 : 2 + 1.5 * ((node.z + 1) / 2);
          context.globalAlpha = highlight ? 1 : 0.35 + 0.65 * ((node.z + 1) / 2);
          context.fillStyle = highlight ? colors.hi : node === a ? colors.a : colors.b;
          context.fillRect(node.x - size / 2, node.y - size / 2, size, size);
        }
      }

      drawStrand(1, colors.a, true, width, height);
      drawStrand(-1, colors.b, true, width, height);
      context.globalAlpha = 1;
    }

    function loop() {
      phase += 0.006;
      draw();
      frameId = window.requestAnimationFrame(loop);
    }

    function start() {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      updateColors();
      resize();
      if (motionQuery.matches || !isVisible) {
        draw();
      } else {
        loop();
      }
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible === isVisible) return;
      isVisible = nextVisible;
      if (!isVisible) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (!motionQuery.matches) {
        loop();
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    motionQuery.addEventListener('change', start);
    start();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motionQuery.removeEventListener('change', start);
    };
  }, []);

  return <canvas ref={canvasRef} className={`dna-helix ${className}`} aria-hidden="true" />;
}
