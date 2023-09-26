import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { MotionType, LinkProps, RouterType } from '../types'
import { Network } from './network'
import { Viewport } from './viewport'

export const NavigateMotion = ({
  href,
  routing,
  className,
  children,
  exit,
  entry,
  scroll = true,
  prefetch = true
}: LinkProps & RouterType) => {
  const isOnline = Network()
  const { aRef, isVisible } = Viewport()
  const [isMotion, setIsMotion] = useState(false)

  const transformString = (m: MotionType) => {
    if (!m) return ''
    const transforms = [] as string[]
    const [x, y, z, a] = m?.rotate3d || []
    if (m.x !== undefined) transforms.push(`translateX(${m.x}px)`)
    if (m.y !== undefined) transforms.push(`translateY(${m.y}px)`)
    if (m.scale !== undefined) transforms.push(`scale(${m.scale})`)
    if (m.rotate !== undefined) transforms.push(`rotate(${m.rotate}deg)`)
    if (m.rotateX !== undefined) transforms.push(`rotateX(${m.rotateX}deg)`)
    if (m.rotateY !== undefined) transforms.push(`rotateY(${m.rotateY}deg)`)
    if (m.rotate3d !== undefined)
      transforms.push(`rotate3d(${x}, ${y}, ${z}, ${a})`)

    return transforms.join(' ')
  }

  const easeString = (m: MotionType) => {
    const ease = m?.transition?.ease
    if (!ease) return ''
    if (typeof ease === 'string') return ease
    return `cubic-bezier(${ease})`
  }

  const runPrefetch = useCallback(() => {
    if ('prefetch' in routing) {
      routing.prefetch(href)
    } else if (typeof routing === 'function') {
      fetch(href)
    }
  }, [routing, href])

  const runTransition = useCallback(() => {
    if ('push' in routing) {
      routing.push(href)
    } else if (typeof routing === 'function') {
      routing(href)
    }
  }, [href, routing])

  const isPathname =
    typeof window !== 'undefined' &&
    typeof window.location.pathname === 'string'
  const initialPathname = (isPathname && window.location.pathname) as string
  const [pathname, setPathname] = useState(initialPathname)
  useLayoutEffect(() => {
    setPathname(window.location.pathname)
    if (!isMotion) return
    const dom = document.body as HTMLBodyElement
    const exitEase = easeString(exit)
    const entryEase = easeString(entry)
    const exitTime = exit?.transition?.duration
    const entryTime = entry?.transition?.duration

    const motion = (
      m: MotionType,
      time: number | undefined,
      ease: string | undefined
    ) => {
      const transformStyle = transformString(m)
      if (!m) return
      if (m.opacity !== undefined) dom.style.opacity = String(m.opacity)
      if (m.blur !== undefined) dom.style.filter = `blur(${m.blur}px)`
      if (transformStyle !== '') dom.style.transform = transformStyle
      dom.style.transition = ease ? `all ${time}s ${ease}` : `all ${time}s`
    }
    const motionInitialize = (m: MotionType) => {
      const transformStyle = transformString(m)
      if (!m) return
      if (m?.opacity !== undefined) dom.style.opacity = String(m.opacity)
      if (m?.blur !== undefined) dom.style.filter = `blur(${m.blur}px)`
      if (transformStyle !== '') dom.style.transform = transformStyle
      dom.style.transition = 'all 0s'
    }

    const init = {
      opacity: 1,
      blur: 0,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      rotate3d: [0, 0, 1, '0deg']
    } as MotionType

    motion(exit, exitTime, exitEase)
    const timerId = setTimeout(() => {
      // pass the entry style.
      motionInitialize(entry)
      const lastMotion = () => {
        entry && motion(init, entryTime, entryEase) // if entry defined.
        scroll && window.scrollTo(0, 0)
        runTransition()
        setIsMotion(false)
      }
      requestAnimationFrame(lastMotion)
    }, (exitTime as number) * 1000)

    const hasNotEntry = () => {
      motionInitialize(init)
    }
    return () => {
      clearTimeout(timerId)
      !entry && requestAnimationFrame(hasNotEntry) // if entry undefined.
    }
  }, [pathname, entry, exit, href, isMotion, routing, scroll, runTransition])

  useEffect(() => {
    if (isOnline && isVisible && prefetch) runPrefetch()
  }, [href, isOnline, isVisible, prefetch, routing, runPrefetch])

  const handleTransition = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    return pathname !== href && setIsMotion(true)
  }

  return (
    <a
      ref={aRef}
      href={href}
      className={className}
      onPointerDown={() => !prefetch && runPrefetch()}
      onClick={e => handleTransition(e)}
    >
      {children}
    </a>
  )
}
