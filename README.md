# Tera extension for VS Code

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/karunamurti.tera)](https://marketplace.visualstudio.com/items?itemName=karunamurti.tera)

VS Code extension for syntax highlighting and formatting [Tera][tera] templates. Based on https://github.com/danielchatfield/atom-jinja2.

## Features

Syntax highlighting for Tera templates, embedded in 28 host languages (HTML, XML, CSS, JSON,
Markdown, Python, Ruby, JavaScript, TypeScript, YAML, TOML, LaTeX, Rust and more).

Both **Tera 2** and Tera 1 syntax are highlighted. Tera 2 additions include components
(`{% component %}` / `{{<name />}}`), capture blocks (`{% set x %}...{% endset %}`),
optional chaining (`a?.b`), spread (`{...base}`), ternaries, list comprehensions, slicing
and the renamed built-in filters and tests. Tera 1 tags such as `{% macro %}` and
`{% import %}` are still highlighted so existing templates keep working.

![Screnshot](images/screenshot.png)

## Requirements

Visual Studio Code 1.91.0 or later.

## Snippets

| Snippet | Description                        |
| ------- | ---------------------------------- |
| xx      | `{{ }}`                            |
| block   | `{% block %} {% endblock %}`       |
| inblock | Same as above but on a single line |
| if      | `{% if %} {% endif %}`             |
| ifi     | Same as above but on a single line |
| ifelse  | `{% if %} {% elif %} {% endif %}`  |
| else    | `{% else %}`                       |
| filter  | `{% filter %} {% endfilter %}`     |
| forloop | `{% for in %} {% endfor %}`        |
| extend  | `{% extends "" %}`                 |
| include | `{% include "" %}`                 |
| import  | `{% import "" %}`                  |
| macro   | `{% macro %} {% endmacro %}` (Tera 1 only) |

### Tera 2

| Snippet       | Description                                    |
| ------------- | ---------------------------------------------- |
| component     | `{% component %} {% endcomponent %}`           |
| comp          | `{{<name arg="" />}}`                          |
| compbody      | `{% <name> %} {% </name> %}`                   |
| set           | `{% set = %}`                                  |
| setglobal     | `{% set_global = %}`                           |
| setblock      | `{% set %} {% endset %}`                       |
| raw           | `{% raw %} {% endraw %}`                       |
| comment       | `{# #}`                                        |
| ternary       | `{{ a if cond else b }}`                       |
| comprehension | `{% set out = [x for x in items] %}`           |
| break         | `{% break %}`                                  |
| continue      | `{% continue %}`                               |

## Release Notes

## 0.0.9 - 20201-07-23

- Revert 0.0.8 as it broke down Markdown files

## 0.0.8 - 20201-07-23

- Snippets support in Markdown files
- Syntax highlighting of tera templates in Markdown files

### 0.0.7
- Reregister the `.tera` extension
- Removed the unused dependencies

### 0.0.6

- Tera template file is replaced with HTML for syntax highlighting
- Snippets work in HTML

### 0.0.4

- Added snippets support.

### 0.0.3

- Added formatting support.

### 0.0.1

- First release. May or may not be maintained.

## For more information

- [Tera Template](https://keats.github.io/tera/)
- [Zola](https://github.com/getzola/zola)

**Enjoy!**
