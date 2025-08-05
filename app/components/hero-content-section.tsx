"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { PlayIcon, PauseIcon, SparklesIcon } from "@/components/soundcloud-icons"
import Link from "next/link"
import { motion } from "framer-motion"

// Define drum sample paths
const DRUM_SAMPLES = {
  kick: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kick-greg-232043-VVII1ZZ0gUgeW41k2J2zCqVeY0pyFY.mp3",
  snare: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tr808-snare-drum-241403-kbGTAt8IFM5t4upOVHA8nLy1OFRbWC.mp3",
  hihat: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hihat-closing-98355-0oLeWr5zfDUhX926LTnkjdVdS9PTV2.mp3",
  openhat: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openhat-164697-S1PiwAxagOVQNisl9OCoAhWOO7slJo.mp3",
  clap: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tr808-clap-241405-cm8ERnegArUcVoQ8xF1NccYdhC58Gu.mp3",
}

// Define a simple demo drum pattern
const DEMO_PATTERN = {
  kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
  snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
  hihat: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  openhat: [false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, false],
  clap: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
}

const DEMO_BPM = 120 // BPM for the demo beat

export default function HeroContentSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)

  const audioContextRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Play drum sound
  const playSound = useCallback(async (drumType: keyof typeof DRUM_SAMPLES) => {
    if (!audioContextRef.current) return

    try {
      const audio = new Audio(DRUM_SAMPLES[drumType])
      audio.crossOrigin = "anonymous"
      audio.volume = 0.7 // Set a default volume for the demo
      await audio.play()
    } catch (error) {
      console.error(`Error playing ${drumType}:`, error)
    }
  }, [])

  // Sequencer logic for the demo beat
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / DEMO_BPM / 4) * 1000 // Calculate duration based on DEMO_BPM

      intervalRef.current = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextStep = (prev + 1) % 16

          // Trigger sounds based on the DEMO_PATTERN
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
      setCurrentBeat(-1) // Reset current beat visual when stopped
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, playSound]) // Depend on isPlaying and playSound

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const beatBarVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  return (
    <div className="max-w-6xl mx-auto text-center py-12">
      <motion.p
        className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        Transform your musical ideas into professional-quality beats using advanced AI. No experience required – just
        describe your vision and watch it come to life.
      </motion.p>

      {/* Beat Visualizer */}
      <motion.div className="mb-12" variants={itemVariants}>
        <div className="bg-card rounded-2xl p-8 border border-border max-w-2xl mx-auto shadow-lg">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-primary-foreground rounded-full w-16 h-16 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-1" />}
            </Button>
            <div className="text-foreground font-semibold">Demo Beat</div>
          </div>

          {/* Beat Grid Visualization */}
          <div className="grid grid-cols-16 gap-1 mb-4">
            {Array.from({ length: 16 }, (_, i) => (
              <motion.div
                key={i}
                className={`h-8 rounded transition-all duration-150 origin-bottom ring-offset-card ${
                  i === currentBeat && isPlaying
                    ? "bg-gradient-to-t from-gradient-start to-gradient-end shadow-lg shadow-primary/50 scale-110 ring-2 ring-primary ring-offset-2 animate-pulse"
                    : "bg-secondary border border-border" // Changed for better visibility
                }`}
                variants={beatBarVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }} // Staggered reveal for beat bars
              />
            ))}
          </div>

          <div className="text-muted-foreground text-sm">
            {isPlaying ? `🎵 Playing: Demo Beat - ${DEMO_BPM} BPM` : "Click play to hear AI-generated beat"}
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" variants={itemVariants}>
        <Link href="/signup">
          <Button className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-primary-foreground px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
            <SparklesIcon className="w-5 h-5 mr-2" />
            Start Creating Free
          </Button>
        </Link>
        <Link href="/demo">
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-secondary/10 px-8 py-4 text-lg rounded-full bg-secondary/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Try Demo
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
