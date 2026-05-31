import type { ReactNode } from "react";

/** Wrapper: skips paint for off-screen sections (content-visibility) */
const PerfSection = ({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <div id={id} className={`perf-section ${className}`.trim()}>
    {children}
  </div>
);

export default PerfSection;
