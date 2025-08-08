import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./MacbookScroll.css";
// This import path works because the image is in the same folder.
import screenImage from './itinerary-screen.jpeg'; 

const MacbookScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [15, 0]);
  const lidRotateX = useTransform(scrollYProgress, [0.3, 0.5], [0, -95]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.45, 0.55], ["2rem", "0rem"]);

  return (
    <div ref={targetRef} className="macbook-container">
        <motion.h2 style={{ opacity: textOpacity, y: textY }} className="macbook-title">
            Unleash the Power of AI Travel
        </motion.h2>

        <motion.div
            style={{
                scale: scale,
                rotateX: rotateX,
            }}
            className="macbook-wrapper"
        >
            <div className="macbook-body">
                <motion.div style={{ rotateX: lidRotateX }} className="macbook-lid">
                    <div className="lid-camera" />
                    <div className="lid-screen">
                        <img src={screenImage} alt="App Screenshot" />
                    </div>
                </motion.div>
                <div className="macbook-base">
                    <div className="base-notch" />
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default MacbookScroll;