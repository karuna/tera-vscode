# Changelog

## [0.4.0] - 2026-09-04

- Support Tera 2 syntax, verified against the Tera 2.3.0 parser and docs
- Highlight components: `{% component %}`/`{% endcomponent %}` definitions and both
  usage forms, `{{<name arg="v" />}}` and `{% <name> %}`...`{% </name> %}`
- Highlight capture blocks (`{% set x %}`...`{% endset %}`), `set_global`, `break`,
  `continue` and `elif`
- Highlight the Tera 2 expression syntax: optional chaining `a?.b`, spread `...`,
  ternaries, list comprehensions, slicing, `~` concatenation and backtick strings
- Scope the Tera 2 built-in filters, tests and functions distinctly, including the
  renames (`escape_html`, `newlines_to_br`, `divisible_by`, `str`, `map`)
- Highlight numbers, `True`/`False`/`None`/`null`, and the `body` component variable
- Fix `>=` never being recognised: the operator pattern had `=>` instead
- Fold `{% component %}` and `{% set %}` capture blocks, and tolerate whitespace-control
  dashes in all folding markers
- Add Tera 2 snippets; the `macro` and `import` snippets are marked Tera 1 only
- Tera 1 tags stay highlighted, so existing templates are unaffected

## [0.3.0] - 2026-09-04

- Update all dependencies to their latest compatible releases
- Raise the minimum VS Code version to 1.91 (required by vscode-languageclient/server v10)
- Fix the formatter inserting `[object Promise]` instead of formatted text (Prettier 3 async API)
- Fix the language client and server importing from the browser-only package entrypoints
- Declare `vscode-languageserver-textdocument`, which was imported but never a direct dependency
- Add the missing `language-configuration-latex.json` referenced by the `tera-latex` language
- Add an ESLint flat config so `lint` runs, and repair the broken build/lint scripts
- Switch the package manager to pnpm
- Fix the bundled output crashing on activation: 17 unresolved requires from
  vscode-html-languageservice, and an undefined `import.meta.url` in Prettier

## [0.2.0] - 2025-04-12

- update dependencies
- update package.json
- fix some stuff
- add other languages support
- fix link

## [0.0.9] - 2021-07-23

- Revert 0.0.8 as it broke down Markdown files

## [0.0.8] - 2021-07-23

- Snippets support in Markdown files
- Syntax highlighting of tera templates in Markdown files

## [0.0.7] - 2021-07-07

- Reregister the .tera extension
- Removed the unused dependencies

## [0.0.6] - 2021-03-25

- Tera template file is replaced with HTML for syntax highlighting
- Snippets work in HTML

## [0.0.4] - 2020-10-04

- Added snippets - by Karam Fahad
- Update dependencies, fixed security vulnerability
- Do not include unnecessary files in published extension

## [0.0.3] - 2020-09-12

- Added formatter - by Drew Powers <drew@pow.rs>

## [0.0.2] - 2018-01-02

- Added html basic support

## [0.0.1] - 2018-01-02

- First version of extension
