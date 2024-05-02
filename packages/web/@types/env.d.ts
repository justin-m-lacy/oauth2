/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AUTH_HOST: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
