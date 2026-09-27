import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../animations'

const WA_LINK = 'https://chat.whatsapp.com/IsmICIEcUpt3tDGXumGf2W'

export default function CtaFinal() {
  return (
    <section className="py-20 md:py-28 bg-[#2B4EAA] overflow-hidden">
      <motion.div
        className="mx-auto max-w-2xl px-5 text-center md:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={staggerItem}
          className="font-display text-3xl font-black leading-tight text-white md:text-5xl"
        >
          Entre no grupo e veja{' '}
          <span className="text-[#7BC62D]">tudo com preço</span>
        </motion.h2>

        <motion.p variants={staggerItem} className="mt-4 text-base text-white/75 leading-relaxed">
          Mais de 3.800 pessoas já acompanham as novidades da R&V Kids.
          Acesse o grupo, veja o catálogo completo e faça seu pedido direto.
        </motion.p>

        <motion.ul variants={staggerItem} className="mt-8 inline-flex flex-col gap-2.5 text-left">
          {[
            'Bermudas e calças do tamanho 2 ao 16 anos',
            'Enviamos por Correios, transportadora e excursão',
            'Atendimento direto no WhatsApp',
            'Loja física no Moda Center Santa Cruz · Box 118',
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7BC62D]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-white/85">{item}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={staggerItem} className="mt-10">
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="btn-whatsapp min-h-[56px] px-6 sm:px-10 text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.122 1.535 5.853L.057 23.995l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.358-.214-3.724.977.993-3.628-.234-.372A9.818 9.818 0 1112 21.818z"/>
            </svg>
            ENTRAR NO GRUPO AGORA
          </motion.a>
          <p className="mt-3 text-xs text-white/40">Gratuito · Saia quando quiser</p>
        </motion.div>

      </motion.div>
    </section>
  )
}
