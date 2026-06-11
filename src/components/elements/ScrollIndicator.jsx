import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollIndicator = () => {
    // ページ全体のスクロール状況を監視
    const { scrollYProgress } = useScroll();

    // 縦スクロールを定義
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // // 横スクロールを定義
    // const scaleX = useSpring(scrollYProgress, {
    //     stiffness: 100,
    //     damping: 30,
    //     restDelta: 0.001
    // });

    // 0.00-0.25: HOME (青)
    // 0.25-0.50: ABOUT (緑)
    // 0.50-0.75: SKILLS (黄)
    // 0.75-1.00: PRODUCTS/CONTACT (赤)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1],
        ["#3b82f6", "#3b82f6", "#22c55e", "#22c55e", "#eab308", "#eab308", "#ef4444", "#ef4444"]
    );

    return (
        <motion.div
            // fixedで画面 の右端に固定
            // w-1: 太さ1(4px相当), h-full: 縦いっぱいに広げる
            // origin-top: 上端から伸びるようにする
            // // 横スクロールを定義
            // className="fixed top-0 left-0 right-0 h-1 origin-left z-60"
            // 縦スクロールを定義
            className="fixed top-0 right-0 w-1 h-full origin-top z-60"
            style={{
                // scaleX,
                scaleY,
                backgroundColor }}
        />
    );
};