import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  contentClassName?: string;
  radius?: number;
  bevelDepth?: number;
  scale?: number;
  aberration?: number;
  frost?: number;
  tint?: number;
};

type LiquidGlassMode = "pending" | "simple" | "opaque";

export function LiquidGlass({
  children,
  className,
  contentClassName,
  radius = 999,
  bevelDepth = 14,
  scale = 48,
  aberration = 4,
  frost = 0.4,
  tint = 0.12,
  style,
  ...rest
}: LiquidGlassProps) {
  const reactId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<string | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [filter, setFilter] = useState<{ id: string; svg: string } | null>(null);
  const [mode, setMode] = useState<LiquidGlassMode>("pending");

  useEffect(() => {
    if (prefersReducedTransparency()) setMode("opaque");
    else if (isSafariLike() || !supportsUrlBackdropFilter()) setMode("simple");
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || mode !== "pending") return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const box = entry.borderBoxSize?.[0];
      setSize({
        w: Math.max(1, Math.round(box?.inlineSize ?? entry.contentRect.width)),
        h: Math.max(1, Math.round(box?.blockSize ?? entry.contentRect.height)),
      });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    if (mode !== "pending" || size.w <= 1 || size.h <= 1) return;
    let cancelled = false;

    void (async () => {
      const mapUrl = await generateDisplacementBlobUrl({
        width: size.w,
        height: size.h,
        radius: Math.min(radius, size.w / 2, size.h / 2),
        bevelDepth: Math.min(bevelDepth, Math.min(size.w, size.h) / 2),
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
      await new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = image.onerror = () => resolve();
        image.src = mapUrl;
      });

      if (cancelled) {
        URL.revokeObjectURL(mapUrl);
        return;
      }
      if (blobRef.current) URL.revokeObjectURL(blobRef.current);
      blobRef.current = mapUrl;

      const id = `liquid-glass-${reactId}-${size.w}x${size.h}-${Date.now().toString(36)}`;
      setFilter({
        id,
        svg: buildFilterSvg({ id, mapUrl, width: size.w, height: size.h, scale, aberration, frost }),
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, size.w, size.h, radius, bevelDepth, scale, aberration, frost, reactId]);

  useEffect(() => () => {
    if (blobRef.current) URL.revokeObjectURL(blobRef.current);
  }, []);

  const backdrop = mode === "opaque"
    ? "none"
    : mode === "simple"
      ? "blur(20px) saturate(1.4)"
      : filter
        ? `url(#${filter.id}) blur(0.5px) saturate(1.85) brightness(1.02)`
        : "blur(10px) saturate(1.6) brightness(1.04)";

  return (
    <div
      ref={rootRef}
      data-refract={mode === "pending" && filter ? "true" : "false"}
      className={cn(
        "relative overflow-hidden",
        mode === "simple" && "bg-white/70 dark:bg-neutral-900/60",
        mode === "opaque" && "bg-white dark:bg-neutral-900",
        className,
      )}
      style={{
        borderRadius: radius,
        backgroundColor: mode === "pending" ? `rgb(255 255 255 / ${tint})` : undefined,
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
        ...style,
      }}
      {...rest}
    >
      {filter && (
        <span
          key={filter.id}
          aria-hidden="true"
          className="pointer-events-none absolute size-0 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: filter.svg }}
        />
      )}
      {contentClassName ? <div className={contentClassName}>{children}</div> : children}
    </div>
  );
}

function supportsUrlBackdropFilter() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("backdrop-filter", "url(#x)") || CSS.supports("-webkit-backdrop-filter", "url(#x)");
}

function prefersReducedTransparency() {
  return typeof window !== "undefined"
    && Boolean(window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches);
}

function isSafariLike() {
  if (typeof navigator === "undefined") return false;
  return /Safari/.test(navigator.userAgent) && !/Chrome|Chromium|Edg|OPR/.test(navigator.userAgent);
}

function sdRoundedBox(px: number, py: number, halfW: number, halfH: number, radius: number) {
  const qx = Math.abs(px) - halfW + radius;
  const qy = Math.abs(py) - halfH + radius;
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius;
}

function bendFromDepth(x: number) {
  const u = 1 - Math.min(1, Math.max(0, x));
  const denominator = (1 - u ** 4) ** 0.75;
  if (denominator < 1e-6) return 0;
  const incident = Math.atan(Math.min(u ** 3 / denominator, 8));
  const sine = Math.sin(incident) / 1.5;
  return sine >= 1 ? Math.sin(incident) : Math.sin(incident - Math.asin(sine));
}

function buildPhiTable(bevel: number) {
  const count = Math.max(1, Math.ceil(bevel));
  const values = new Float32Array(count + 1);
  for (let depth = 1; depth <= count; depth += 1) values[depth] = values[depth - 1] + bendFromDepth(depth / count);
  return values;
}

function samplePhi(values: Float32Array, depth: number) {
  const max = values.length - 1;
  if (depth <= 0) return values[0];
  if (depth >= max) return values[max];
  const index = Math.floor(depth);
  const fraction = depth - index;
  return values[index] * (1 - fraction) + values[index + 1] * fraction;
}

type DisplacementOptions = {
  width: number;
  height: number;
  radius: number;
  bevelDepth: number;
  dpr: number;
  gain?: number;
  light?: { x: number; y: number };
};

function computeDisplacementData(options: DisplacementOptions) {
  const dpr = options.dpr ?? 1;
  const gain = options.gain ?? 1.35;
  const light = options.light ?? { x: -0.55, y: -0.85 };
  const lightLength = Math.hypot(light.x, light.y) || 1;
  const lx = light.x / lightLength;
  const ly = light.y / lightLength;
  const width = Math.max(1, Math.round(options.width * dpr));
  const height = Math.max(1, Math.round(options.height * dpr));
  const halfW = width / 2;
  const halfH = height / 2;
  const radius = Math.min(options.radius * dpr, halfW, halfH);
  const bevel = Math.max(1, options.bevelDepth * dpr);
  const phi = buildPhiTable(bevel);
  const field = new Float32Array(width * height);

  for (let y = 0; y < height; y += 1) {
    const py = y - halfH + 0.5;
    for (let x = 0; x < width; x += 1) {
      const distance = sdRoundedBox(x - halfW + 0.5, py, halfW, halfH, radius);
      field[y * width + x] = distance > 0 ? 0 : samplePhi(phi, Math.min(bevel, -distance));
    }
  }

  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const py = y - halfH + 0.5;
    for (let x = 0; x < width; x += 1) {
      const px = x - halfW + 0.5;
      const index = (y * width + x) << 2;
      const distance = sdRoundedBox(px, py, halfW, halfH, radius);
      if (distance > 0) {
        data[index] = data[index + 1] = data[index + 2] = 128;
        data[index + 3] = 0;
        continue;
      }

      const x0 = Math.max(0, x - 1);
      const x1 = Math.min(width - 1, x + 1);
      const y0 = Math.max(0, y - 1);
      const y1 = Math.min(height - 1, y + 1);
      const dPhiX = (field[y * width + x1] - field[y * width + x0]) / (x1 - x0 || 1);
      const dPhiY = (field[y1 * width + x] - field[y0 * width + x]) / (y1 - y0 || 1);
      const dx = Math.max(-1, Math.min(1, dPhiX * gain));
      const dy = Math.max(-1, Math.min(1, dPhiY * gain));

      let specular = 0;
      if (distance >= -bevel) {
        const gx = sdRoundedBox(px + 1, py, halfW, halfH, radius) - sdRoundedBox(px - 1, py, halfW, halfH, radius);
        const gy = sdRoundedBox(px, py + 1, halfW, halfH, radius) - sdRoundedBox(px, py - 1, halfW, halfH, radius);
        const length = Math.hypot(gx, gy) || 1;
        const dot = (gx / length) * lx + (gy / length) * ly;
        const rim = 1 - Math.min(1, -distance / bevel);
        specular = (Math.max(0, dot) + Math.max(0, -dot) * 0.35) * rim;
      }

      data[index] = 128 + dx * 127;
      data[index + 1] = 128 + dy * 127;
      data[index + 2] = Math.round(specular * 255);
      data[index + 3] = 255;
    }
  }
  return { data, width, height };
}

async function generateDisplacementBlobUrl(options: DisplacementOptions) {
  const { data, width, height } = computeDisplacementData(options);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("2d context unavailable");
  context.putImageData(new ImageData(data, width, height), 0, 0);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Failed to encode displacement map");
  return URL.createObjectURL(blob);
}

type FilterOptions = {
  id: string;
  mapUrl: string;
  width: number;
  height: number;
  scale: number;
  aberration: number;
  frost: number;
};

function buildFilterSvg({ id, mapUrl, width, height, scale, aberration, frost }: FilterOptions) {
  const pad = Math.ceil(scale + aberration + 4);
  const xPad = (pad / Math.max(1, width)) * 100;
  const yPad = (pad / Math.max(1, height)) * 100;
  const region = `x="-${xPad.toFixed(3)}%" y="-${yPad.toFixed(3)}%" width="${(100 + 2 * xPad).toFixed(3)}%" height="${(100 + 2 * yPad).toFixed(3)}%"`;
  const map = `<feImage href="${mapUrl}" xlink:href="${mapUrl}" x="0" y="0" width="${width}" height="${height}" result="map" preserveAspectRatio="none"/>`;
  const displace = (amount: number, result: string) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${amount}" xChannelSelector="R" yChannelSelector="G" result="${result}"/>`;
  const body = aberration <= 0
    ? displace(scale, "rgb")
    : `${displace(scale + aberration, "dispR")}
      <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
      ${displace(scale, "dispG")}
      <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green"/>
      ${displace(Math.max(0, scale - aberration), "dispB")}
      <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>
      <feBlend in="red" in2="green" mode="screen" result="rg"/>
      <feBlend in="rg" in2="blue" mode="screen" result="rgb"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><filter id="${id}" color-interpolation-filters="sRGB" ${region}>
    ${map}${body}<feGaussianBlur in="rgb" stdDeviation="${frost}"/>
  </filter></svg>`;
}
