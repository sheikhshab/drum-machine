"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MusicIcon } from "@/components/soundcloud-icons"
import { motion } from "framer-motion"

// Define drum sample paths (kept for context, though not used in this specific component anymore)
const DRUM_SAMPLES = {
  kick: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kick-greg-232043-VVII1ZZ0gUgeW41k2J2zCqVeY0pyFY.mp3",
  snare: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tr808-snare-drum-241403-kbGTAt8IFM5t4upOVHA8nLy1OFRbWC.mp3",
  hihat: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hihat-closing-98355-0oLeWr5zfDUhX926LTnkjdVdS9PTV2.mp3",
  openhat: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openhat-164697-S1PiwAxagOVQNisl9OCoAhWOO7slJo.mp3",
  clap: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tr808-clap-241405-cm8ERnegArUcVoQ8xF1NccYdhC58Gu.mp3",
}

// Define a simple demo drum pattern (kept for context)
const DEMO_PATTERN = {
  kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
  snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
  hihat: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  openhat: [false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, false],
  clap: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
}

const DEMO_BPM = 120 // BPM for the demo beat (kept for context)

export default function Hero() {
  // State and refs related to demo beat playback are no longer needed in this component
  // as the demo beat card has been moved to HeroContentSection.
  // Keeping them here for now as they are part of the original component structure,
  // but they are effectively unused in this version of Hero.tsx.
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize audio context (still needed if playSound is called, but it's not here)
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Play drum sound (still needed if called, but it's not here)
  const playSound = useCallback(async (drumType: keyof typeof DRUM_SAMPLES) => {
    if (!audioContextRef.current) return

    try {
      const audio = new Audio(DRUM_SAMPLES[drumType])
      audio.crossOrigin = "anonymous"
      audio.volume = 0.7
      await audio.play()
    } catch (error) {
      console.error(`Error playing ${drumType}:`, error)
    }
  }, [])

  // Sequencer logic for the demo beat (still needed if called, but it's not here)
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / DEMO_BPM / 4) * 1000

      intervalRef.current = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextStep = (prev + 1) % 16
          Object.keys(DRUM_SAMPLES).forEach((drum) => {
            if (DEMO_PATTERN[drum as keyof typeof DEMO_PATTERN][nextStep]) {
              playSound(drum as keyof typeof DRUM_SAMPLES)
            }
          })
          return nextStep
        })
      }, stepDuration)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setCurrentBeat(-1)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, playSound])

  // Framer Motion variants for Hero content
  const heroContentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (

    
    <section className="relative min-h-screen px-4 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 text-center max-w-6xl mx-auto pb-10 pt-60"
        variants={heroContentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
                <MusicIcon className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold tracking-wide">RHYTHM MACHINE PRO</span>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/journeymapchillorbit-yi9DORiL1bam0QOQkxCrKB0b/"
          frameBorder="0"
          width="100%"
          height="80%"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 text-center max-w-6xl mx-auto pb-10"
        variants={heroContentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.div variants={itemVariants}>
          <motion.h1
            className="text-4xl md:text-8xl font-bold text-foreground leading-tight mb-0"
            variants={itemVariants}
          >
            Create Professional
            <span className="relative inline-block animated-underline">
              <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
                {" "}
                Beats{" "}
              </span>
            </span>
            with AI
          </motion.h1>
        </motion.div>
      </motion.div>
    </section>
  )
}
