import React, { useState, useEffect } from 'react'

const WA_LINK = 'https://chat.whatsapp.com/IsmICIEcUpt3tDGXumGf2W'

const WaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.122 1.535 5.853L.057 23.995l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.358-.214-3.724.977.993-3.628-.234-.372A9.818 9.818 0 1112 21.818z"/>
  </svg>
)

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Produtos',     href: '#produtos' },
    { label: 'Como Comprar', href: '#como-comprar' },
    { label: 'Nossa Loja',   href: '#localizacao' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8eef8]' : 'bg-white border-b border-[#e8eef8]'
    }`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">

        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/img/logo_perfil.webp"
            alt="R&V Kids Moda Infantil"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[#e8eef8]"
          />
          <div className="leading-tight">
            <span className="block text-sm font-extrabold text-[#1a1f2e]">R&V Kids</span>
            <span className="block text-xs text-[#3C6FD4] font-semibold">Moda Infantil</span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-semibold text-[#4a5568] hover:text-[#3C6FD4] transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_4px_14px_-4px_rgba(37,211,102,0.5)] hover:bg-[#1fba58] transition-all"
        >
          <WaIcon /> Entrar no Grupo
        </a>

        {/* Hamburguer */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="md:hidden p-2"
        >
          <span className={`block h-0.5 w-6 bg-[#1a1f2e] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#1a1f2e] transition-all duration-300 my-[5px] ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#1a1f2e] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e8eef8] bg-white px-5 pb-5 pt-3">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base font-semibold text-[#4a5568] border-b border-[#e8eef8] hover:text-[#3C6FD4]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 btn-whatsapp w-full justify-center"
          >
            <WaIcon /> Entrar no Grupo do WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
