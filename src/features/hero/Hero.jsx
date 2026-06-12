import { useState } from "react";
import { motion } from "motion/react";

import { HeroBackground } from "./HeroBackground";

// 1. 親要素用：子要素を順番に出す（スタッガー）設定
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,     // 背景が少し見えてから0.5秒後に開始
            staggerChildren: 0.2    // 子要素を0.2秒間隔で順番に表示
        },
    },
};

// 2. 子要素用：下からふわっと浮き上がる設定
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        trancition: { duration: 0.8, ease: "easeOut" },
    },
};

export const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        // min-h-screen: 画面の高さを最低限確保, pt-16: ヘッダー分の余白を下げる
        <section id="HOME" className="relative w-full min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden px-4">
        
        {/* 背景コンポーネント */}
        <div className="absolute inset-0 z-0">
            <HeroBackground />
        </div>

            <motion.div
                className="relative z-10 text-center space-y-6 max-w-3xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* space-y-6: 子要素の上下マージンを自動設定 */}
                <motion.h1
                    className="text-5xl max-sm:text-6xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
                    variants={itemVariants}
                >
                    HELLO, I'M{" "}
                    <p className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-emerald-400">
                        KAZUHIRO UNAI.
                    </p>
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-slate-400 tracking-widest font-mono"
                    variants={itemVariants}
                >
                    SOFTWARE ENGINEER / WEB DEVELOPER
                </motion.p>
            
                {/* ボタンエリアの上下マージン（mt-8）とボタン間の余白（gap-6） */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                    <motion.button
                        className="px-8 py-4 border border-cyan-500 text-cyan-400 font-bold tracking-wider rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        onClick={openModal}
                    >
                        VIEW MY WORK
                    </motion.button>
                    <motion.button
                        className="px-8 py-4 border border-emerald-500 text-emerald-400 font-bold tracking-wider rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                    >
                        <a href="#CONTACT">CONTACT ME</a>
                    </motion.button>
                </div>
            </motion.div>

            {isModalOpen && (
                <div
                // bg-stone-900/10 で極薄の影にし、backdrop-blur-sm で背景を優しくすりガラス状に透かせます
                className="fixed inset-0 bg-stone-900/10 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
                onClick={() => setIsModalOpen(false)}
                >
                {/* ポップアップのボックス：白をベースに、細い線とマイルドな角丸で無垢な印象に */}
                <div
                    className="bg-white/95 border border-stone-200 p-8 rounded-md shadow-sm max-w-sm w-full m-4 transform transition-all duration-300 text-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* タイトル：文字を小さく、スマートに */}
                    <h3 className="text-lg font-normal tracking-wide text-stone-800 mb-4">
                        Coming Soon
                    </h3>
                    
                    {/* メッセージ：行間をゆったりさせ、柔らかいグレーに */}
                    <p className="text-sm font-light text-stone-500 mb-8 leading-relaxed">
                        申し訳ありませんが、ただいま作品を準備中です。<br />
                        完成次第、こちらに掲載いたします。
                    </p>

                    {/* 閉じるボタン：全体のトーンに合わせたシックな色味 */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full bg-stone-800 text-white py-2.5 rounded-sm text-xs tracking-widest hover:bg-stone-900 transition-colors duration-300"
                    >
                        CLOSE
                    </button>
                </div>
                </div>
            )}
        </section>
    )
};