declare global {

	namespace NodeJS {

		interface ProcessEnv {

			SESSION_SECRET: string;
			HOST_URI: string;
			HOST_PORT: string | number;
			STATIC_PATH?: string;
			WEB_HOST?: string;
			SERVE_STATIC?: boolean

		}

	}

}

export { }