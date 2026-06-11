import { motion } from "motion/react";

// 1. スキルデータを配列で定義（ここで追加・修正が簡単にできます）
const skillCategories = [
  {
    id: 1,
    title: "LANGUAGES",
    skills: [
      { name: "Java", icon: "Java", color: "text-orange-500" },
      { name: "JavaScript", icon: "JS", color: "text-yellow-400" },
      { name: "TypeScript", icon: "TS", color: "text-blue-400" },
      { name: "ABAP", icon: "SAP", color: "text-red-400" },
    ],
  },
  {
    id: 2,
    title: "FRAMEWORKS",
    skills: [
      { name: "Spring Boot", icon: "Java", color: "text-orange-500" },
      { name: "Next.js", icon: "JS", color: "text-yellow-400" },
      { name: "UI5", icon: "SAP", color: "text-red-400" },
    ],
  },
  {
    id: 3,
    title: "DATABASE & CLOUD",
    skills: [
      { name: "PostgreSQL", icon: "DB", color: "text-blue-300" },
      { name: "Microsoft SQL Server", icon: "DB", color: "text-blue-300" },
      { name: "Oracle Database", icon: "DB", color: "text-blue-300" },
      { name: "Azure", icon: "CLOUD", color: "text-blue-500" },
    ],
  },
  {
    id: 4,
    title: "TOOLS",
    skills: [
      { name: "GitHub", icon: "Git", color: "text-red-500" },
      { name: "SAP", icon: "SAP", color: "text-red-400" },
      { name: "SQL Server Management Studio", icon: "MS", color: "text-blue-500" },
      { name: "SQLDeveloper", icon: "ORCL", color: "text-blue-500" },
      { name: "A5:SQL Mk-2", icon: "A5M2", color: "text-blue-500" },
      { name: "Jenkins", icon: "CI/CD", color: "text-blue-500" },
      { name: "JP1", icon: "JP1", color: "text-blue-500" },
    ],
  },
];

// 2. ふわふわ動くアニメーションの定義
// custom(インデックス番号)を受け取り、カードごとに動きの速度やタイミングをずらします
const floatingVariants = {
  animate: (index) => ({
    // y軸とx軸に不規則な動きを持たせる
    y: [0, -15, 0, -5, 0],
    x: [0, 5, 0, -3, 0],
    transition: {
      duration: 6 + (index % 3) * 2, // 6秒、8秒、10秒とカードによって時間を変える
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.5, // 動き出しのタイミングもずらす
    },
  }),
};

export const Skills = () => (
  <section id="SKILLS" className="py-24 px-6 md:px-12 bg-slate-900/30">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-wider">
        MY <span className="text-cyan-400">SKILLS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 3. 配列をmap関数で展開 */}
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            custom={index} // variantsにインデックス番号を渡す
            variants={floatingVariants}
            animate="animate"
            // ふわふわしつつ、ホバー時は少し上に浮いて枠線が光る
            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }} 
            className="p-6 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-colors"
          >
            <h3 className="text-lg font-medium text-white mb-6 border-b border-slate-800 pb-2">
              {category.title}
            </h3>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-3">
                  <span
                    className={`w-14 h-8 flex items-center justify-center bg-slate-800 rounded text-xs font-bold ${skill.color}`}
                  >
                    {skill.icon}
                  </span>
                  <span className="text-slate-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  </section>
);