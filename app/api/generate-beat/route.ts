import { xai } from "@ai-sdk/xai"
import { generateObject } from "ai"
import { z } from "zod"

const drumPatternSchema = z.object({
  kick: z.array(z.boolean()).length(16),
  snare: z.array(z.boolean()).length(16),
  hihat: z.array(z.boolean()).length(16),
  openhat: z.array(z.boolean()).length(16),
  clap: z.array(z.boolean()).length(16),
  bpm: z.number().min(60).max(200),
  description: z.string(),
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const result = await generateObject({
      model: xai("grok-3"),
      prompt: `Create a 16-step drum pattern based on this description: "${prompt}"
      
      Return a drum pattern with these tracks:
      - kick: kick drum hits (typically on beats 1, 5, 9, 13 for basic patterns)
      - snare: snare drum hits (typically on beats 5, 13 for basic patterns)
      - hihat: closed hi-hat hits (can be frequent, like every other step)
      - openhat: open hi-hat hits (sparingly used for accents)
      - clap: hand clap hits (used for emphasis, often with or instead of snare)
      
      Each track should be an array of 16 booleans representing each step.
      Also suggest an appropriate BPM (60-200) and provide a brief description.
      
      Examples:
      - "basic rock beat" might have kick on 1,5,9,13 and snare on 5,13
      - "trap beat" might have kick on 1,7,11 with snare on 5,13 and clap accents
      - "house beat" might have kick on every beat (1,5,9,13) with hihat on off-beats`,
      schema: drumPatternSchema,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Error generating beat:", error)
    return Response.json({ error: "Failed to generate beat" }, { status: 500 })
  }
}
