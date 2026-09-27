import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../animations'

const WA_LINK = 'https://chat.whatsapp.com/IsmICIEcUpt3tDGXumGf2W'

const produtos = [
  { img: '/img/post_04_92likes.webp', nome: 'Bermuda Cargo Bolso Frontal', sizes: '2 ao 16 anos' },
  { img: '/img/post_01_89likes.webp', nome: 'Bermuda Mauricinho Brim',     sizes: '2 ao 16 anos' },
  { img: '/img/post_02_71likes.webp', nome: 'Calça Cargo',                 sizes: '2 ao 16 anos' },
  { img: '/img/post_03_67likes.webp', nome: 'Bermuda Cargo com Zíper',     sizes: '2 ao 16 anos' },
  { img: '/img/post_05_54likes.webp', nome: 'Bermuda Brim Infantil',       sizes: '2 ao 14 anos' },
  { img: '/img/post_09_33likes.webp', nome: 'Bermuda Brim',                sizes: '2 ao 16 anos' },
  { img: '/img/post_06_38likes.webp', nome: 'Calça Cargo Brim',            sizes: '2 ao 16 anos' },
  { img: '/img/post_13_24likes.webp', nome: 'Bermuda Jogger',              sizes: '2 ao 16 anos' },
]

export default function Produtos() {
  return (
    <section id="produtos" className="py-16 md:py-24 bg-[#f8faff] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10"
        >
          <motion.span variants={staggerItem} className="section-label">
            Produtos
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl font-black leading-tight text-[#1a1f2e] md:text-4xl"
          >
            Os mais pedidos pelos clientes
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-2 text-base text-[#4a5568] max-w-lg">
            Ordenados por engajamento real no Instagram da loja.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {produtos.map((p) => (
            <motion.div key={p.nome} variants={staggerItem} className="product-card group">

              <div className="relative aspect-[3/4] overflow-hidden bg-[#eef3fc]">
                <img
                  src={p.img}
                  alt={p.nome}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              <div className="p-3.5">
                <p className="text-sm font-bold text-[#1a1f2e] leading-snug line-clamp-2">{p.nome}</p>
                <p className="text-xs text-[#4a5568] mt-1">{p.sizes}</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 flex items-center justify-center gap-1.5 w-full rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] text-xs font-bold py-2 hover:bg-[#dcfce7] transition-colors"
                >
                  Pedir no WhatsApp
                </a>
              </div>

            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3 text-center"
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm text-[#4a5568]">Quer ver todo o catálogo com preços?</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.122 1.535 5.853L.057 23.995l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.358-.214-3.724.977.993-3.628-.234-.372A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Ver catálogo completo no grupo
          </a>
        </motion.div>

      </div>
    </section>
  )
}
