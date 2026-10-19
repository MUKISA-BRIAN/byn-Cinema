import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org/3',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/tmdb/, '') +
            (path.includes('?') ? '&' : '?') +
            'api_key=' + env.TMDB_API_KEY,
        },
      },
    },
  }
})

