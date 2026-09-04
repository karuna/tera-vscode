Everything needed to contribute to this extension.

## Local setup

This project uses [pnpm](https://pnpm.io).

```
pnpm install
```

## Developing

Press <F5>, or pick **Run Extension** from the Run and Debug panel. That builds the
bundles and opens a second VS Code window with `examples/` as its workspace, so the
Tera 1 and Tera 2 sample templates are there to check against. `Cmd+R` in that window
reloads it after a rebuild.

`pnpm run esbuild-watch` rebuilds on save if you would rather not re-run the task.

To debug the language server, run the **Run Extension + Attach to Server** compound;
the server is launched with `--inspect=6009`.

Useful commands:

| Command                 | What it does                                  |
| ----------------------- | --------------------------------------------- |
| `pnpm run esbuild`      | Build `out/main.js` and `out/server.js`       |
| `pnpm run esbuild-watch`| Same, rebuilding on change                     |
| `pnpm run esbuild-min`  | Minified build, as used for publishing         |
| `pnpm run compile`      | Type check only, no emit                       |
| `pnpm run lint`         | ESLint                                         |
| `pnpm run package`      | Build a `.vsix`                                |
| `pnpm run package-ls`   | List the files that would go into the `.vsix`  |

## Packaging

Always go through the `package` script rather than calling `vsce` directly.

`vsce` only knows how to inspect `npm` and `yarn` dependency trees, so with pnpm's
symlinked `node_modules` a bare `vsce ls` or `vsce package` fails with
`npm error code ELSPROBLEMS` and a list of "missing" dependencies. The scripts pass
`--no-dependencies` to avoid that.

That flag is also the correct setting regardless of package manager: esbuild bundles
every runtime dependency into `out/`, so `node_modules` must not be shipped in the
`.vsix`.

If you do need to call `vsce` by hand, pass the flag yourself:

```
pnpm exec vsce ls --no-dependencies
```

## Bundle size

`build.mjs` stubs out the Prettier parser plugins the extension can never use.
Prettier lazily loads one plugin per parser and `teraPrettier` always asks for
`glimmer`, but esbuild has to inline every dynamic `import()` when bundling to CJS,
which put flow, typescript, markdown and the rest into the output. `glimmer`, `yaml`
and `babel` are kept: the last two are what `resolveConfig` uses to read
`.prettierrc` and `.prettierrc.json`. Removing more will break config loading.

## Grammars

All 27 language grammars in `syntaxes/` only `include` `source.tera`, so syntax changes
belong in `syntaxes/tera.json` and every embedded language picks them up.

## Run tests

There is no test suite. `pnpm run compile` and `pnpm run lint` are the checks that exist.
