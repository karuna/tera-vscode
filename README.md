# Tera extension for VS Code

[![](https://vsmarketplacebadge.apphb.com/version/karunamurti.tera.svg)](https://marketplace.visualstudio.com/items?itemName=karunamurti.tera)

VS Code extension for syntax highlighting and formatting [Tera][tera] templates. Based on https://github.com/danielchatfield/atom-jinja2.

## Features

Syntax highlighting for Tera Template.

![Screnshot](images/screenshot.png)

## Requirements

Visual Studio Code. Version 1.19.1 as this extension made.

## Extension Settings

By default, only `.tera` files will be formatted. To add `.html` files (used for [Zola][zola]), add the following to VS Code’s `settings.json`:

```json
  "files.associations": {
    "*.html": "tera"
  },
```

## Release Notes

### 0.0.3

Added formatting support.

### 0.0.1

First release. May or may not be maintained.

## For more information

- [Tera Template][tera]

**Enjoy!**

[tera]: https://tera.netlify.com/
[zola]: https://github.com/getzola/zola
