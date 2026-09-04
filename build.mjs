import * as esbuild from 'esbuild';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Prettier registers one lazily loaded plugin per parser, `load: () => import(...)`.
// Only the plugin matching the requested parser is ever loaded, and teraPrettier
// always forces `glimmer`. esbuild has to inline every dynamic import when it
// bundles to CJS though, so the other parsers (flow, typescript, babel, markdown,
// ...) were adding several megabytes of code that can never run. Resolve them to
// an empty module instead. Prettier's own entry point is kept, so resolveConfig
// still reads the user's .prettierrc.
// glimmer is the only parser used for formatting, but resolveConfig parses the
// user's .prettierrc with the yaml plugin, and .prettierrc.json with babel, so
// those two have to survive as well.
const KEEP_PRETTIER_PLUGINS = ['glimmer', 'yaml', 'babel'];

const stubUnusedPrettierPlugins = {
  name: 'stub-unused-prettier-plugins',
  setup(build) {
    build.onResolve({ filter: /[\\/]plugins[\\/][a-z]+\.mjs$/ }, (args) => {
      if (!args.importer.includes('prettier')) return null;
      if (KEEP_PRETTIER_PLUGINS.some((n) => args.path.endsWith(`/${n}.mjs`))) return null;
      return { path: args.path, namespace: 'prettier-plugin-stub' };
    });
    build.onLoad({ filter: /.*/, namespace: 'prettier-plugin-stub' }, () => ({
      contents: 'export default {};',
      loader: 'js',
    }));
  },
};

const minify = process.argv.includes('--minify');
const watch = process.argv.includes('--watch');

/** @type {import('esbuild').BuildOptions} */
const common = {
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'node20',
  external: ['vscode'],
  minify,
  sourcemap: !minify,
  logLevel: 'info',
  alias: {
    // "main" points at a UMD build whose factory-scoped require() esbuild cannot
    // follow, which left 17 unresolved requires in the output.
    'vscode-html-languageservice': require.resolve(
      'vscode-html-languageservice/lib/esm/htmlLanguageService.js',
    ),
  },
  // Prettier's ESM build calls createRequire(import.meta.url) at module scope,
  // and import.meta is empty in CJS output.
  define: { 'import.meta.url': 'import_meta_url' },
  inject: ['./build/import-meta-url.js'],
  plugins: [stubUnusedPrettierPlugins],
};

const targets = [
  { entryPoints: ['./src/extension.ts'], outfile: 'out/main.js' },
  { entryPoints: ['./src/server.ts'], outfile: 'out/server.js' },
];

if (watch) {
  for (const t of targets) {
    const ctx = await esbuild.context({ ...common, ...t });
    await ctx.watch();
  }
} else {
  await Promise.all(targets.map((t) => esbuild.build({ ...common, ...t })));
}
