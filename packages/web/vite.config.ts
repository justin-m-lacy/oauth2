import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, command }) => {

    console.log(`build mode: ${mode}  command: ${command}`);

    const env = loadEnv(mode, process.cwd());

    const origins = ["'self'", env.VITE_AUTH_CLIENT].
        filter(v => v != null).join(" ");

    const securityPolicies = [
        `default-src ${origins}`,
        `connect-src ${origins}`,
        `img-src ${origins}`,
        `style-src 'self'`
    ];

    return {
        base: `${env.VITE_HOST_PATH ?? '/'}`,
        resolve: {

            extensions: ['.js', '.ts', '.vue', '.json'],
            alias: {
                "@/": `${resolve(__dirname, './src/')}/`
            }
        },
        plugins: [
            vue(),
            createHtmlPlugin({

                minify: true,
                template: "index.html",
                inject: {
                    data: {
                        SECURITY_POLICY: securityPolicies.join("; "),
                    }
                }

            }),
        ],
        optimizeDeps: {

            include: [
                "vue",
                "@vueuse/core",

            ]
        },

        server: {
            https: false,
            port: 5173,
            cors: true,
            hmr: {
                host: 'localhost',
            },
        }

    }

})