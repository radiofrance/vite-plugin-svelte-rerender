# vite-plugin-svelte-rerender

Use this plugin if you want to see which DOM node are being refreshed.

![Screencast from 2025-01-31 15-45-21](https://github.com/user-attachments/assets/81eaf7d7-3e96-425e-8837-ee0282e0d717)

## Install

```sh
npm i -D vite-plugin-svelte-rerender
```

## Usage

```ts
// vite.config.ts

import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelteRerender } from "vite-plugin-svelte-rerender";

export default defineConfig({
  plugins: [sveltekit(), svelteRerender()],
});
```
