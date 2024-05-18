import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      host: (env.PRODUCTION ? env.PROD_SERVER_HOST : env.SERVER_HOST),
      port: (env.PRODUCTION ? 80 : env.SERVER_PORT)
    }
  }
})
