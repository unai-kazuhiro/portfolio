import { motion } from "motion/react";

import myPhoto from '../../../src/assets/img/about.PNG';

// 1. 親コンテナ用：子要素を順番に表示する（スタッガー）
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // 0.3秒間隔でタイトル→画像→テキストの順に出す
    },
  },
};

// 2. タイトル用：下から上へフワッと
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// 3. 画像用：左から右へスライド
const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// 4. テキスト用：右から左へスライド
const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const About = () => (
  // overflow-hidden を追加し、左右からスライドしてくる要素で画面が横揺れするのを防ぎます
  <section id="ABOUT" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
    
    <div className="absolute inset-0 z-0"></div>

    {/* コンテンツ全体をラップし、ここでスクロール検知を行う */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // 画面に20%入ったら発火
      className="relative z-10"
    >
      <motion.h2 
        variants={headingVariants}
        className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-wider"
      >
        ABOUT <span className="text-cyan-400">ME</span>
      </motion.h2>
      
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* 画像エリア (左側 5カラム分) */}
        <motion.div variants={imageVariants} className="md:col-span-5 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-slate-700 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <motion.img 
              src={myPhoto}
              alt="Kazuhiro Unai" 
              className="w-full h-full object-cover" 
              whileHover={{ scale: 1.05 }} // ホバー時に画像を少し拡大
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
        
        {/* テキストエリア (右側 7カラム分) */}
        <motion.div variants={textVariants} className="md:col-span-7 space-y-6">
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl text-white font-semibold mb-4">Kazuhiro Unai</h3>
            <p className="text-slate-400 leading-relaxed">
              現在は神奈川県を拠点に、主にJavaを用いたバックエンド開発に携わるエンジニアとして活動しています。<br/>
              前職はパーソナルトレーナーという異色の経歴を持っていますが、「目標に向かって伴走し、継続的に改善を重ねる」というプロセスは、現在のシステム開発にも強く通じていると感じています。<br/>
              技術に対する好奇心が強く、バックエンドの知見にとどまらずフロントエンド領域も広げたいという思いから、本ポートフォリオは自己学習を兼ねてJavaScriptとReactを採用してゼロから構築しました。<br/>
              プライベートでは、二人の子どもたちと全力で遊ぶ時間が何よりの原動力です。2028年頃には自然豊かな石川県への移住を予定しており、家族との豊かな暮らしを大切にしながら、場所にとらわれず価値を提供できるエンジニアとしてさらに技術領域を広げていきたいと考えています。
            </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  </section>
);