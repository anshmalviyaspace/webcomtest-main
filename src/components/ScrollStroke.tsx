import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const ScrollStroke = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const reduceMotion = useReducedMotion();

  return (
    <div className="scroll-stroke-layer" aria-hidden="true">
      <svg
        className="scroll-stroke-svg"
        viewBox="0 0 1000 6000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="scroll-stroke-glow"
          d="M 835 0 C 660 140 615 250 740 390 C 865 530 955 650 780 790 C 605 930 340 905 275 1090 C 210 1275 535 1320 700 1450 C 865 1580 860 1740 660 1860 C 460 1980 175 1940 155 2150 C 135 2360 445 2440 665 2540 C 885 2640 935 2820 730 2950 C 525 3080 270 3040 210 3250 C 150 3460 440 3540 665 3650 C 890 3760 910 3920 735 4070 C 560 4220 280 4180 185 4380 C 90 4580 360 4690 610 4780 C 860 4870 925 5070 730 5210 C 535 5350 300 5310 205 5500 C 110 5690 380 5820 620 6000"
        />
        <motion.path
          className="scroll-stroke-line"
          d="M 835 0 C 660 140 615 250 740 390 C 865 530 955 650 780 790 C 605 930 340 905 275 1090 C 210 1275 535 1320 700 1450 C 865 1580 860 1740 660 1860 C 460 1980 175 1940 155 2150 C 135 2360 445 2440 665 2540 C 885 2640 935 2820 730 2950 C 525 3080 270 3040 210 3250 C 150 3460 440 3540 665 3650 C 890 3760 910 3920 735 4070 C 560 4220 280 4180 185 4380 C 90 4580 360 4690 610 4780 C 860 4870 925 5070 730 5210 C 535 5350 300 5310 205 5500 C 110 5690 380 5820 620 6000"
          style={{ pathLength: reduceMotion ? 1 : pathLength }}
        />
      </svg>
    </div>
  );
};

export default ScrollStroke;
