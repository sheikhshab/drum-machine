"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MusicIcon, UserIcon, SettingsIcon, HelpCircleIcon } from "@/components/soundcloud-icons"
import { useState } from "react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulate login state

  return (
    <nav className="sticky top-6 z-50 bg-background/20 backdrop-blur-md py-4 px-8 transition-all duration-300 border border-primary shadow-xl shadow-primary/20 max-w-7xl mx-auto rounded-full">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
        >
          <MusicIcon className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">Rhythm Machine Pro</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/#home" className="text-foreground hover:text-primary font-medium transition-colors duration-200">
            Home
          </Link>
          <Link
            href="/#features"
            className="text-foreground hover:text-primary font-medium transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-foreground hover:text-primary font-medium transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link href="/#demo" className="text-foreground hover:text-primary font-medium transition-colors duration-200">
            Demo
          </Link>
          <Link
            href="/generator"
            className="text-foreground hover:text-primary font-medium transition-colors duration-200"
          >
            Generator
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <UserIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <SettingsIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <HelpCircleIcon className="w-5 h-5" />
              </Button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-primary-foreground px-4 py-2 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-foreground hover:bg-secondary transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-primary-foreground px-4 py-2 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
