declare module 'express-session' {

	export interface SessionData {

		/**
		 * State variable used to identify source in OAuth2
		 */
		state: string,
		loggedIn?: boolean

	}
}

export { }