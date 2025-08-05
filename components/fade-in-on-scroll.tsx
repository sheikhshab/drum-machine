"use client"

import React from "react"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInOnScrollProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number // Initial delay for the whole component
  id?: string
  staggerChildren?: boolean // New prop for staggering children
  staggerDelay?: number // New prop for stagger delay between children
}

export default function FadeInOnScroll({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  id,
  staggerChildren = false,
  staggerDelay = 100,
}: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
            observer.unobserve(entry.target) // Unobserve after animation
          }
        })
      },
      { threshold },
    )

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, delay])

  const animatedChildren = React.Children.map(children, (child, index) => {
    if (staggerChildren && React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        className: cn(
          (child as React.ReactElement).props.className,
          "transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-40 scale-90", // More dramatic initial state
        ),
        style: {
          ...((child as React.ReactElement).props.style || {}),
          transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
        },
      })
    }
    return child
  })

  return (
    <div
      id={id}
      className={cn(
        // Apply animation classes to the container itself only if not staggering children
        !staggerChildren && "transition-all duration-700 ease-out",
        !staggerChildren && (isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-40 scale-90"), // More dramatic initial state
        className,
      )}
      ref={domRef}
    >
      {staggerChildren ? animatedChildren : children}
    </div>
  )
}
