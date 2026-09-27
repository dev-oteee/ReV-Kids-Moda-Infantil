import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoIntro({ onFinish }) {
  const videoRef = useRef(null)
  const [phase, setPhase] = useState('splash') // 'splash' | 'playing' | 'done'

  const startVideo = () => {
    setPhase('playing')
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.play().catch(() => {
      v.muted = true
      v.play().catch(() => finish())
    })
  }

  const finish = () => {
    setPhase('done')
    setTimeout(onFinish, 700)
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Vídeo — contain para não cortar, centralizado */}
          <video
            ref={videoRef}
            src="/img/manifestodia12.mp4"
            className={`w-full max-h-screen object-contain transition-opacity duration-500 ${
              phase === 'playing' ? 'opacity-100' : 'opacity-0'
            }`}
            playsInline
            onEnded={finish}
          />

          {/* Tela splash */}
          <AnimatePresence>
            {phase === 'splash' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="/img/logo_perfil.webp"
                  alt="R&V Kids"
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-white/20"
                />
                <div className="text-center">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-[0.25em] mb-2">12 de Outubro</p>
                  <p className="text-white text-lg font-extrabold">R&V Kids Moda Infantil</p>
                </div>
                <motion.button
                  onClick={startVideo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-[#25D366] text-white font-extrabold px-8 py-4 rounded-full text-base shadow-[0_8px_28px_-6px_rgba(37,211,102,0.6)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Ver o manifesto
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão pular */}
          {phase === 'playing' && (
            <button
              onClick={finish}
              className="absolute bottom-6 right-6 text-xs font-bold text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase"
            >
              Pular →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
