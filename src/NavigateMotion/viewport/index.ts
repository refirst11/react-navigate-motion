import { useEffect, useRef, useState } from 'react'

export function Viewport() {
  const [isVisible, setIsVisible] = useState(false)
  const aRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const isElementInViewport = (element: HTMLElement | null): boolean => {
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      )
    }
    const anchor = aRef.current as HTMLAnchorElement
    const initialVisibility = isElementInViewport(anchor)
    setIsVisible(initialVisibility)

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
