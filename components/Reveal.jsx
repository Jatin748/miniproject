import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
export const Reveal = ({ children, width = "100%" }) => {
  const ref = useRef(null);
  const inview = useInView(ref, { once: true });
  const mainControl = useAnimation();
  const slideControl = useAnimation();
  useEffect(() => {
    if (inview) {
      mainControl?.start("visible");
      slideControl?.start("visible");
    }
  }, [inview, mainControl, slideControl]);
  return (
    <div ref={ref} style={{ width, position: "relative", overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{ duration: 0.55, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        initial="hidden"
        animate={slideControl}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-purple-400"
      ></motion.div>
    </div>
  );
};
