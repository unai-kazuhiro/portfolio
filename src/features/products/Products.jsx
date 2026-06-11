import { motion } from "motion/react";

import { containerVariants, headingVariants, imageVariants, textVariants } from "../../components/elements/Variants";

export const Products = () => (
    <section id="PRODUCTS" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // 画面に20%入ったら発火
        className="relative z-10"
      >

        <motion.h2 variants={headingVariants} className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-wider">
          FEATURED <span className="text-cyan-400">PROJECTS</span>
        </motion.h2>
        
        {/* スマホ1列、PC3列のグリッド。要素間の隙間は広めの gap-8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* プロジェクトカードの例 */}
          <motion.div variants={headingVariants} className="group rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
            {/* サムネイルエリア (アスペクト比固定 16:9 相当) */}
            <div className="w-full h-48 bg-slate-800 relative overflow-hidden">
              <img src="/project1.jpg" alt="Project 1" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* テキスト・タグエリア */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Quantum Analytics Platform</h3>
              <p className="text-sm text-slate-400 mb-6 line-clamp-3">
                リアルタイムのデータ解析と可視化を行うダッシュボードアプリケーションです。
              </p>
              {/* タグリスト（横並び、折り返し flex-wrap、隙間 gap-2） */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full">React</span>
                <span className="px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full">Node.js</span>
              </div>
            </div>
          </motion.div>
          
          {/* 他のプロジェクトカードが続く... */}
        </div>
      </motion.div>
    </section>
  );