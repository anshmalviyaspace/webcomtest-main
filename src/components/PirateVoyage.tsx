import { useEffect, useLayoutEffect, useRef } from "react";
import "@/styles/pirate-voyage.css";
import webcomLogo from "@/assets/logo.png";

const P = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_";
const SHIP = `${P}20261031_024714_39df675e-5060-4528-87dc-9d0c274815aa.png&w=1600&q=90`;
const CAPT = `${P}20261031_024703_a0298b6a-0117-47f1-8462-4be671d0407e.png&w=2048&q=90`;
const PLANTS = `${P}20261031_024704_3ccf1ac2-bec7-4fdb-bfce-ac19eca8db28.png&w=2048&q=90`;

const LAY = {
  land: {
    w: 1600, h: 900,
    wave: { y0: 748, y1: 272, gap0: 1, gap1: 0.6 },
    ship: { x0: 1130, w0: 710, x1: 1345, w1: 176 },
    palm: { x: -92, y: -112, w: 620 }, capt: { x: 120, y: 318, w: 540 }, chest: { x: 640, y: 628, w: 200 },
    bushL: { x: 96, y: 716, w: 700 }, bushR: { x: 1370, y: 740, w: 300 },
  },
  port: {
    w: 800, h: 1500,
    wave: { y0: 1300, y1: 430, gap0: 1, gap1: 0.7 },
    ship: { x0: 420, w0: 620, x1: 640, w1: 150 },
    palm: { x: -150, y: -60, w: 560 }, capt: { x: 20, y: 440, w: 600 }, chest: { x: 560, y: 830, w: 190 },
    bushL: { x: -40, y: 1330, w: 520 }, bushR: { x: 570, y: 1340, w: 260 },
  },
} as const;

const BACK = [
  { dy: -100, a: 20, k: 1.5, v: 0.9, ph: 0, fill: "var(--band)" },
  { dy: -52, a: 23, k: 1.9, v: 1.15, ph: 1.7, fill: "var(--paper)" },
];
const FRONT = [
  { dy: 0, a: 25, k: 1.7, v: 1.3, ph: 3.1, fill: "var(--band2)" },
  { dy: 26, a: 18, k: 2.4, v: 1, ph: 4.4, span: [0.06, 0.44] as [number, number] },
  { dy: 48, a: 22, k: 1.45, v: 1.4, ph: 0.6, fill: "var(--paper)" },
  { dy: 76, a: 15, k: 2.1, v: 1.2, ph: 5.1, span: [0.52, 0.97] as [number, number] },
  { dy: 104, a: 24, k: 1.8, v: 1.25, ph: 2.2, fill: "var(--paper)" },
  { dy: 130, a: 14, k: 2.7, v: 1, ph: 1.1, span: [0, 0.62] as [number, number] },
  { dy: 158, a: 20, k: 1.6, v: 1.1, ph: 3.8 },
];

