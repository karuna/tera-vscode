# Tera extension for VS Code

[![](https://vsmarketplacebadge.apphb.com/version/karunamurti.tera.svg)](https://marketplace.visualstudio.com/items?itemName=karunamurti.tera)

VS Code extension for syntax highlighting and formatting [Tera][tera] templates. Based on https://github.com/danielchatfield/atom-jinja2.

## Features

Syntax highlighting for Tera Template.

![Screnshot](images/screenshot.png)

## Requirements

Visual Studio Code. Version 1.19.1 as this extension made.

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
| macro   | `{% macro %} {% endmacro %}`       |

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
