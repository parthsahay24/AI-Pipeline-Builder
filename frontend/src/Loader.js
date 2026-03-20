// SOURCE CREDIT: AnimeJS Documentation (https://animejs.com/documentation/#staggering)
// Using AnimeJS v3 specifically to bypass CRA Webpack bundler limitations.
// This cinematic loader splits text and uses stagger delays for a gamified sequence.
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const text = "AI⬩PIPELINE⬩BUILDER";

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.8 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
  };

  const nodeVariants = (delay) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", delay, stiffness: 300 } }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="framer-loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="framer-loader-content">

            
            <svg width="100" height="100" viewBox="0 0 100 100" className="vectorshift-logo">

              <motion.path
                d="M 25 50 L 50 50 L 75 25 M 50 50 L 75 75"
                stroke="#FFFFFF"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                style={{ opacity: 0.8 }}
              />

              {/* Red Left Node */}
              <motion.circle
                cx="25" cy="50" r="5"
                fill="#EF4444"
                style={{ filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))" }}
                variants={nodeVariants(0.1)}
                initial="hidden" animate="visible"
              />

              {/* Central White Node */}
              <motion.circle
                cx="50" cy="50" r="5"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))" }}
                variants={nodeVariants(0.4)}
                initial="hidden" animate="visible"
              />

              {/* Top Right White Node */}
              <motion.circle
                cx="75" cy="25" r="5"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))" }}
                variants={nodeVariants(0.7)}
                initial="hidden" animate="visible"
              />

              {/* Bottom Right White Node */}
              <motion.circle
                cx="75" cy="75" r="5"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))" }}
                variants={nodeVariants(0.7)}
                initial="hidden" animate="visible"
              />
            </svg>

            <motion.h1
              className="framer-loader-text"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ paddingLeft: '14px' }}
            >
              {text.split('').map((char, index) => (
                <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

