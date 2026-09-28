/**
 * PasswordGate — Componente reutilizável de proteção por senha
 *
 * USO:
 *   import PasswordGate from './components/PasswordGate'
 *   <PasswordGate password="suasenha">
 *     <SeuConteudo />
 *   </PasswordGate>
 *
 * REMOVER: basta tirar o wrapper <PasswordGate> e deixar só o filho.
 *
 * PROPS:
 *   password  {string}  — senha exigida (obrigatório)
 *   children  {node}    — conteúdo protegido
 *   logo      {string}  — src de imagem opcional para exibir acima do título
 *   title     {string}  — título do modal (padrão: "Acesso Restrito")
 *   subtitle  {string}  — subtítulo/instrução (padrão: genérico)
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'pg_unlocked'
const SESSION_TTL = 3 * 60 * 1000 // 3 minutos em ms

export default function PasswordGate({
  password = 'Revkids2026',
  children,
  logo     = '/img/logo_perfil.webp',
  title    = 'Landing Page R&V Kids',
  subtitle = 'Entre em contato com a Criative Solutions para ter acesso ao material.',
}) {
  const [unlocked, setUnlocked] = useState(false)
  const [value,    setValue]    = useState('')
  const [error,    setError]    = useState(false)
  const [shake,    setShake]    = useState(false)
  const [show,     setShow]     = useState(false)
  const inputRef = useRef(null)

  /* Mantém desbloqueado por 3 minutos */
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      const { ts } = JSON.parse(stored)
      if (Date.now() - ts < SESSION_TTL) setUnlocked(true)
      else sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (!unlocked) setTimeout(() => inputRef.current?.focus(), 400)
  }, [unlocked])

  const attempt = () => {
    if (value === password) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }))
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setValue('')
      setTimeout(() => setShake(false), 600)
      setTimeout(() => { setError(false); inputRef.current?.focus() }, 1800)
    }
  }

  const onKey = (e) => { if (e.key === 'Enter') attempt() }

  if (unlocked) return <>{children}</>

  return (
    <AnimatePresence>
      <motion.div
        key="pg-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#070d1a',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', system-ui, sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* Grid de fundo */}
        <GridBg />

        {/* Ondas animadas */}
        <Waves />

        {/* Barco animado */}
        <BoatScene />

        {/* Card central */}
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'relative', zIndex: 10,
            background: '#0f1a2e',
            border: '1px solid #1e2d4a',
            borderRadius: 16,
            padding: '40px 36px 36px',
            width: '100%', maxWidth: 400,
            margin: '0 16px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Barco como avatar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(6,182,212,0.10)',
              border: '1px solid rgba(6,182,212,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="44" height="36" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="50" y1="4" x2="50" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M50 6 L50 50 L16 44 Z" fill="white" fillOpacity="0.9"/>
                <path d="M50 10 L50 46 L72 42 Z" fill="white" fillOpacity="0.6"/>
                <line x1="20" y1="18" x2="50" y2="12" stroke="white" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round"/>
                <path d="M12 56 Q50 68 88 56 L82 64 Q50 74 18 64 Z" fill="white" fillOpacity="0.95"/>
                <line x1="14" y1="56" x2="86" y2="56" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Ícone cadeado removido */}

          <h2 style={{
            margin: '0 0 8px', textAlign: 'center',
            color: '#e8edf5', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em',
          }}>
            {title}
          </h2>
          <p style={{
            margin: '0 0 28px', textAlign: 'center',
            color: '#7a8baa', fontSize: '0.875rem', lineHeight: 1.5,
          }}>
            {subtitle}
          </p>

          {/* Input wrapper com shake */}
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'relative', marginBottom: 12 }}
          >
            <input
              ref={inputRef}
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              onKeyDown={onKey}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '12px 44px 12px 16px',
                background: '#162038',
                border: `1px solid ${error ? '#ef4444' : '#1e2d4a'}`,
                borderRadius: 10,
                color: '#e8edf5',
                fontSize: '1rem',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                outline: 'none',
                transition: 'border-color 0.2s',
                letterSpacing: '0.1em',
              }}
            />
            {/* Botão mostrar/ocultar */}
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              tabIndex={-1}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#5a6b88', padding: 4, lineHeight: 1,
              }}
              aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {show ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </motion.div>

          {/* Mensagem de erro */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  color: '#ef4444', fontSize: '0.8rem',
                  margin: '0 0 12px', textAlign: 'center',
                }}
              >
                Senha incorreta. Tente novamente.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Botão entrar */}
          <motion.button
            type="button"
            onClick={attempt}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
              border: 'none', borderRadius: 10,
              color: '#001a20', fontWeight: 700, fontSize: '0.95rem',
              cursor: 'pointer', letterSpacing: '0.02em',
              boxShadow: '0 4px 20px rgba(6,182,212,0.35)',
              transition: 'box-shadow 0.2s',
              marginTop: error ? 0 : 0,
            }}
          >
            Entrar
          </motion.button>

          {/* Assinatura */}
          <p style={{
            marginTop: 24, textAlign: 'center',
            color: '#243554', fontSize: '0.72rem',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.05em',
          }}>
            criativesolutions.com.br
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Sub-componentes internos ─── */

function GridBg() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
    }} />
  )
}

function Waves() {
  const wavePath1 = [
    'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z',
    'M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L0,320Z',
    'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z',
  ].join(';')

  const wavePath2 = [
    'M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z',
    'M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,208C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L0,320Z',
    'M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z',
  ].join(';')

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1, height: '35%' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
        <path fill="#06b6d4" fillOpacity="0.18"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z">
          <animate attributeName="d" dur="10s" repeatCount="indefinite" values={wavePath1} />
        </path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
        <path fill="#06b6d4" fillOpacity="0.09"
          d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z">
          <animate attributeName="d" dur="8s" repeatCount="indefinite" values={wavePath2} />
        </path>
      </svg>
    </div>
  )
}

function BoatScene() {
  return (
    <div style={{
      position: 'absolute', bottom: '28%', left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2,
      animation: 'pgBoatFloat 4s ease-in-out infinite',
    }}>
      <style>{`
        @keyframes pgBoatFloat {
          0%,100% { transform: translateX(-50%) translateY(0px) rotate(-1deg); }
          50%      { transform: translateX(-50%) translateY(-10px) rotate(1deg); }
        }
      `}</style>
      <svg width="80" height="64" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Mastro */}
        <line x1="50" y1="4" x2="50" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        {/* Vela esquerda */}
        <path d="M50 6 L50 50 L16 44 Z" fill="white" fillOpacity="0.9"/>
        {/* Vela direita */}
        <path d="M50 10 L50 46 L72 42 Z" fill="white" fillOpacity="0.6"/>
        {/* Cabo/cordame */}
        <line x1="20" y1="18" x2="50" y2="12" stroke="white" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round"/>
        {/* Casco */}
        <path d="M12 56 Q50 68 88 56 L82 64 Q50 74 18 64 Z" fill="white" fillOpacity="0.95"/>
        {/* Linha d'água */}
        <line x1="14" y1="56" x2="86" y2="56" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function LockIcon({ color = 'currentColor', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function EyeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}
