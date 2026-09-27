import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../animations'

const WA_LINK = 'https://chat.whatsapp.com/IsmICIEcUpt3tDGXumGf2W'

const passos = [
  { num: '1', titulo: 'Entre no grupo', desc: 'Acesse gratuitamente o grupo no WhatsApp clicando no botão desta página.' },
  { num: '2', titulo: 'Acompanhe o catálogo', desc: 'No grupo você recebe os lançamentos, fotos das peças e valores em primeira mão.' },
  { num: '3', titulo: 'Faça seu pedido', desc: 'Escolheu? É só mandar mensagem com a peça e o tamanho. A gente cuida do resto.' },
  { num: '4', titulo: 'Receba em qualquer lugar', desc: 'Enviamos para todo o Brasil por Correios, transportadora ou excursão.' },
]

export default function ComoComprar() {
  return (
    <section id="como-comprar" className="py-16 md:py-24 bg-[#eef3fc] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10"
        >
          <motion.span variants={staggerItem} className="section-label">
            Como comprar
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl font-black leading-tight text-[#1a1f2e] md:text-4xl"
          >
            4 passos simples
          </motion.h2>
        </motion.div>

        {/* Passos */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {passos.map((p) => (
            <motion.div key={p.num} variants={staggerItem} className="benefit-card">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3C6FD4] text-white font-black text-base mb-4">
                {p.num}
              </div>
              <h3 className="font-bold text-[#1a1f2e] text-base mb-1.5">{p.titulo}</h3>
              <p className="text-sm text-[#4a5568] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Endereço + WhatsApp */}
        <motion.div
          id="localizacao"
          className="mt-8 grid gap-4 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Endereço */}
          <motion.div variants={staggerItem} className="benefit-card flex flex-col gap-4">
            <span className="section-label mb-0">Nossa loja</span>
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">📍</span>
              <div>
                <p className="font-extrabold text-[#1a1f2e] text-lg leading-snug">Moda Center Santa Cruz</p>
                <p className="text-[#3C6FD4] font-semibold text-sm mt-0.5">Setor Azul · Rua I · Box 118</p>
                <p className="text-xs text-[#4a5568] mt-1">Santa Cruz do Capibaribe — PE</p>
              </div>
            </div>
            <div className="divider" />
            <div className="flex flex-wrap gap-2">
              {['🏤 Correios', '🚛 Transportadora', '🚌 Excursão', '🏪 Retirada na loja'].map((e) => (
                <span key={e} className="text-xs font-semibold bg-[#eef3fc] border border-[#e8eef8] rounded-lg px-3 py-1.5 text-[#4a5568]">
                  {e}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA WhatsApp */}
          <motion.div
            variants={staggerItem}
            className="benefit-card flex flex-col justify-between border-[#bbf7d0] bg-[#f0fdf4]"
          >
            <div>
              <span className="section-label mb-2" style={{ color: '#15803d' }}>Compra online</span>
              <p className="font-extrabold text-[#1a1f2e] text-xl leading-snug">
                Prefere comprar sem sair de casa?
              </p>
              <p className="mt-2 text-sm text-[#4a5568]">
                Entre no grupo e receba lançamentos e novidades em primeira mão.
              </p>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 btn-whatsapp w-full justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.122 1.535 5.853L.057 23.995l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.358-.214-3.724.977.993-3.628-.234-.372A9.818 9.818 0 1112 21.818z"/>
              </svg>
              Entrar no Grupo
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
