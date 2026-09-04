// esbuild emits CJS, where `import.meta` is empty. Prettier's ESM build calls
// createRequire(import.meta.url) at module scope, which throws on undefined.
// Paired with --define:import.meta.url=import_meta_url, this supplies a real URL.
export var import_meta_url = require('url').pathToFileURL(__filename).href;
