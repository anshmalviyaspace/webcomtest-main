import { lazy, Suspense, useEffect, useRef, useState } from "react";
import MetricBar from "@/components/MetricBar";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import OrbSection from "@/components/OrbSection";
import GlowDivider from "@/components/GlowDivider";
import TrustLogos from "@/components/TrustLogos";
import Clients from "@/components/Clients";
import Values from "@/components/Values";
import Founder from "@/components/founder";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Tools = lazy(() => import("@/components/Tools"));

function ToolsSectionSkeleton() {
  return (
    <section id="tools" className="py-10 md:py-28 bg-card" aria-busy="true" aria-label="Loading tools">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mb-12 space-y-3">
          <div className="h-3 w-24 rounded bg-muted/40 animate-pulse" />
          <div className="h-10 max-w-md rounded bg-muted/30 animate-pulse" />
          <div className="h-4 max-w-sm rounded bg-muted/25 animate-pulse" />
        </div>
        <div className="h-80 max-w-6xl mx-auto rounded-2xl bg-muted/15 animate-pulse" />
      </div>
    </section>
  );
}

function DeferredTools() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full shrink-0" aria-hidden />
      {load ? (
        <Suspense fallback={<ToolsSectionSkeleton />}>
          <Tools />
        </Suspense>
      ) : (
        <ToolsSectionSkeleton />
      )}
    </>
  );
}

const HomeBelowFold = () => {
  return (
    <>
      <MetricBar />
      <GlowDivider />
      <Philosophy />
      <GlowDivider />
      <Services />
      <GlowDivider />
      <OrbSection />
      <GlowDivider />
      <DeferredTools />
      <GlowDivider />
      <TrustLogos />
      <GlowDivider />
      <Clients />
      <GlowDivider />
      <Values />
      <GlowDivider />
      <Founder />
      <GlowDivider />
      <CTA />
      <Footer />
    </>
  );
};

export default HomeBelowFold;
