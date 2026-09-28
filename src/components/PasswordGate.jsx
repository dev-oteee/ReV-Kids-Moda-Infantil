/**
 * PasswordGate — Componente reutilizável de proteção por senha
 *
 * USO:
 *   import PasswordGate from './components/PasswordGate'
 *   <PasswordGate>
 *     <SeuConteudo />
 *   </PasswordGate>
 *
 * REMOVER: apague o <PasswordGate> e </PasswordGate> no App.jsx.
 *
 * CONFIGURAR: edite os defaults abaixo (password, title, subtitle, logo).
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'pg_unlocked'
const SESSION_TTL = 3 * 60 * 1000 // 3 minutos

const CSS = `
  .pg-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #070d1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', system-ui, sans-serif;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
  }

  .pg-grid {
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image:
      linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }

  .pg-waves {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 1;
    height: 32%;
    pointer-events: none;
  }
  .pg-waves svg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .pg-boat {
    position: absolute;
    bottom: 30%;
    left: 50%;
    z-index: 2;
    pointer-events: none;
    animation: pgFloat 4s ease-in-out infinite;
  }
  @keyframes pgFloat {
    0%,100% { transform: translateX(-50%) translateY(0px)   rotate(-1deg); }
    50%      { transform: translateX(-50%) translateY(-10px) rotate(1deg);  }
  }

  /* Card */
  .pg-card {
    position: relative;
    z-index: 10;
    background: #0f1a2e;
    border: 1px solid #1e2d4a;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.6);
    padding: 32px 20px 28px;
    box-sizing: border-box;
  }
  @media (min-width: 480px) {
    .pg-card { padding: 40px 36px 36px; }
  }

  .pg-avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
  }
  .pg-avatar-circle {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: rgba(6,182,212,0.10);
    border: 1px solid rgba(6,182,212,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pg-title {
    margin: 0 0 8px;
    text-align: center;
    color: #e8edf5;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  @media (min-width: 480px) {
    .pg-title { font-size: 1.25rem; }
  }

  .pg-subtitle {
    margin: 0 0 24px;
    text-align: center;
    color: #7a8baa;
    font-size: 0.8rem;
    line-height: 1.55;
  }
  @media (min-width: 480px) {
    .pg-subtitle { font-size: 0.875rem; margin-bottom: 28px; }
  }

  .pg-input-wrap {
    position: relative;
    margin-bottom: 12px;
  }
  .pg-input {
    width: 100%;
    box-sizing: border-box;
    padding: 13px 44px 13px 16px;
    background: #162038;
    border: 1px solid #1e2d4a;
    border-radius: 10px;
    color: #e8edf5;
    font-size: 1rem;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    letter-spacing: 0.1em;
    -webkit-appearance: none;
  }
  .pg-input:focus {
    border-color: rgba(6,182,212,0.5);
    box-shadow: 0 0 0 3px rgba(6,182,212,0.1);
  }
  .pg-input.error { border-color: #ef4444; }

  .pg-eye {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #5a6b88;
    padding: 6px;
    line-height: 1;
    display: flex;
    align-items: center;
    -webkit-tap-highlight-color: transparent;
  }

  .pg-error-msg {
    color: #ef4444;
    font-size: 0.8rem;
    text-align: center;
    margin: 0 0 10px;
  }

  .pg-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #06b6d4, #0ea5e9);
    border: none;
    border-radius: 10px;
    color: #001a20;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 20px rgba(6,182,212,0.35);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .pg-footer {
    margin-top: 20px;
    text-align: center;
    color: #243554;
    font-size: 0.68rem;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.05em;
  }
`

export default function PasswordGate({
  password = 'Revkids2026',
  children,
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
      try {
        const { ts } = JSON.parse(stored)
        if (Date.now() - ts < SESSION_TTL) setUnlocked(true)
        else sessionStorage.removeItem(STORAGE_KEY)
      } catch { sessionStorage.removeItem(STORAGE_KEY) }
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
    <AnimatePresence>
      <motion.div
        key="pg-overlay"
        className="pg-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <style>{CSS}</style>

        <div className="pg-grid" />

        {/* Ondas */}
        <div className="pg-waves">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#06b6d4" fillOpacity="0.18"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values={wavePath1} />
            </path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#06b6d4" fillOpacity="0.09"
              d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" values={wavePath2} />
            </path>
          </svg>
        </div>

        {/* Barco flutuante */}
        <div className="pg-boat">
          <svg width="72" height="58" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="50" y1="4" x2="50" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 6 L50 50 L16 44 Z" fill="white" fillOpacity="0.9"/>
            <path d="M50 10 L50 46 L72 42 Z" fill="white" fillOpacity="0.6"/>
            <line x1="20" y1="18" x2="50" y2="12" stroke="white" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round"/>
            <path d="M12 56 Q50 68 88 56 L82 64 Q50 74 18 64 Z" fill="white" fillOpacity="0.95"/>
            <line x1="14" y1="56" x2="86" y2="56" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Card */}
        <motion.div
          className="pg-card"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
        >
          {/* Avatar barco */}
          <div className="pg-avatar">
            <div className="pg-avatar-circle">
              <svg width="38" height="30" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="50" y1="4" x2="50" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M50 6 L50 50 L16 44 Z" fill="white" fillOpacity="0.9"/>
                <path d="M50 10 L50 46 L72 42 Z" fill="white" fillOpacity="0.6"/>
                <line x1="20" y1="18" x2="50" y2="12" stroke="white" strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round"/>
                <path d="M12 56 Q50 68 88 56 L82 64 Q50 74 18 64 Z" fill="white" fillOpacity="0.95"/>
                <line x1="14" y1="56" x2="86" y2="56" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <h2 className="pg-title">{title}</h2>
          <p className="pg-subtitle">{subtitle}</p>

          {/* Input com shake */}
          <motion.div
            className="pg-input-wrap"
            animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              ref={inputRef}
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              onKeyDown={onKey}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`pg-input${error ? ' error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              tabIndex={-1}
              className="pg-eye"
              aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {show ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="pg-error-msg"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Senha incorreta. Tente novamente.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            className="pg-btn"
            onClick={attempt}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Entrar
          </motion.button>

          <p className="pg-footer">criativesolutions.com.br</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Ícones ─── */
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}
