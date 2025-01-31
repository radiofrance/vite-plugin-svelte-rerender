# vite-plugin-svelte-rerender

Use this plugin if you want to see which DOM node are being refreshed.

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
