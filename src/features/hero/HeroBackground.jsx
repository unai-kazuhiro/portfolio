import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

// --- 流れ星コンポーネント ---
const ShootingStar = ({ delay, top, right }) => {
  return (
    <motion.div
      className="absolute h-[2px] bg-linear-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#fff]"
      style={{ width: '150px', top: top, right: right, rotate: -45 }}
      initial={{ x: 200, y: -200, opacity: 0 }}
      animate={{ x: -1500, y: 1500, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: delay, ease: "linear" }}
    />
  );
};

export const HeroBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { stiffness: 50, damping: 20 };
  const smoothMouseX = useSpring(mousePosition.x, springConfig);
  const smoothMouseY = useSpring(mousePosition.y, springConfig);

  // マウス追従用の移動量（親要素に適用）
  const mouseX1 = useTransform(smoothMouseX, (x) => x * -0.2);
  const mouseY1 = useTransform(smoothMouseY, (y) => y * -0.2);
  const mouseX2 = useTransform(smoothMouseX, (x) => x * 0.15);
  const mouseY2 = useTransform(smoothMouseY, (y) => y * 0.15);
  const mouseX3 = useTransform(smoothMouseX, (x) => x * -0.1);
  const mouseY3 = useTransform(smoothMouseY, (y) => y * 0.1);

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      
      {/* 1. オーロラの玉（青系） */}
      {/* 親要素：マウスの動きに合わせてズレる */}
      <motion.div className="absolute top-[5%] left-[5%]" style={{ x: mouseX1, y: mouseY1 }}>
        {/* 子要素：自律的に画面を漂い、形を変える */}
        <motion.div
          // グラデーションと弱めのぼかしで、輪郭をくっきりさせる
          className="w-[35vw] h-[35vw] opacity-80 mix-blend-screen blur-[30px] bg-linear-to-tr from-cyan-400 to-blue-600"
          animate={{
            x: [0, 150, -50, 0], // 大きく移動する
            y: [0, -100, 100, 0],
            rotate: [0, 180, 360], // 回転して形を強調
            borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "30% 70% 70% 30%", "40% 60% 70% 30%"],
          }}
          // linearにすることで、止まることなく動き続ける
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* 2. オーロラの玉（ピンク系） */}
      <motion.div className="absolute bottom-[10%] right-[10%]" style={{ x: mouseX2, y: mouseY2 }}>
        <motion.div
          className="w-[45vw] h-[45vw] opacity-70 mix-blend-screen blur-2xl bg-linear-to-tr from-fuchsia-500 to-purple-600"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 150, -50, 0],
            rotate: [360, 180, 0],
            borderRadius: ["60% 40% 30% 70%", "30% 70% 70% 30%", "70% 30% 40% 60%", "60% 40% 30% 70%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* 3. オーロラの玉（エメラルド系） */}
      <motion.div className="absolute top-[30%] left-[30%]" style={{ x: mouseX3, y: mouseY3 }}>
        <motion.div
          className="w-[30vw] h-[30vw] opacity-70 mix-blend-screen blur-[35px] bg-linear-to-tr from-emerald-400 to-teal-500"
          animate={{
            x: [0, 100, -150, 0],
            y: [0, 100, -150, 0],
            rotate: [0, 90, 360],
            borderRadius: ["50% 50% 20% 80%", "20% 80% 50% 50%", "80% 20% 50% 50%", "50% 50% 20% 80%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* --- 流れ星群 --- */}
      <ShootingStar delay={2} top="15%" right="-10%" />
      <ShootingStar delay={6} top="30%" right="-5%" />
      <ShootingStar delay={10} top="5%" right="20%" />

      {/* 暗闇のベール (テキストの視認性を確保するため) */}
      <div className="absolute inset-0 bg-slate-950/20 z-0"></div>
    </div>
  );
};