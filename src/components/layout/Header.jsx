import React, { useState } from 'react';
// motion: アニメーションを付与するためのコアコンポーネント
// AnimatePresence: 要素がDOMから「消える時（アンマウント時）」のアニメーションを有効にするラッパー
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
    { name: "HOME", href: "#HOME" },
    { name: "ABOUT", href: "#ABOUT" },
    { name: "SKILLS", href: "#SKILLS" },
    // { name: "PRODUCTS", href: "#PRODUCTS" },
    { name: "CONTACT", href: "#CONTACT" },
];

// Tailwind CSSの共通クラス名を定数化。
const LINKSTYLE = "text-slate-300 hover:text-white font-medium transition-colors duration-200 text-sm md:text-base";

export const Header = () => {
    // スマホ用メニューが開いているか（true）、閉じているか（false）を管理する状態（State）
    const [isOpen, setIsOpen] = useState(false);

    // ハンバーガーボタンを押した時に、開閉状態を反転させる関数
    const toggleMenu = () => setIsOpen(!isOpen);
    // メニュー内のリンクをクリックした時に、メニューを強制的に閉じる関数
    const closeMenu = () => setIsOpen(false);

    // ==========================================
    // 1. ハンバーガーアニメーションの定義 (Variants)
    // ==========================================
    // variantsとは、アニメーションの「状態（今回は closed と open）」を定義したオブジェクトです。

    // type: "spring" でバネのような物理演算アニメーションを設定。
    // stiffness（硬さ）と damping（減衰・ブレーキ）で弾み具合を調整しています。
    const springTransition = { type: "spring", stiffness: 300, damping: 20 };

    // 「d: "M 3 6 L 21 6"」は座標を設定。<motion.path>タグ内のviewBox属性が全ての基準であり、「0 0 24 24」という数値は、「左上端が (0, 0) で、右下端が (24, 24) の箱がある」と定義される。
    // 「M 3 6」は「x軸 y軸」を定義する。
    // ハンバーガーの「上の線」の動き
    const topPathVariants = {
        closed: { d: "M 3 6 L 21 6" }, // まっすぐな線
        open: { d: "M 5 5 L 19 19" },  // 斜めの線に変形（✕の片割れ）
    };

    // ハンバーガーの「真ん中の線」の動き
    const middlePathVariants = {
        closed: { opacity: 1, x: 0, scale: 1 }, // 通常表示
        open: { opacity: 0, x: 30, scale: 0.5 }, // 右(x:30)に動きつつ、縮み(scale)ながら透明(opacity)になって消える
    };

    // ハンバーガーの「下の線」の動き
    const bottomPathVariants = {
        closed: { d: "M 3 18 L 21 18" },
        open: { d: "M 5 19 L 19 5" },  // 逆斜めの線に変形（✕のもう片割れ）
    };

    // ==========================================
    // 2. PCナビゲーションの初期レンダリング設定 (Variants)
    // ==========================================
    const pcNavVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,   // 親要素が表示されてから0.1秒待って子要素を動かす
                staggerChildren: 0.15 // 子要素（リンク）を0.15秒ずらしながら順番にアニメーションさせる（カスケード効果）
            }
        }
    };

    const pcLinkVariants = {
        hidden: { opacity: 0, y: -20 }, // 初期状態は上に20pxズレて透明
        visible: { 
            opacity: 1, 
            y: 0, // 元の位置に戻る
            transition: { type: "spring", stiffness: 300, damping: 24 } 
        }
    };

    // ==========================================
    // 3. スマホメニューの開閉設定 (Variants)
    // ==========================================
    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20, scaleY: 0 }, // 高さが0（scaleY: 0）の状態
        visible: { 
            opacity: 1, y: 0, scaleY: 1, // 通常サイズ（scaleY: 1）に展開
            transition: {
                type: "easeInOut", duration: 0.3,
                when: "beforeChildren", // 親（メニューの背景）が完全に展開してから、子（リンク）のアニメーションを開始する
                staggerChildren: 0.05   // リンクを0.05秒ずつずらして表示
            }
        },
        exit: { 
            opacity: 0, y: -20, scaleY: 0, // 閉じる時は逆の動き
            transition: { type: "easeInOut", duration: 0.2 }
        }
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, x: -20 }, // 左に20pxズレた状態から
        visible: { opacity: 1, x: 0 }   // 元の位置へスライドイン
    };

    return (
        <>
            <motion.header 
                className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-slate-800/50 transition-shadow"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between md:justify-center md:gap-12 relative">
                
                    {/* --- ハンバーガーボタン (スマホのみ表示) --- */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden focus:outline-none relative z-50 p-2 -ml-2"
                        aria-label="Toggle Menu"
                    >
                        {/* SVG全体をmotionでラップし、アイコン全体のアニメーションを制御 */}
                        <motion.svg 
                            width="24" height="24" viewBox="0 0 24 24"
                            initial="closed"
                            // isOpenがtrueなら "open" の状態へ、falseなら "closed" の状態へアニメーション
                            animate={isOpen ? "open" : "closed"}
                            variants={{
                                closed: { rotate: 0 },
                                open: { rotate: 180 } // アイコン全体を180度回転（スピン効果）
                            }}
                            transition={springTransition}
                            whileTap={{ scale: 0.85 }} // ユーザーがタップした瞬間にボタン全体を少し縮ませるフィードバック
                        >
                            {/* 3本の線をそれぞれmotion.pathで描画し、上で定義したvariantsを適用 */}
                            <motion.path
                                fill="transparent" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round"
                                variants={topPathVariants} transition={springTransition} className="text-slate-300"
                            />
                            <motion.path
                                d="M 3 12 L 21 12"
                                fill="transparent" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round"
                                variants={middlePathVariants} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="text-slate-300"
                            />
                            <motion.path
                                fill="transparent" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round"
                                variants={bottomPathVariants} transition={springTransition} className="text-slate-300"
                            />
                        </motion.svg>
                    </button>

                    {/* --- PC用ナビゲーション (初期レンダリングアニメーション付き) --- */}
                    <motion.nav 
                        className="hidden md:flex md:items-center md:gap-10"
                        initial="hidden"   // マウント時の初期状態
                        animate="visible"  // 自動的にこの状態へアニメーション
                        variants={pcNavVariants} // 親要素のvariants（カスケードの制御など）
                    >
                        {/* navLinks配列をmap関数で展開し、リンクを自動生成 */}
                        {navLinks.map((link, index) => (
                            <motion.a 
                                key={index} // Reactで配列をレンダリングする際の必須プロパティ
                                href={link.href} 
                                className={LINKSTYLE}
                                variants={pcLinkVariants} // 子要素（各リンク）のvariants
                                whileHover={{ scale: 1.05, color: "#ffffff" }} // マウスオーバー時に少し拡大＆色を白に
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.nav>

                    {/* flexの justify-between を使用しているため、PC中央寄せ・スマホ左寄せのレイアウトが崩れないよう、右側に透明なダミー要素を配置 */}
                    <div className="w-10 md:hidden"></div>

                    {/* --- スマホ用ナビゲーション --- */}
                    {/* 内部のmotion要素が exit のアニメーションを再生し終わるまで、DOMからの削除を待ってくれるコンポーネント */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.nav
                                initial="hidden" animate="visible" exit="exit" variants={mobileMenuVariants}
                                // top-full: ヘッダーのすぐ下から配置。 origin-top: アニメーションの起点を「上端」に設定
                                className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 md:hidden origin-top shadow-xl"
                            >
                                <motion.ul className="flex flex-col items-center py-8 gap-6">
                                    {navLinks.map((link, index) => (
                                        <motion.li 
                                            key={index} variants={mobileItemVariants}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {/* リンク押下後にメニューを閉じるため onClick={closeMenu} を付与 */}
                                            <a href={link.href} className={`${LINKSTYLE} text-lg py-1 block`} onClick={closeMenu}>
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.nav>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>
        </>
    )
};