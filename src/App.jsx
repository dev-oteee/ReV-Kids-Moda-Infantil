import React, { useState } from 'react'
import PasswordGate  from './components/PasswordGate'
import VideoIntro    from './components/VideoIntro'
import Header        from './components/Header'
import Hero          from './components/Hero'
import Beneficios    from './components/Beneficios'
import Produtos      from './components/Produtos'
import ComoComprar   from './components/ComoComprar'
import CtaFinal      from './components/CtaFinal'
import Footer        from './components/Footer'

export default function App() {
  const [introVisible, setIntroVisible] = useState(true)

  return (
    /* Para remover a proteção por senha, basta apagar o <PasswordGate> e </PasswordGate> */
    <PasswordGate>
      {introVisible && (
        <VideoIntro onFinish={() => setIntroVisible(false)} />
      )}

      <div className="min-h-screen bg-[#f8faff] text-[#1a1f2e] overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Beneficios />
          <Produtos />
          <ComoComprar />
          <CtaFinal />
        </main>
        <Footer />
      </div>
    </PasswordGate>
  )
}
