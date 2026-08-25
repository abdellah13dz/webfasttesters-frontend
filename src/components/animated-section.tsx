'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: string
}

export function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyNear =
      el.getBoundingClientRect().top < window.innerHeight + 160

    if (reduceMotion || alreadyNear) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '320px 0px 80px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-200 ease-out ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}
