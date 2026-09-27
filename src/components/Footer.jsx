import React from 'react'

const WA_LINK = 'https://chat.whatsapp.com/IsmICIEcUpt3tDGXumGf2W'
const IG_LINK  = 'https://www.instagram.com/rvkidsmoda/'

export default function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-white/60">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Logo + endereço */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <img src="/img/logo_perfil.webp" alt="R&V Kids" className="h-9 w-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-extrabold text-white">R&V Kids Moda Infantil</p>
                <p className="text-xs text-white/40">Moda Center Santa Cruz · Setor Azul · Box 118</p>
              </div>
            </div>
          </div>

          {/* Links âncora */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#produtos"     className="hover:text-white transition-colors">Produtos</a>
            <a href="#como-comprar" className="hover:text-white transition-colors">Como Comprar</a>
            <a href="#localizacao"  className="hover:text-white transition-colors">Nossa Loja</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href={IG_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 hover:border-white/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.122 1.535 5.853L.057 23.995l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.358-.214-3.724.977.993-3.628-.234-.372A9.818 9.818 0 1112 21.818z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="divider mt-8 mb-5" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <p className="text-center text-xs text-white/25">
          © {new Date().getFullYear()} R&V Kids Moda Infantil · Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
