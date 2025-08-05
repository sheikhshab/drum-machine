"use client"

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import {
  PlayIcon,
  PauseIcon,
  SquareIcon,
  DownloadIcon,
  SaveIcon,
  ShareIcon,
  SparklesIcon,
  Volume2Icon,
  RotateCcwIcon,
  MusicIcon,
  HeadphonesIcon,
  DrumIcon,
  GuitarIcon,
  MicIcon,
  DiscIcon,
  ZapIcon,
  ClockIcon,
  UserIcon,
  SettingsIcon,
  HelpCircleIcon,
} from "@/components/soundcloud-icons" // Import custom icons
import Link from "next/link"

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

const PRESET_SUGGESTIONS = [
  { name: "808 Cowbell", icon: DrumIcon },
  { name: "Glitch", icon: ZapIcon },
  { name: "Jazz Fusion", icon: GuitarIcon },
  { name: "Afrobeat", icon: HeadphonesIcon },
  { name: "Lo-Fi", icon: MusicIcon },
  { name: "Stadium Rock", icon: MicIcon },
  { name: "Ambient", icon: ClockIcon },
]

const GENRE_PRESETS = [
  { name: "TECHNO", description: "Driving, repetitive beats for the dancefloor.", icon: HeadphonesIcon },
  { name: "HOUSE", description: "Groovy, four-on-the-floor rhythms.", icon: MusicIcon },
  { name: "TRAP", description: "Hard-hitting 808s and intricate hi-hats.", icon: DrumIcon },
  { name: "BREAKBEAT", description: "Chopped and syncopated drum loops.", icon: ZapIcon },
  { name: "MINIMAL", description: "Sparse, subtle, and hypnotic patterns.", icon: ClockIcon },
]

