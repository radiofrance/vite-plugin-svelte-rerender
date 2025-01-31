import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizePath } from "vite";
import _debug from "debug";

const debug = _debug("vite-plugin-svelte-rerender");

function getPluginPath() {
  const pluginPath = normalizePath(dirname(fileURLToPath(import.meta.url)));
  return pluginPath.replace(
    /\/vite-plugin-svelte-rerender\/src$/,
    "/vite-plugin-svelte-rerender/src/"
  );
}

/**
 * @returns {import('vite').Plugin}
 */
export default function svelteRerender() {
  /**
   * @type {import('vite').ResolvedConfig}
   */
  let viteConfig;
  let disabled = false;
  let pluginPath = getPluginPath();

  return {
    name: "vite-plugin-svelte-rerender",
    apply: "serve",
    enforce: "pre",

    configResolved(config) {
      debug("configResolved");
      debug(config);
      viteConfig = config;
    },

    async resolveId(importee, _, options) {
      if (options?.ssr || disabled) {
        return;
      }
      if (importee.startsWith("virtual:svelte-rerender-path:")) {
        return importee.replace("virtual:svelte-rerender-path:", pluginPath);
      }
    },

    async load(id, options) {
      if (options?.ssr || disabled) {
        return;
      }
      if (id.startsWith(pluginPath)) {
        // read file ourselves to avoid getting shut out by vites fs.allow check
        const file = cleanUrl(id);
        if (fs.existsSync(id)) {
          return await fs.promises.readFile(file, "utf-8");
        } else {
          viteConfig.logger.error(
            `[vite-plugin-svelte-rerender] failed to find svelte-rerender: ${id}`
          );
        }
      }
    },

    transform(code, id, options) {
      if (options?.ssr || disabled) {
        return;
      }
      if (id.includes("vite/dist/client/client.mjs")) {
        return {
          code: `${code}\nimport('virtual:svelte-rerender-path:/rerender.js')`,
        };
      }
    },
  };
}

const postfixRE = /[?#].*$/s;

/**
 * @param {string} url
 */
export function cleanUrl(url) {
  return url.replace(postfixRE, "");
}
