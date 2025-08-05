import type React from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export default function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-24 px-4", className)}>
      {children}
    </section>
  )
}
