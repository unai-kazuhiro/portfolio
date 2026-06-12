export const Footer = () => {
    // 現在の年（2026年）を自動取得
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-slate-950 border-t border-slate-800/50 py-8 text-center text-slate-500 font-light text-[11px] tracking-widest">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* コピーライトのみの潔い構成 */}
          <p className="text-slate-500/60 select-none">
            &copy; {currentYear} Kazuhiro Unai. All rights reserved.
          </p>
          
        </div>
      </footer>
    );
  };