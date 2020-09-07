const prettydiff = require("prettydiff");

export function prettifyTera({
  code,
  indent_size = 2,
  indent_char = " ",
}: {
  code: string;
  indent_size?: number;
  indent_char?: string;
}): string {
  // add `/>` to all self-closing tags (https://github.com/prettydiff/prettydiff/issues/158)
  let source = code.replace(
    /(<(area|base|br|col|command|embed|hr|img|input|link|meta|param|source|track|wbr)[^>]*)>/gim,
    (match) => match.replace(/\/*>$/, "/>")
  );

  prettydiff.options = {
    ...prettydiff.options,
    attribute_sort: true,
    correct: true, // add semicolons to JS
    end_comma: "multiline",
    indent_char,
    indent_level: 0, // necessary for VS Code
    indent_size,
    language: "jinja",
    language_name: "Tera",
    lexer: "markup",
    mode: "beautify",
    quote_convert: "double", // convert HTML attributes to use double quotes
    source,
    wrap: 180,
  };
  return prettydiff();
}
