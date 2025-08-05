"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Square, RotateCcw } from "lucide-react"

interface DrumPattern {
  kick: boolean[]
  snare: boolean[]
  hihat: boolean[]
  openhat: boolean[]
  clap: boolean[]
  bpm: number
  description: string
}

const DRUM_SAMPLES = {
  kick: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kick-greg-232043-VVII1ZZ0gUgeW41k2J2zCqVeY0pyFY.mp3",
  snare: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tr808-snare-drum-241403-kbGTAt8IFM5t4upOVHA8nLy1OFRbWC.mp3",
  hihat: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hihat-closing-98355-0oLeWr5zfDUhX926LTnkjdVdS9PTV2.mp3",
  openhat: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openhat-164697-S1PiwAxagOVQNisl9OCoAhWOO7slJo.mp3",
  clap: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tr808-clap-241405-cm8ERnegArUcVoQ8xF1NccYdhC58Gu.mp3",
}

const PRESET_SUGGESTIONS = ["808 Cowbell", "Glitch", "Jazz Fusion", "Afrobeat", "Lo-Fi", "Stadium Rock", "Ambient"]

const GENRE_PRESETS = ["TECHNO", "HOUSE", "TRAP", "BREAKBEAT", "MINIMAL"]

export default function DrumMachine() {
  const [pattern, setPattern] = useState<DrumPattern>({
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hihat: Array(16).fill(false),
    openhat: Array(16).fill(false),
    clap: Array(16).fill(false),
    bpm: 120,
    description: "",
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

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
      audio.volume = 0.7
      await audio.play()
    } catch (error) {
      console.error(`Error playing ${drumType}:`, error)
    }
  }, [])

  // Sequencer logic
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / pattern.bpm / 4) * 1000

      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % 16

          Object.keys(DRUM_SAMPLES).forEach((drum) => {
            if (pattern[drum as keyof typeof DRUM_SAMPLES][nextStep]) {
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
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, pattern.bpm, pattern, playSound])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const stop = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const clear = () => {
    setPattern((prev) => ({
      ...prev,
      kick: Array(16).fill(false),
      snare: Array(16).fill(false),
      hihat: Array(16).fill(false),
      openhat: Array(16).fill(false),
      clap: Array(16).fill(false),
    }))
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const toggleStep = (drum: keyof DrumPattern, step: number) => {
    if (drum === "bpm" || drum === "description") return

    setPattern((prev) => ({
      ...prev,
      [drum]: prev[drum].map((active, index) => (index === step ? !active : active)),
    }))
  }

  const generateBeat = async (beatPrompt?: string) => {
    const promptToUse = beatPrompt || prompt
    if (!promptToUse.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-beat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToUse }),
      })

      if (response.ok) {
        const newPattern = await response.json()
        setPattern(newPattern)
        if (!beatPrompt) setPrompt("")
      }
    } catch (error) {
      console.error("Error generating beat:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const drumLabels = {
    kick: "KICK",
    snare: "SNARE",
    hihat: "HIHAT",
    openhat: "OPENHAT",
    clap: "CLAP",
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg border border-border p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">RHYTHM MACHINE</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wide">AI-POWERED • MODEL 002</p>
        </div>

        {/* AI Input */}
        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your beat (e.g., 'minimal techno', 'trap drums', 'vintage funk')"
              className="flex-1 border-input bg-secondary text-foreground placeholder-muted-foreground"
              onKeyDown={(e) => e.key === "Enter" && generateBeat()}
            />
            <Button
              onClick={() => generateBeat()}
              disabled={isGenerating || !prompt.trim()}
              className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/90 hover:to-gradient-end/90 text-primary-foreground px-6 shadow-md"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>

          {/* Preset Suggestions */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">TRY THESE:</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion}
                  onClick={() => generateBeat(suggestion)}
                  variant="outline"
                  size="sm"
                  className="text-xs border-border hover:bg-secondary text-secondary-foreground shadow-sm"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              onClick={togglePlay}
              className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/90 hover:to-gradient-end/90 text-primary-foreground shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="ml-2">{isPlaying ? "Pause" : "Play"}</span>
            </Button>
            <Button onClick={stop} variant="outline" className="border-border bg-secondary text-foreground shadow-md">
              <Square className="w-4 h-4" />
              <span className="ml-2">Stop</span>
            </Button>
            <Button onClick={clear} variant="outline" className="border-border bg-secondary text-foreground shadow-md">
              <RotateCcw className="w-4 h-4" />
              <span className="ml-2">Clear</span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">TEMPO</span>
            <div className="w-32">
              <Slider
                value={[pattern.bpm]}
                onValueChange={([value]) => setPattern((prev) => ({ ...prev, bpm: value }))}
                min={60}
                max={200}
                step={1}
                className="w-full"
              />
            </div>
            <span className="text-sm font-mono w-12 text-foreground">{pattern.bpm} BPM</span>
          </div>
        </div>

        {/* Sequencer Grid */}
        <div className="mb-8">
          {Object.entries(drumLabels).map(([drum, label]) => (
            <div key={drum} className="flex items-center mb-4">
              <div className="w-20 text-sm font-medium text-foreground uppercase tracking-wide">{label}</div>
              <div className="flex gap-1 flex-1">
                {pattern[drum as keyof typeof drumLabels].map((active, step) => (
                  <button
                    key={step}
                    onClick={() => toggleStep(drum as keyof DrumPattern, step)}
                    className={`w-8 h-8 border border-border rounded-sm transition-colors ${
                      active
                        ? "bg-gradient-to-r from-gradient-start to-gradient-end border-primary shadow-md"
                        : "bg-secondary hover:bg-muted"
                    } ${step === currentStep && isPlaying ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Genre Presets */}
        <div className="border-t border-border pt-6">
          <div className="flex gap-2">
            {GENRE_PRESETS.map((genre) => (
              <Button
                key={genre}
                onClick={() => generateBeat(genre.toLowerCase())}
                variant="outline"
                size="sm"
                className="text-xs border-border hover:bg-secondary text-secondary-foreground shadow-sm"
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
