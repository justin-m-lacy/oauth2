/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AUTH_CLIENT: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
