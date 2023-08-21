import type { BotEvents } from "mineflayer"

export const port: number = 3000
export const events: (keyof BotEvents)[] = ['login', 'end', 'chat']
