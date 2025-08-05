import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// Navbar is now moved to app/page.tsx

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rhythm Machine Pro",
  description: "AI-Powered Beat Generation",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
font-family: ${inter.style.fontFamily};
--font-sans: ${inter.variable};
}
      `}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
