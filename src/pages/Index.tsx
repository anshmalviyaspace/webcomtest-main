import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const HomeBelowFold = lazy(() => import("./HomeBelowFold"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Suspense
        fallback={
          <div className="min-h-[30vh] bg-background border-t border-border/30" aria-hidden />
        }
      >
        <HomeBelowFold />
      </Suspense>
    </div>
  );
};

export default Index;
