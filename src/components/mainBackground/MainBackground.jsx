import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const MainBackground = () => {
  const { scrollYProgress } = useScroll();

  // スクロールで下に移動する距離
  const auroraY1 = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const auroraY2 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
      
      {/* 1. 青系オーロラ */}
      <motion.div
        style={{ y: auroraY1 }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] mix-blend-screen filter blur-[90px] opacity-50 bg-linear-to-tr from-cyan-500 to-blue-700"
        animate={{
          x: [0, 50, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 2. 紫系オーロラ */}
      <motion.div
        style={{ y: auroraY2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] mix-blend-screen filter blur-[100px] opacity-40 bg-linear-to-tr from-fuchsia-600 to-purple-800"
        animate={{
          x: [0, -50, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};