export default function Generator() {
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
  const [volume, setVolume] = useState([70])
  const [beatName, setBeatName] = useState("Untitled Beat")
  const [remainingGenerations, setRemainingGenerations] = useState(5) // Freemium model example

  const audioContextRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playSound = useCallback(
    async (drumType: keyof typeof DRUM_SAMPLES) => {
      if (!audioContextRef.current) return

      try {
        const audio = new Audio(DRUM_SAMPLES[drumType])
        audio.crossOrigin = "anonymous"
        audio.volume = volume[0] / 100
        await audio.play()
      } catch (error) {
        console.error(`Error playing ${drumType}:`, error)
      }
    },
    [volume],
  )

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
    if (remainingGenerations <= 0) {
      alert("You've reached your generation limit. Upgrade to Pro for unlimited generations!")
      return
    }

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
        setRemainingGenerations((prev) => prev - 1)
        if (!beatPrompt) setPrompt("")
      }
    } catch (error) {
      console.error("Error generating beat:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const saveBeat = () => {
    // Simulate saving
    alert(`Beat "${beatName || "Untitled"}" saved to your library!`)
  }

  const exportBeat = () => {
    // Simulate export
    alert("Beat exported as WAV file!")
  }

  const drumLabels = {
    kick: { label: "KICK", icon: DrumIcon },
    snare: { label: "SNARE", icon: MicIcon },
    hihat: { label: "HIHAT", icon: HeadphonesIcon },
    openhat: { label: "OPENHAT", icon: DiscIcon },
    clap: { label: "CLAP", icon: ZapIcon },
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="bg-background/20 backdrop-blur-md border-b border-border py-4 px-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
          >
            <MusicIcon className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">Rhythm Machine Pro</span>
          </Link>
          <div className="h-8 w-px bg-border"></div>
          <h1 className="text-3xl font-bold tracking-wide">AI Beat Generator</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-foreground font-semibold">Alex Producer</div>
            <div className="text-primary text-sm">Pro Plan ({remainingGenerations} generations left)</div>
          </div>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* AI Generator Section */}
        <Card className="bg-card rounded-lg p-8 border border-border shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <SparklesIcon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">AI Beat Generator</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <MusicIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your beat (e.g., 'minimal techno', 'trap drums', 'vintage funk')"
                className="pl-12 pr-4 py-3 text-lg bg-secondary border border-border text-foreground placeholder-muted-foreground rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                onKeyDown={(e) => e.key === "Enter" && generateBeat()}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                {prompt.length}/100
              </span>
            </div>
            <Button
              onClick={() => generateBeat()}
              disabled={isGenerating || !prompt.trim() || remainingGenerations <= 0}
              className="bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-primary-foreground px-8 py-3 text-lg rounded-md font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-99"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">
                    <SparklesIcon className="w-5 h-5" />
                  </span>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Generate Beat
                </>
              )}
            </Button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Quick Suggestions:</p>
            <div className="flex flex-wrap gap-3">
              {PRESET_SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion.name}
                  onClick={() => generateBeat(suggestion.name)}
                  variant="outline"
                  size="sm"
                  className="bg-secondary text-foreground border border-border hover:bg-primary/20 hover:border-primary hover:text-primary rounded-full px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 transform hover:scale-[1.02] active:scale-98 shadow-sm"
                >
                  {React.createElement(suggestion.icon, { className: "w-4 h-4" })}
                  {suggestion.name}
                </Button>
              ))}
            </div>
          </div>

          {pattern.description && (
            <div className="bg-primary/20 border border-primary/30 rounded-lg p-4">
              <p className="text-primary text-sm font-medium">{pattern.description}</p>
            </div>
          )}
        </Card>

        {/* Controls Section */}
        <Card className="bg-card rounded-lg p-8 border border-border shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-6">
            {/* Playback Controls */}
            <div className="flex items-center gap-4">
              <Button
                onClick={togglePlay}
                className={`w-20 h-20 rounded-full ${
                  isPlaying
                    ? "bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80"
                    : "bg-secondary hover:bg-muted"
                } text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95`}
              >
                {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8 ml-1" />}
              </Button>
              <Button
                onClick={stop}
                className="w-16 h-16 rounded-md bg-secondary hover:bg-muted text-foreground shadow-md flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <SquareIcon className="w-6 h-6" />
              </Button>
              <Button
                onClick={clear}
                className="bg-secondary text-foreground hover:bg-muted px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
              >
                <RotateCcwIcon className="w-5 h-5" />
                Clear
              </Button>
              <Button
                variant="outline"
                className="bg-secondary text-foreground hover:bg-muted px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
              >
                <DiscIcon className="w-5 h-5" />
                Record
              </Button>
            </div>

            {/* Volume & BPM Controls */}
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-4">
                <Volume2Icon className="w-6 h-6 text-foreground" />
                <div className="w-32">
                  <Slider value={volume} onValueChange={setVolume} min={0} max={100} step={1} className="w-full" />
                </div>
                <span className="text-foreground text-lg font-mono w-12">{volume[0]}%</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-foreground text-lg">BPM</span>
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
                <span className="text-foreground font-mono w-16 text-lg">{pattern.bpm}</span>
              </div>

              <div className="flex gap-2">
                {[60, 90, 120, 140, 180].map((bpm) => (
                  <Button
                    key={bpm}
                    onClick={() => setPattern((prev) => ({ ...prev, bpm: bpm }))}
                    variant="outline"
                    size="sm"
                    className="bg-secondary text-foreground border border-border hover:bg-muted text-xs rounded-md px-3 py-1.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-98 shadow-sm"
                  >
                    {bpm}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* 16-Step Sequencer Section */}
        <Card className="bg-card rounded-lg p-8 border border-border shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6">16-Step Sequencer</h2>
          {/* Step Numbers */}
          <div className="flex mb-4 pl-28">
            <div className="flex-1 grid grid-cols-16 gap-2">
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded flex items-center justify-center text-sm font-mono transition-all duration-150 ${
                    [0, 4, 8, 12].includes(i)
                      ? "bg-foreground text-background font-bold"
                      : "bg-secondary text-muted-foreground"
                  } ${
                    i === currentStep && isPlaying
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-card animate-pulse"
                      : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Drum Tracks */}
          <div className="space-y-4">
            {Object.entries(drumLabels).map(([drum, { label, icon }]) => (
              <div
                key={drum}
                className={`flex items-center py-2 border-b border-border last:border-b-0 ${
                  currentStep !== -1 && isPlaying && pattern[drum as keyof typeof drumLabels][currentStep]
                    ? "bg-primary/10 rounded-md"
                    : ""
                } transition-colors duration-150`}
              >
                <div className="w-28 pr-4 flex items-center gap-2">
                  <Button
                    onClick={() => playSound(drum as keyof typeof DRUM_SAMPLES)}
                    className="text-left w-full p-3 rounded-md bg-secondary hover:bg-muted transition-colors flex items-center gap-2 transform hover:scale-[1.02] active:scale-98 shadow-sm"
                  >
                    {React.createElement(icon, { className: "w-5 h-5 text-primary" })}
                    <div className="text-foreground font-semibold text-base">{label}</div>
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-16 gap-2">
                  {pattern[drum as keyof typeof drumLabels].map((active, step) => (
                    <button
                      key={step}
                      onClick={() => toggleStep(drum as keyof DrumPattern, step)}
                      className={`h-14 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        active
                          ? "bg-gradient-to-br from-gradient-start to-gradient-end shadow-lg shadow-primary/30 animate-beat-pop"
                          : "bg-secondary hover:bg-muted"
                      } ${
                        step === currentStep && isPlaying
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-card animate-pulse"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Genre Presets Section */}
        <Card className="bg-card rounded-lg p-8 border border-border shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6">Genre Presets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GENRE_PRESETS.map((genre) => (
              <Card
                key={genre.name}
                onClick={() => generateBeat(genre.name.toLowerCase())}
                className="bg-secondary border border-border hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer group transform hover:scale-[1.02]"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300 transform group-hover:scale-110">
                    {React.createElement(genre.icon, {
                      className: "w-8 h-8 text-primary group-hover:text-foreground transition-colors duration-300",
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{genre.name}</h3>
                  <p className="text-muted-foreground text-sm">{genre.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-secondary text-foreground border border-border hover:bg-muted transition-all duration-200 transform hover:scale-[1.02] active:scale-98 shadow-sm"
                  >
                    Generate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>

        {/* Additional Feature Areas (Placeholders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card rounded-lg p-8 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6">Export & Share</h2>
            <div className="space-y-4">
              <Button className="w-full bg-secondary text-foreground hover:bg-muted py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md">
                <DownloadIcon className="w-5 h-5" /> Export WAV
              </Button>
              <Button className="w-full bg-secondary text-foreground hover:bg-muted py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md">
                <DownloadIcon className="w-5 h-5" /> Export MP3
              </Button>
              <Button className="w-full bg-secondary text-foreground hover:bg-muted py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md">
                <DownloadIcon className="w-5 h-5" /> Export MIDI
              </Button>
              <Button className="w-full bg-secondary text-foreground hover:bg-muted py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md">
                <ShareIcon className="w-5 h-5" /> Share to Community
              </Button>
            </div>
          </Card>

          <Card className="bg-card rounded-lg p-8 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6">Beat History & Management</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Your recently generated and saved beats will appear here.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>"Trap Banger" - Saved 2 hours ago</li>
                <li>"Lo-Fi Chill" - Saved 1 day ago</li>
              </ul>
              <Button className="w-full bg-secondary text-foreground hover:bg-muted py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md">
                <RotateCcwIcon className="w-5 h-5" /> Undo Last Action
              </Button>
              <Button className="w-full bg-secondary text-foreground hover:bg-muted py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md">
                <SaveIcon className="w-5 h-5" /> Manage Saved Patterns
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
