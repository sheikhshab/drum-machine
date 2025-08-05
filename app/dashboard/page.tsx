"use client"

import Link from "next/link"
import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MusicIcon,
  SettingsIcon,
  UserIcon,
  SparklesIcon,
  DownloadIcon,
  ShareIcon,
  PlayIcon,
  RotateCcwIcon,
} from "@/components/soundcloud-icons" // Using Sparkles as Plus, RotateCcw as Trash2

export default function Dashboard() {
  const [user] = useState({
    name: "Alex Producer",
    email: "alex@example.com",
    plan: "Pro",
    beatsThisMonth: 47,
    totalBeats: 156,
  })

  const recentBeats = [
    { id: 1, name: "Trap Banger", genre: "Trap", bpm: 140, created: "2 hours ago", plays: 23 },
    { id: 2, name: "Lo-Fi Chill", genre: "Lo-Fi", bpm: 85, created: "1 day ago", plays: 45 },
    { id: 3, name: "House Groove", genre: "House", bpm: 128, created: "3 days ago", plays: 67 },
    { id: 4, name: "Jazz Fusion", genre: "Jazz", bpm: 120, created: "1 week ago", plays: 89 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/20 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MusicIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Rhythm Machine Pro</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-foreground font-semibold">{user.name}</div>
                <div className="text-primary text-sm">{user.plan} Plan</div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-border text-foreground hover:bg-secondary bg-secondary/50 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <SettingsIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-border text-foreground hover:bg-secondary bg-secondary/50 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <UserIcon className="w-4 h-4" /> {/* Using UserIcon as LogOut placeholder */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Ready to create some amazing beats today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card rounded-lg border border-border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground mb-1">{user.beatsThisMonth}</div>
              <div className="text-muted-foreground text-sm">Beats This Month</div>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-lg border border-border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground mb-1">{user.totalBeats}</div>
              <div className="text-muted-foreground text-sm">Total Beats</div>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-lg border border-border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground mb-1">2.4k</div>
              <div className="text-muted-foreground text-sm">Total Plays</div>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-lg border border-border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground mb-1">89%</div>
              <div className="text-muted-foreground text-sm">Satisfaction</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/generator">
              <Card className="bg-gradient-to-r from-gradient-start/20 to-gradient-end/20 rounded-lg border border-border hover:from-gradient-start/30 hover:to-gradient-end/30 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20">
                <CardContent className="p-6 text-center">
                  <SparklesIcon className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />{" "}
                  {/* Using Sparkles as Plus */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">Create New Beat</h3>
                  <p className="text-muted-foreground">Start with AI generation or build from scratch</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/library">
              <Card className="bg-card rounded-lg border border-border hover:bg-card/90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5">
                <CardContent className="p-6 text-center">
                  <MusicIcon className="w-12 h-12 text-foreground mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Browse Library</h3>
                  <p className="text-muted-foreground">Explore your saved beats and projects</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/collaborate">
              <Card className="bg-card rounded-lg border border-border hover:bg-card/90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5">
                <CardContent className="p-6 text-center">
                  <ShareIcon className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Collaborate</h3>
                  <p className="text-muted-foreground">Work with other producers in real-time</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Beats */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Recent Beats</h2>
            <Link href="/library">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary bg-secondary/50 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentBeats.map((beat) => (
              <Card
                key={beat.id}
                className="bg-card rounded-lg border border-border hover:bg-card/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/5"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground truncate">{beat.name}</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-foreground hover:bg-secondary p-1 transition-all duration-200 transform hover:scale-110 active:scale-90"
                    >
                      <PlayIcon className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Genre:</span>
                      <span>{beat.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BPM:</span>
                      <span>{beat.bpm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plays:</span>
                      <span>{beat.plays}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">{beat.created}</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-foreground hover:bg-secondary p-1 transition-all duration-200 transform hover:scale-110 active:scale-90"
                      >
                        <DownloadIcon className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-foreground hover:bg-secondary p-1 transition-all duration-200 transform hover:scale-110 active:scale-90"
                      >
                        <ShareIcon className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/20 p-1 transition-all duration-200 transform hover:scale-110 active:scale-90"
                      >
                        <RotateCcwIcon className="w-3 h-3" /> {/* Using RotateCcw as Trash2 */}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
