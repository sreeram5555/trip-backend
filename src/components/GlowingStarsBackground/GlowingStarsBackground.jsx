// // import React, { useEffect, useRef, useState } from "react";
// // import { AnimatePresence, motion } from "framer-motion";
// // import { cn } from "../../lib/utils"; // Import our new utility function
// // import "./GlowingStarsBackground.css";

// // const Star = ({ isGlowing, delay }) => {
// //   return (
// //     <motion.div
// //       key={delay}
// //       initial={{ scale: 1 }}
// //       animate={{
// //         scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
// //         background: isGlowing ? "#fff" : "#666",
// //       }}
// //       transition={{
// //         duration: 2,
// //         ease: "easeInOut",
// //         delay: delay,
// //       }}
// //       className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
// //     />
// //   );
// // };

// // const Glow = ({ delay }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 2, ease: "easeInOut", delay: delay }}
// //       exit={{ opacity: 0 }}
// //       className="glow-effect"
// //     />
// //   );
// // };

// // export const GlowingStarsBackground = () => {
// //   // Use a large number of stars to fill the screen
// //   const stars = 200; 
// //   const columns = 25; // Adjust grid columns for better distribution

// //   const [glowingStars, setGlowingStars] = useState([]);
// //   const highlightedStars = useRef([]);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       // Randomly highlight a new set of stars
// //       highlightedStars.current = Array.from({ length: 10 }, () =>
// //         Math.floor(Math.random() * stars)
// //       );
// //       setGlowingStars([...highlightedStars.current]);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="glowing-stars-container">
// //       {[...Array(stars)].map((_, starIdx) => {
// //         const isGlowing = glowingStars.includes(starIdx);
// //         const delay = (starIdx % 10) * 0.1;
// //         return (
// //           <div key={`star-container-${starIdx}`} className="star-container">
// //             <Star isGlowing={isGlowing} delay={delay} />
// //             <AnimatePresence mode="wait">
// //               {isGlowing && <Glow delay={delay} />}
// //             </AnimatePresence>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default GlowingStarsBackground;
// // import React, { useEffect, useState } from "react";
// // import { AnimatePresence, motion } from "framer-motion";
// // import { cn } from "../../lib/utils";
// // import "./GlowingStarsBackground.css";

// // const Star = ({ isGlowing, delay }) => {
// //   return (
// //     <motion.div
// //       key={delay}
// //       initial={{ scale: 1, backgroundColor: "#666" }}
// //       animate={{
// //         scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
// //         backgroundColor: isGlowing ? "#fff" : "#666",
// //       }}
// //       transition={{
// //         duration: 2,
// //         ease: "easeInOut",
// //         delay: delay,
// //       }}
// //       className={cn("h-[2px] w-[2px] rounded-full")}
// //     />
// //   );
// // };

// // const Glow = ({ delay }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 2, ease: "easeInOut", delay: delay }}
// //       exit={{ opacity: 0 }}
// //       className="glow-effect"
// //     />
// //   );
// // };

// // export const GlowingStarsBackground = () => {
// //   const stars = 200;
// //   const [glowingStars, setGlowingStars] = useState([]);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const highlighted = Array.from({ length: 10 }, () =>
// //         Math.floor(Math.random() * stars)
// //       );
// //       setGlowingStars(highlighted);
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="glowing-stars-container">
// //       {[...Array(stars)].map((_, starIdx) => {
// //         const isGlowing = glowingStars.includes(starIdx);
// //         const delay = (starIdx % 10) * 0.1;
// //         return (
// //           <div key={`star-container-${starIdx}`} className="star-container">
// //             <Star isGlowing={isGlowing} delay={delay} />
// //             <AnimatePresence mode="wait">
// //               {isGlowing && <Glow delay={delay} />}
// //             </AnimatePresence>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// import React, { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { cn } from "../../lib/utils";
// import "./GlowingStarsBackground.css";

// const Star = ({ isGlowing, delay }) => {
//   return (
//     <motion.div
//       key={delay}
//       initial={{ scale: 1 }}
//       animate={{
//         scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
//         background: isGlowing ? "#fff" : "#666",
//       }}
//       transition={{
//         duration: 2,
//         ease: "easeInOut",
//         delay: delay,
//       }}
//       className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
//     />
//   );
// };

// const Glow = ({ delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 2, ease: "easeInOut", delay: delay }}
//       exit={{ opacity: 0 }}
//       className="glow-effect"
//     />
//   );
// };

// // This line is changed from 'export const' to just 'const'
// const GlowingStarsBackground = () => {
//   const stars = 200; 
//   const columns = 25;

//   const [glowingStars, setGlowingStars] = useState([]);
//   const highlightedStars = useRef([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       highlightedStars.current = Array.from({ length: 10 }, () =>
//         Math.floor(Math.random() * stars)
//       );
//       setGlowingStars([...highlightedStars.current]);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="glowing-stars-container">
//       {[...Array(stars)].map((_, starIdx) => {
//         const isGlowing = glowingStars.includes(starIdx);
//         const delay = (starIdx % 10) * 0.1;
//         return (
//           <div key={`star-container-${starIdx}`} className="star-container">
//             <Star isGlowing={isGlowing} delay={delay} />
//             <AnimatePresence mode="wait">
//               {isGlowing && <Glow delay={delay} />}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // --- THIS IS THE CRITICAL FIX ---
// // We now add 'export default' at the end of the file.
// export default GlowingStarsBackground;
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import "./GlowingStarsBackground.css";

const Star = ({ isGlowing, delay }) => {
  return (
    <motion.div
      key={delay}
      initial={{ scale: 1 }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
    />
  );
};

const Glow = ({ delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: delay }}
      exit={{ opacity: 0 }}
      className="glow-effect"
    />
  );
};

// This line is changed from 'export const' to just 'const'
const GlowingStarsBackground = () => {
  const stars = 200; 
  const columns = 25;

  const [glowingStars, setGlowingStars] = useState([]);
  const highlightedStars = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glowing-stars-container">
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        return (
          <div key={`star-container-${starIdx}`} className="star-container">
            <Star isGlowing={isGlowing} delay={delay} />
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// --- THIS IS THE CRITICAL FIX ---
// We now add 'export default' at the end of the file.
export default GlowingStarsBackground;