const SPRITES = {
  palm: { url: PLANTS, x: 19, y: 32, w: 910, h: 1284 },
  bushL: { url: PLANTS, x: 515, y: 820, w: 860, h: 496 },
  bushR: { url: PLANTS, x: 1528, y: 908, w: 499, h: 405 },
  capt: { url: CAPT, x: 34, y: 153, w: 1246, h: 1074 },
  chest: { url: CAPT, x: 1475, y: 830, w: 446, h: 392 },
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const io = (k: number) => k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2;
const out = (k: number) => 1 - (1 - k) ** 3;
const back = (k: number) => 1 + 2.4 * (k - 1) ** 3 + 1.4 * (k - 1) ** 2;

const anchorIcon = (nav = false) => (
  <svg viewBox="0 0 26 30" fill="none" stroke="currentColor" strokeWidth={nav ? 2.6 : 2.4} strokeLinecap="round" aria-hidden="true">
    <circle cx="13" cy="4.5" r="2.8" />
    <path d="M13 7.5V28M7 12h12M2.5 19c.6 5.5 5.5 9 10.5 9s9.9-3.5 10.5-9" />
    {!nav && <path d="m1 21 1.5-2.5L5 20.5M25 21l-1.5-2.5-2.5 2" />}
  </svg>
);

const PirateVoyage = () => {
  const frameRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    document.documentElement.classList.add("voyage-mode");
    return () => document.documentElement.classList.remove("voyage-mode");
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const scene = frame.querySelector<HTMLElement>("#scene");
    const shade = frame.querySelector<HTMLCanvasElement>("#shade");
    const ship = frame.querySelector<HTMLElement>("#ship");
    const t1 = frame.querySelector<HTMLElement>("#t1");
    const chapterViews = frame.querySelector<HTMLElement>("#chapterViews");
    const palm = frame.querySelector<HTMLElement>("#palm");
    const capt = frame.querySelector<HTMLElement>("#capt");
    const chest = frame.querySelector<HTMLElement>("#chest");
    const bushL = frame.querySelector<HTMLElement>("#bushL");
    const bushR = frame.querySelector<HTMLElement>("#bushR");
    const cloud = frame.querySelector<HTMLElement>("#cloudA");
    const logo = frame.querySelector<HTMLElement>(".logo");
    const nav = frame.querySelector<HTMLElement>(".voyage-nav");
    const navToggle = frame.querySelector<HTMLButtonElement>(".nav-toggle");
    const waveBack = frame.querySelector<SVGSVGElement>("#wBack");
    const waveFront = frame.querySelector<SVGSVGElement>("#wFront");
    const cursor = document.querySelector<HTMLElement>("#cur");
    const ping = document.querySelector<HTMLElement>("#ping");
    const ctx = shade?.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) document.documentElement.classList.add("fine");

    const t0 = performance.now();
    let now = t0;
    let p = 0;
    let pFrom = 0;
    let pTo = 0;
    let pT0 = t0;
    let frameId = 0;
    let lastNow = t0;
    let wheelLockedUntil = 0;
    let pointerX = -100;
    let pointerY = -100;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let pointerDown = false;
    let overLink = false;
    let pingAt = -Infinity;
    let pingX = -100;
    let pingY = -100;
    let touchStartY: number | null = null;
    let layout: typeof LAY.land | typeof LAY.port = LAY.land;
    let S = 1;
    let DX = 0;
    let DY = 0;
    let extraX = 20;
    let extraY = 40;
    const DUR = reduced ? 1 : 2100;
    let replayAfterReturn = false;
    let transitionDuration = DUR;

    const paintShade = () => {
      if (!ctx || !shade) return;
      ctx.clearRect(0, 0, shade.width, shade.height);
      ctx.save();
      ctx.scale(0.5, 0.5);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, shade.width * 2, shade.height * 2);
      ctx.strokeStyle = "rgba(120,114,96,.9)";
      ctx.lineCap = "round";
      const branches = [
        [-10, 26, 38, -8, 8], [-8, 46, 58, -2, 5], [-10, 62, 74, 6, 4],
        [14, 78, 96, 16, 4], [40, 82, 118, 22, 3], [78, 80, 140, 34, 5], [-12, 74, 22, 56, 6],
      ];
      branches.forEach(([x0, y0, x1, y1, width]) => {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo((x0 + x1) / 2 + 6, (y0 + y1) / 2 + 8, x1, y1);
        ctx.stroke();
      });
      ctx.restore();
    };

    const setSprite = (id: keyof typeof SPRITES, el: HTMLElement, entry: { x: number; y: number; w: number }) => {
      const box = SPRITES[id];
      const width = box.w;
      const height = box.h;
      el.style.left = `${entry.x}px`;
      el.style.top = `${entry.y}px`;
      el.style.width = `${entry.w}px`;
      el.style.height = `${entry.w * height / width}px`;
      el.style.backgroundImage = `url("${box.url}")`;
      el.style.backgroundSize = `${2048 / width * 100}% ${1360 / height * 100}%`;
      el.style.backgroundPosition = `${box.x / (2048 - width) * 100}% ${box.y / (1360 - height) * 100}%`;
    };

    const resize = () => {
      if (!frame || !scene || !shade || !waveBack || !waveFront || !ship || !palm || !capt || !chest || !bushL || !bushR || !cloud) return;
      const W = frame.clientWidth;
      const H = frame.clientHeight;
      const portrait = H > W;
      document.documentElement.classList.toggle("portrait", portrait);
      layout = portrait ? LAY.port : LAY.land;
      S = Math.min(W / layout.w, H / layout.h);
      const DW = W / S;
      const DH = H / S;
      DX = (DW - layout.w) / 2;
      DY = (DH - layout.h) / 2;
      extraX = DX + 20;
      extraY = DY + 40;
      scene.style.width = `${layout.w}px`;
      scene.style.height = `${layout.h}px`;
      scene.style.transform = `translate(${DX * S}px,${DY * S}px) scale(${S})`;
      [waveBack, waveFront].forEach((svg) => {
        svg.style.left = `${-extraX}px`;
        svg.style.top = "0px";
        svg.style.width = `${layout.w + extraX * 2}px`;
        svg.style.height = `${layout.h + extraY}px`;
        svg.setAttribute("viewBox", `${-extraX} 0 ${layout.w + extraX * 2} ${layout.h + extraY}`);
      });
      const dimensions = layout as typeof LAY.land | typeof LAY.port;
      const shipEntry = dimensions.ship;
      ship.style.width = `${shipEntry.w0}px`;
      ship.style.height = `${shipEntry.w0 * 2002 / 1961}px`;
      ship.style.backgroundImage = `url("${SHIP}")`;
      ship.style.backgroundSize = "100% 100%";
      setSprite("palm", palm, dimensions.palm);
      setSprite("capt", capt, dimensions.capt);
      setSprite("chest", chest, dimensions.chest);
      setSprite("bushL", bushL, dimensions.bushL);
      setSprite("bushR", bushR, dimensions.bushR);
      cloud.style.left = "0px";
      cloud.style.top = portrait ? "110px" : "150px";
      if (shade.width !== 64) shade.width = 64;
      if (shade.height !== 36) shade.height = 36;
      paintShade();
    };

    const yAt = (layer: typeof FRONT[number] | typeof BACK[number], x: number, t: number, progress: number) => {
      const W = layout.wave;
      const base = mix(W.y0, W.y1, progress) + layer.dy * mix(W.gap0, W.gap1, progress);
      const a = layer.a * mix(1, 0.72, progress);
      const f = (2 * Math.PI / 1100) * layer.k * (1 - 0.35 * progress);
      return base + a * Math.sin(f * x + t * layer.v + layer.ph) + a * 0.45 * Math.sin(f * 2.3 * x - t * layer.v * 0.7 + layer.ph * 1.7);
    };

    const makeWaves = (svg: SVGSVGElement, layers: typeof BACK | typeof FRONT, t: number, progress: number) => {
      while (svg.childElementCount < layers.length) svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
      layers.forEach((layer, index) => {
        const path = svg.children[index] as SVGPathElement;
        path.setAttribute("stroke", "var(--line)");
        path.setAttribute("stroke-width", "3.2");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("fill", layer.fill ?? "none");
        const x0 = "span" in layer && layer.span ? layout.w * layer.span[0] : -extraX;
        const x1 = "span" in layer && layer.span ? layout.w * layer.span[1] : layout.w + extraX;
        const d: string[] = [];
        for (let x = x0; x <= x1; x += 22) d.push(`${d.length ? "L" : "M"}${x.toFixed(1)} ${yAt(layer, x, t, progress).toFixed(1)}`);
        if (x1 % 22 !== x0 % 22) d.push(`L${x1.toFixed(1)} ${yAt(layer, x1, t, progress).toFixed(1)}`);
        if (layer.fill) d.push(`L${x1.toFixed(1)} ${layout.h + extraY}`, `L${x0.toFixed(1)} ${layout.h + extraY}`, "Z");
        path.setAttribute("d", d.join(" "));
      });
    };

    const transform = (el: HTMLElement | null, x: number, y: number, rotate = 0, scale = 1) => {
      if (el) el.style.transform = `translate(${x}px,${y}px) rotate(${rotate}deg) scale(${scale})`;
    };

    const go = (to: number) => {
      if (to === pTo) {
        if (to === 1 && p > 0.96 && !replayAfterReturn) {
          pFrom = p;
          pTo = 0;
          pT0 = now;
          transitionDuration = reduced ? 1 : 500;
          replayAfterReturn = true;
        }
        return;
      }
      pFrom = p;
      pTo = to;
      pT0 = now;
      transitionDuration = DUR;
      replayAfterReturn = false;
    };

    const selectChapter = (chapter: string) => {
      const allowed = ["home", "services", "approach", "founders", "contact"];
      if (!allowed.includes(chapter)) return;
      frame.dataset.page = chapter;
      frame.querySelectorAll<HTMLAnchorElement>(".voyage-nav [data-chapter], .voyage-side-nav [data-chapter]").forEach((item) => {
        if (item.dataset.chapter === chapter) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      });
      if (chapterViews) chapterViews.style.pointerEvents = "none";
      go(chapter === "home" ? 0 : 1);
    };

    const movePointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      overLink = Boolean((event.target as Element | null)?.closest("a"));
    };
    const pointerDownHandler = (event: PointerEvent) => {
      pointerDown = true;
      pingX = event.clientX;
      pingY = event.clientY;
      pingAt = now;
    };
    const pointerUpHandler = () => { pointerDown = false; };
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a");
      if (link?.getAttribute("href") === "#") event.preventDefault();
      if (target?.closest(".nav-toggle")) {
        event.preventDefault();
        const open = nav?.classList.toggle("is-open") ?? false;
        navToggle?.setAttribute("aria-expanded", String(open));
        navToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        return;
      }
      if (!target?.closest(".voyage-nav")) {
        nav?.classList.remove("is-open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.setAttribute("aria-label", "Open navigation");
      }
      const chapterControl = target?.closest<HTMLElement>("[data-chapter]");
      if (chapterControl) {
        event.preventDefault();
        nav?.classList.remove("is-open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.setAttribute("aria-label", "Open navigation");
        selectChapter(chapterControl.dataset.chapter ?? "home");
        return;
      }
      const control = target?.closest<HTMLElement>("[data-go]");
      if (control) {
        event.preventDefault();
        go(Number(control.dataset.go));
      }
    };
    const wheelHandler = (event: WheelEvent) => {
      if (now < wheelLockedUntil || Math.abs(event.deltaY) <= 8) return;
      go(event.deltaY > 8 ? 1 : 0);
      wheelLockedUntil = now + 1200;
    };
    const touchStartHandler = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };
    const touchEndHandler = (event: TouchEvent) => {
      if (touchStartY === null || now < wheelLockedUntil) return;
      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) return;
      const delta = touchStartY - endY;
      if (Math.abs(delta) > 42) {
        go(delta > 0 ? 1 : 0);
        wheelLockedUntil = now + 1200;
      }
      touchStartY = null;
    };
    const touchCancelHandler = () => { touchStartY = null; };
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        nav?.classList.remove("is-open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.setAttribute("aria-label", "Open navigation");
      }
      if (event.key === "ArrowDown" || event.key === "PageDown") go(1);
      if (event.key === "ArrowUp" || event.key === "PageUp") go(0);
    };

    const render = (rafNow: number) => {
      now = rafNow;
      const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
      lastNow = now;
      const t = reduced ? 0 : (now - t0) / 1000;
      const k = reduced ? 1 : seg(now, pT0, pT0 + transitionDuration);
      p = mix(pFrom, pTo, io(k));
      const voyageState = p > 0.68 ? "island" : "sea";
      if (frame.dataset.voyage !== voyageState) frame.dataset.voyage = voyageState;
      if (k >= 1 && replayAfterReturn && pTo === 0) {
        p = 0;
        pFrom = 0;
        pTo = 1;
        pT0 = now;
        transitionDuration = DUR;
        replayAfterReturn = false;
      }
      const dimensions = layout as typeof LAY.land | typeof LAY.port;
      const shipConfig = dimensions.ship;
      const sw = mix(shipConfig.w0, shipConfig.w1, p);
      const sx = mix(shipConfig.x0, shipConfig.x1, p);
      const sh = sw * 2002 / 1961;
      const wy = yAt(FRONT[0], sx, t, p);
      const slope = (yAt(FRONT[0], sx + 90, t, p) - yAt(FRONT[0], sx - 90, t, p)) / 180;
      if (ship) {
        ship.style.width = `${sw}px`;
        ship.style.height = `${sh}px`;
        ship.style.left = `${sx - sw / 2}px`;
        ship.style.top = `${wy + sw * 0.05 - sh}px`;
        ship.style.transform = `rotate(${Math.atan(slope) * 57.3 * 0.75}deg)`;
      }

      const cloudLeft = ((dimensions.w * 0.72 - t * 16) % (dimensions.w + 700) + dimensions.w + 700) % (dimensions.w + 700) - 400;
      if (cloud) {
        cloud.style.transform = `translate(${cloudLeft}px,0)`;
        cloud.style.opacity = `${1 - seg(p, 0.3, 0.7)}`;
      }
      const intro = reduced ? 1 : out(seg(now, t0 + 200, t0 + 1100));
      if (t1) {
        t1.style.opacity = `${intro * (1 - seg(p, 0.62, 0.7))}`;
        t1.style.transform = `translateY(${(1 - intro) * 26 - p * 40}px)`;
        t1.style.pointerEvents = p > 0.1 ? "none" : "auto";
      }
      if (logo) logo.style.opacity = `${1 - seg(p, 0.12, 0.3)}`;

      const e = io(seg(p, 0.04, 0.92));
      const palmConfig = dimensions.palm;
      const captConfig = dimensions.capt;
      const chestConfig = dimensions.chest;
      transform(palm, mix(-palmConfig.w - 80, 0, e), mix(-170, 0, e), Math.sin(t * 0.8) * 0.7);
      transform(capt, mix(-captConfig.w - 160, 0, e), 0, Math.sin(t * 1.1) * 0.5 * p);
      transform(chest, mix(-chestConfig.w - 720, 0, e), mix(120, 0, e));

      const b = out(seg(p, 0.5, 1));
      transform(bushL, 0, mix(340, 0, b));
      transform(bushR, 0, mix(300, 0, b));
      if (chapterViews) {
        const pageOpacity = frame.dataset.page === "home" ? 0 : seg(p, 0.7, 0.94);
        chapterViews.style.opacity = `${pageOpacity}`;
        chapterViews.style.pointerEvents = pageOpacity > 0.96 ? "auto" : "none";
        chapterViews.style.transform = `translateY(${mix(28, 0, out(pageOpacity))}px)`;
      }

      if (waveBack) makeWaves(waveBack, BACK, t, p);
      if (waveFront) makeWaves(waveFront, FRONT, t, p);
      if (shade) shade.style.transform = `translate(${Math.sin(t * 0.35) * 2.2}%,${Math.cos(t * 0.27) * 1.6}%) rotate(${Math.sin(t * 0.22) * 0.8}deg)`;

      if (fine && cursor && ping) {
        const f = 1 - Math.exp(-dt * 22);
        cursorX += (pointerX - cursorX) * f;
        cursorY += (pointerY - cursorY) * f;
        const ringScale = pointerDown ? 0.7 : overLink ? 1.35 : 1;
        cursor.style.transform = `translate(${cursorX}px,${cursorY}px) scale(${ringScale})`;
        const pingProgress = clamp((now - pingAt) / 650);
        ping.style.transform = `translate(${pingX}px,${pingY}px) scale(${1 + out(pingProgress) * 1.9})`;
        ping.style.opacity = `${1 - pingProgress}`;
      }

      frameId = requestAnimationFrame(render);
    };

    resize();
    frame.addEventListener("click", clickHandler);
    frame.addEventListener("wheel", wheelHandler, { passive: true });
    frame.addEventListener("touchstart", touchStartHandler, { passive: true });
    frame.addEventListener("touchend", touchEndHandler, { passive: true });
    frame.addEventListener("touchcancel", touchCancelHandler, { passive: true });
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("pointermove", movePointer, { passive: true });
    window.addEventListener("pointerdown", pointerDownHandler, { passive: true });
    window.addEventListener("pointerup", pointerUpHandler, { passive: true });
    window.addEventListener("pointercancel", pointerUpHandler, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      frame.removeEventListener("click", clickHandler);
      frame.removeEventListener("wheel", wheelHandler);
      frame.removeEventListener("touchstart", touchStartHandler);
      frame.removeEventListener("touchend", touchEndHandler);
      frame.removeEventListener("touchcancel", touchCancelHandler);
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerdown", pointerDownHandler);
      window.removeEventListener("pointerup", pointerUpHandler);
      window.removeEventListener("pointercancel", pointerUpHandler);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove("portrait", "fine");
    };
  }, []);

  return (
    <>
    <main className="frame" id="frame" ref={frameRef} data-page="home">
      <a className="logo" href="#" data-chapter="home" aria-label="WebCom Media home">
        <img src={webcomLogo} alt="" /><span>WebCom Media</span>
      </a>
      <nav className="voyage-nav" aria-label="Main navigation">
        <a href="#" data-chapter="home" aria-current="page">Home{anchorIcon(true)}</a>
        <a href="#" data-chapter="services">Services{anchorIcon(true)}</a>
        <a href="#" data-chapter="approach">Approach{anchorIcon(true)}</a>
        <a href="#" data-chapter="founders">Founders{anchorIcon(true)}</a>
        <a href="#" data-chapter="contact">Contact{anchorIcon(true)}</a>
      </nav>
      <nav className="voyage-side-nav" aria-label="Explore chapters">
        <a href="#" data-chapter="home" aria-current="page">Home</a>
        <a href="#" data-chapter="services">Services</a>
        <a href="#" data-chapter="approach">Approach</a>
        <a href="#" data-chapter="founders">Founders</a>
        <a href="#" data-chapter="contact">Contact</a>
      </nav>
      <a className="island-brand" href="#" data-chapter="home" aria-label="WebCom Media home">
        <span className="island-brand-lockup"><img src={webcomLogo} alt="" /><strong>WebCom Media</strong></span>
        <span className="island-brand-tagline">Digital presence · Practical AI</span>
      </a>
      <button className="nav-toggle" type="button" aria-expanded="false" aria-label="Open navigation">Menu <span>☰</span></button>
      <div id="scene">
        <div className="spr" id="cloudA" aria-hidden="true">
          <svg viewBox="0 0 300 80" width="300" height="80"><path fill="#d3cebe" d="M0 79c14-3 26-3 38-10-4-16 10-30 30-26 6-22 42-34 62-16 16-12 42-6 50 14 10-2 18 2 22 8 24 22 66 26 98 30z" /></svg>
        </div>
        <svg className="w" id="wBack" aria-hidden="true" />
        <div className="t1" id="t1">
          <div className="eb">Digital presence · Practical AI</div>
          <h1 aria-label="Made to be seen.">
            <span className="hero-word hero-word-1" aria-hidden="true">Made</span>{" "}
            <span className="hero-word hero-word-2" aria-hidden="true">to</span>{" "}
            <span className="hero-word hero-word-3" aria-hidden="true">be</span><br />
            <span className="hero-word hero-word-4" aria-hidden="true">seen.</span>
          </h1>
          <p className="intro-note">Websites, social, content and practical AI.</p>
          <a className="pill" href="#" data-chapter="services">Explore services</a>
        </div>
        <div className="spr" id="ship" aria-hidden="true" />
        <svg className="w" id="wFront" aria-hidden="true" />
        <div className="spr" id="palm" aria-hidden="true" />
        <div className="spr" id="capt" aria-hidden="true" />
        <div className="spr" id="chest" aria-hidden="true" />
        <div className="spr" id="bushL" aria-hidden="true" />
        <div className="spr" id="bushR" aria-hidden="true" />
        <div className="chapter-views" id="chapterViews" aria-live="polite">
          <section className="chapter-page services-page" id="page-services" aria-labelledby="services-title">
            <header className="chapter-heading">
              <p className="chapter-kicker">01 / SERVICES · THE SHIP’S MANIFEST</p>
              <h2 id="services-title">Everything your brand needs to move forward.</h2>
              <p>Creative work to help people find you. Practical AI to make the work behind it run smoother.</p>
            </header>
            <div className="service-grid">
              <article className="service-card"><span>01</span><div><h3>Website design &amp; development</h3><p>Custom, mobile-first websites that explain what you do and make it easy to take the next step.</p></div><b aria-hidden="true">↗</b></article>
              <article className="service-card"><span>02</span><div><h3>Instagram setup &amp; management</h3><p>A considered profile and consistent social content that gives your audience a reason to follow.</p></div><b aria-hidden="true">◎</b></article>
              <article className="service-card"><span>03</span><div><h3>Reels &amp; Meta advertising</h3><p>Short-form creative and paid campaigns planned around your audience, offer, and budget.</p></div><b aria-hidden="true">▶</b></article>
              <article className="service-card"><span>04</span><div><h3>AI automation</h3><p>Reduce repetitive work by connecting useful tools, with clear checks and people still in control.</p></div><b aria-hidden="true">⟲</b></article>
              <article className="service-card"><span>05</span><div><h3>AI consultation</h3><p>Find the right use cases, tools, and next steps before your team commits time or budget.</p></div><b aria-hidden="true">✳</b></article>
            </div>
            <a className="chapter-cta" href="mailto:hello@webcommedia.in?subject=WebCom%20Media%20services">Talk through a project <span>↗</span></a>
          </section>

          <section className="chapter-page approach-page" id="page-approach" aria-labelledby="approach-title">
            <header className="approach-top">
              <div className="approach-copy">
                <p className="chapter-kicker">02 / APPROACH · HOW WE WORK</p>
                <h2 id="approach-title">Good work starts with a clear plan.</h2>
              </div>
              <div className="approach-summary">
                <p>We keep the work collaborative and practical, with clear decisions and a next step at every stage.</p>
                <a className="chapter-cta" href="mailto:hello@webcommedia.in?subject=Let%E2%80%99s%20plan%20a%20project">Plan a project <span>↗</span></a>
              </div>
            </header>
            <ol className="approach-steps" aria-label="Our four project stages">
              <li className="approach-step"><span className="step-number">01</span><h3>Listen</h3><p>Understand your goals, audience, and current challenges.</p></li>
              <li className="approach-step"><span className="step-number">02</span><h3>Plan</h3><p>Agree on the right priorities, scope, and measures of success.</p></li>
              <li className="approach-step"><span className="step-number">03</span><h3>Make</h3><p>Build the creative, campaigns, or workflows together.</p></li>
              <li className="approach-step"><span className="step-number">04</span><h3>Improve</h3><p>Review the work, learn what performs, and refine the next move.</p></li>
            </ol>
          </section>

          <section className="chapter-page founders-page" id="page-founders" aria-labelledby="founders-title">
            <header className="founders-intro">
              <div>
                <p className="chapter-kicker">03 / FOUNDERS · THE PEOPLE BEHIND THE WORK</p>
                <h2 id="founders-title">Two founders. One hands-on team.</h2>
              </div>
              <p className="founders-description">You work directly with both co-founders, from the first conversation through delivery.</p>
            </header>
            <div className="founder-profiles">
              <article className="founder-profile"><figure className="founder-portrait"><img src="/founder-ansh-malviya.png" alt="Ansh Malviya, co-founder of WebCom Media"/></figure><div><span>CO-FOUNDER · 01</span><h3>Ansh Malviya</h3><p>WebCom Media</p></div></article>
              <article className="founder-profile"><figure className="founder-portrait"><img src="/cofounder-02.png" alt="Anish Minj, co-founder of WebCom Media"/></figure><div><span>CO-FOUNDER · 02</span><h3>Anish Minj</h3><p>WebCom Media</p></div></article>
            </div>
            <a className="chapter-cta" href="mailto:hello@webcommedia.in?subject=Meet%20the%20WebCom%20Media%20founders">Start a conversation <span>↗</span></a>
          </section>

          <section className="chapter-page contact-page" id="page-contact" aria-labelledby="contact-title">
            <div className="contact-copy">
              <p className="chapter-kicker">04 / CONTACT · SEND A SIGNAL</p>
              <h2 id="contact-title">Tell us where you want to go.</h2>
              <p>Share what you want to build, improve, or make easier. We’ll reply and take it from there.</p>
              <a className="contact-email-cta" href="mailto:hello@webcommedia.in?subject=Project%20enquiry%20for%20WebCom%20Media">hello@webcommedia.in <span>↗</span></a>
              <p className="contact-small-note">A direct line to the WebCom Media team.</p>
            </div>
            <div className="signal-art" aria-hidden="true">
              <div className="signal-ring signal-ring-one"/><div className="signal-ring signal-ring-two"/>
              <div className="signal-compass"><span>N</span><i>✦</i><b>S</b></div>
              <svg viewBox="0 0 500 220" fill="none"><path d="M14 188C112 58 180 207 265 104S397 27 485 95"/><circle cx="14" cy="188" r="7"/><circle cx="265" cy="104" r="7"/><circle cx="485" cy="95" r="7"/></svg>
            </div>
          </section>
        </div>
      </div>
      <canvas id="shade" width={64} height={36} aria-hidden="true" />
    </main>
    <div id="ping" aria-hidden="true" />
    <div id="cur" aria-hidden="true" />
    </>
  );
};

export default PirateVoyage;
