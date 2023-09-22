import { useEffect, useRef, useState } from 'react'

export function Viewport() {
  const [isVisible, setIsVisible] = useState(false)
  const aRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const anchor = aRef.current as HTMLAnchorElement
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin: '200px'
      }
    )

    if (anchor) {
      observer.observe(anchor)
    }

    return () => {
      if (anchor) {
        observer.unobserve(anchor)
      }
    }
  }, [])
  return { aRef, isVisible }
}
