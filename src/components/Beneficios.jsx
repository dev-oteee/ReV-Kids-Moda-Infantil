import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../animations'

const itens = [
  { icon: '📦', titulo: 'Correios, transportadora ou excursão', sub: 'Envio para todo o Brasil' },
  { icon: '📏', titulo: 'Tamanhos 2 ao 16 anos',               sub: 'Grade completa sempre disponível' },
  { icon: '🏭', titulo: 'Direto da fábrica',                   sub: 'Atacado e varejo' },
  { icon: '💬', titulo: 'Atendimento no WhatsApp',             sub: 'Resposta rápida e direta' },
]

export default function Beneficios() {
  return (
    <section className="bg-white border-y border-[#e8eef8] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {itens.map((item, i) => (
            <motion.div
              key={item.titulo}
              variants={staggerItem}
              className={`flex items-start gap-3 py-5 px-4 md:px-5
                ${i % 2 === 0 ? '' : 'border-l border-[#e8eef8]'}
                ${i < 2 ? 'border-b md:border-b-0' : ''}
                ${i > 0 && i % 2 !== 0 ? '' : ''}
                md:border-l md:first:border-l-0
              `}
            >
              <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1a1f2e] leading-snug">{item.titulo}</p>
                <p className="text-xs text-[#4a5568] mt-0.5">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
