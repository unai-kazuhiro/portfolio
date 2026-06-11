import { MainBackground } from './components/mainBackground/MainBackground';
import { ScrollIndicator } from './components/elements/ScrollIndicator';
import { Header } from './components/layout/Header';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
// import { Products } from './features/products/Products';
import { Contact } from './features/contact/Contact';
import './App.css'

function App() {
  return (
    // 全体のラッパー（App.js等）
    <div className="min-h-screen {/*bg-slate-950/*} bg-transparent text-slate-300 font-sans selection:bg-cyan-500/30">
      <MainBackground />
      <ScrollIndicator />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        {/* <Products /> */}
        <Contact />
      </main>
    </div>
  )
}

export default App;