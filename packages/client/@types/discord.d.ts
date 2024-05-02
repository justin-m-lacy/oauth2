import { type DiscordAuth } from '@/types/discord';

declare module 'express-session' {

	export interface SessionData {

		discordAuth: DiscordAuth

	}
}

export { }