# Changelog

## [0.4.0] - 2026-09-04

- Add Tera 2 syntax support, verified against the Tera 2.3.0 parser
- Highlight components, both the definition and the two call forms
- Highlight capture blocks, `set_global`, `break`, `continue` and `elif`
- Highlight optional chaining, spread, ternaries, list comprehensions and slicing
- Highlight `~` concatenation and backtick strings
- Scope the built-in filters, tests and functions, including the Tera 2 renames
- Highlight numbers, `True`/`False`/`None`/`null` and the component `body` variable
- Match Tera 2 numeric literals, which are plain integers and floats only
- Fix `>=` never being highlighted, the operator pattern had `=>` instead
- Fold components and capture blocks, and allow whitespace control dashes when folding
- Add Tera 2 snippets, and mark the macro and import snippets as Tera 1 only
- Keep highlighting Tera 1 tags so existing templates are unaffected
- Split examples into examples/tera1 and examples/tera2
- Shrink the bundle from 5.0 MB to 1.8 MB by dropping unused Prettier parsers

## [0.3.0] - 2026-09-04

- Update all dependencies to their latest compatible releases
- Raise the minimum VS Code version to 1.91, required by vscode-languageclient 10
- Fix the extension crashing on activation, nothing written in JavaScript ran
- Fix the formatter inserting `[object Promise]` instead of formatted text
- Fix the client and server importing from the browser-only package entrypoints
- Fix the formatter being registered against an unknown language id
- Add range formatting, so Format Selection works
- Declare vscode-languageserver-textdocument, which was imported but never a dependency
- Add the missing language-configuration-latex.json used by the tera-latex language
- Add an ESLint flat config so lint runs, and repair the broken build and lint scripts
- Replace the dead marketplace badge that blocked packaging
- Switch the package manager to pnpm

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
