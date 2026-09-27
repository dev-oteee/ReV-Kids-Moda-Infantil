import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../animations'
import { img } from '../assets'

const WA_LINK = 'https://chat.whatsapp.com/IsmICIEcUpt3tDGXumGf2W'

const WaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.122 1.535 5.853L.057 23.995l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.358-.214-3.724.977.993-3.628-.234-.372A9.818 9.818 0 1112 21.818z"/>
  </svg>
)

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[88svh] md:min-h-screen">

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={img('bannermobile.webp')} type="image/webp" />
          <source media="(min-width: 768px)"  srcSet={img('banner.webp')}       type="image/webp" />
          <img
            src={img('banner.webp')}
            alt="R&V Kids Moda Infantil"
            className="h-full w-full object-cover object-[center_30%]"
            fetchpriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[88svh] md:min-h-screen max-w-6xl flex-col justify-center px-6 pb-14 pt-24 md:px-8 md:pb-20">
        <motion.div
          className="w-full max-w-md"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="mb-3 text-sm font-extrabold text-[#7BC62D]" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
            Dia das Crianças é na R&V Kids! 🎉
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-display text-2xl font-black leading-[1.1] tracking-tight text-white sm:text-[2.4rem] md:text-6xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            Moda infantil direto{' '}
            <span className="text-[#7BC62D]">de quem fabrica</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-4 text-base leading-relaxed text-white/85 md:text-lg"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
          >
            Do 2 ao 16 anos. Atacado e varejo, com lançamentos sazonais
            e envio para todo o Brasil.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WaIcon /> Fale conosco!
            </a>
            <a
              href="#produtos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/25 transition-all"
            >
              Ver produtos
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
