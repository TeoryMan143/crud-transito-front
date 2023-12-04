import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import deno from '@astrojs/deno';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: deno(),
});
