import { z } from "zod"

const envSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("15m"),
})

export const env = envSchema.parse(process.env)