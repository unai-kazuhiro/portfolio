// ハンバーガーメニュー内のアイテムのアニメーション定義
export const Hamburger = {
    open: {
      transition: {
        // stagger: 子要素を順番にアニメーションさせる
        // 0.08秒間隔で、最初の要素は0.2秒後に開始
        delayChildren: stagger(0.08, { startDelay: 0.2 }),
        ease: EASE_OUT_QUART,
        duration: 0.5,
      },
    },
  };
  