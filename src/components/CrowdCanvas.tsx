import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

type Peep = {
  image: HTMLImageElement;
  rect: [number, number, number, number];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk?: gsap.core.Timeline;
  render: (ctx: CanvasRenderingContext2D) => void;
};

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const image = new Image();
    const stage = { width: 0, height: 0 };
    const peeps: Peep[] = [];
    const available: Peep[] = [];
    const crowd: Peep[] = [];
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let inView = false;

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (length: number) => Math.floor(Math.random() * length);

    const createPeep = (rect: [number, number, number, number]): Peep => ({
      image,
      rect,
      width: rect[2],
      height: rect[3],
      x: 0,
      y: 0,
      anchorY: 0,
      scaleX: 1,
      render: () => undefined,
    });

    // Build each sprite from the local sheet. It is bundled with the site, so the scene works offline.
    const createPeeps = () => {
      const cellWidth = image.naturalWidth / rows;
      const cellHeight = image.naturalHeight / cols;

      for (let i = 0; i < rows * cols; i += 1) {
        const rect: [number, number, number, number] = [
          (i % rows) * cellWidth,
          Math.floor(i / rows) * cellHeight,
          cellWidth,
          cellHeight,
        ];
        const peep = createPeep(rect);
        peep.render = (context) => {
          context.save();
          context.translate(peep.x + (peep.scaleX < 0 ? peep.width : 0), peep.y);
          context.scale(peep.scaleX, 1);
          context.drawImage(image, ...peep.rect, 0, 0, peep.width, peep.height);
          context.restore();
        };
        peeps.push(peep);
      }
      available.push(...peeps);
    };

    const render = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, stage.width, stage.height);
      crowd.forEach((peep) => peep.render(ctx));
    };

    const removePeep = (peep: Peep) => {
      const index = crowd.indexOf(peep);
      if (index >= 0) crowd.splice(index, 1);
      available.push(peep);
    };

    const addPeep = () => {
      if (!available.length) return;
      const peep = available.splice(randomIndex(available.length), 1)[0];
      const direction = Math.random() > 0.5 ? 1 : -1;
      const lift = 42 - 90 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + lift;
      const startX = direction === 1 ? -peep.width : stage.width + peep.width;
      const endX = direction === 1 ? stage.width : -peep.width;

      peep.scaleX = direction;
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      const duration = randomRange(13, 22);
      peep.walk = gsap.timeline({
        onComplete: () => {
          removePeep(peep);
          addPeep();
        },
      });
      peep.walk.timeScale(randomRange(0.7, 1.2));
      peep.walk.to(peep, { duration, x: endX, ease: "none" }, 0);
      peep.walk.to(peep, {
        duration: 0.35,
        repeat: Math.round(duration / 0.35),
        yoyo: true,
        y: startY - 5,
        ease: "sine.inOut",
      }, 0);
      peep.walk.progress(Math.random());
      if (!inView) peep.walk.pause();
    };

    const initCrowd = () => {
      if (reducedMotion) {
        const stillCrowd = peeps.filter((_, index) => index % rows === 0);
        stillCrowd.forEach((peep, index) => {
          peep.x = ((index + 0.5) / stillCrowd.length) * stage.width - peep.width / 2;
          peep.y = stage.height - peep.height;
          peep.anchorY = peep.y;
          crowd.push(peep);
        });
        crowd.sort((a, b) => a.anchorY - b.anchorY);
        render();
        return;
      }

      while (available.length) addPeep();
      if (inView) gsap.ticker.add(render);
    };

    const resize = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(stage.width * pixelRatio);
      canvas.height = Math.round(stage.height * pixelRatio);

      if (!image.complete || !image.naturalWidth) return;
      crowd.forEach((peep) => peep.walk?.kill());
      crowd.length = 0;
      available.length = 0;
      available.push(...peeps);
      initCrowd();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (reducedMotion) return;
      if (inView) {
        crowd.forEach((peep) => peep.walk?.resume());
        gsap.ticker.add(render);
      } else {
        crowd.forEach((peep) => peep.walk?.pause());
        gsap.ticker.remove(render);
      }
    }, { threshold: 0.01 });
    intersectionObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    image.onload = () => {
      createPeeps();
      resize();
    };
    image.src = src;

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
      image.onload = null;
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} className="crowd-canvas" aria-hidden="true" />;
};

export default CrowdCanvas;
