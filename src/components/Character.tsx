import React, { useEffect, useState } from 'react'

const Character: React.FC = () => {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const [lookAway, setLookAway] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target && target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'password') {
        setLookAway(true)
      }
    }

    const onFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target && target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'password') {
        setLookAway(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('focusin', onFocusIn)
    window.addEventListener('focusout', onFocusOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  // compute eye direction relative to character center
  const center = { x: 80, y: 80 }
  const dx = pos.x - center.x
  const dy = pos.y - center.y
  const angle = Math.atan2(dy, dx)
  const eyeOffsetX = Math.cos(angle) * (lookAway ? -6 : 6)
  const eyeOffsetY = Math.sin(angle) * (lookAway ? -2 : 2)

  const style: React.CSSProperties = {
    position: 'fixed',
    left: pos.x - 80,
    top: pos.y - 80,
    width: 160,
    height: 160,
    pointerEvents: 'none',
    zIndex: 2000,
    transition: 'transform 60ms linear'
  }

  return (
    <div style={style} aria-hidden>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12"/>
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <circle cx="80" cy="80" r="64" fill="#FFD78A" />
          <circle cx="80" cy="80" r="64" fillOpacity="0.04" />
        </g>

        {/* eyes */}
        <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
          <circle cx="60" cy="70" r="8" fill="#fff" />
          <circle cx="100" cy="70" r="8" fill="#fff" />
          <circle cx="60" cy="70" r="4" fill="#333" />
          <circle cx="100" cy="70" r="4" fill="#333" />
        </g>

        {/* mouth */}
        <path d="M56 100 Q80 118 104 100" stroke="#c65" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default Character
