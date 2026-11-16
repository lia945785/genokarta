import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Content Security Policy додається лише до зібраної версії (npm run build).
 * У режимі розробки Vite вставляє власні скрипти для гарячого перезавантаження,
 * тому сувора політика там заважала б роботі.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export default defineConfig({
  // Відносні шляхи: зібраний застосунок працює з будь-якої папки чи з GitHub Pages.
  base: './',
  plugins: [
    react(),
    {
      name: 'content-security-policy',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}" />`,
        );
      },
    },
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
