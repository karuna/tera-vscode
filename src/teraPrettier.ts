

"use strict";
import * as vscode from "vscode";
import {
  DocumentFormattingEditProvider,
  TextDocument,
  FormattingOptions,
  CancellationToken,
  ProviderResult,
  TextEdit,
  Range,
  DocumentRangeFormattingEditProvider
} from "vscode";
import * as prettier from "prettier";

const DEFAULT_OPTIONS = {
  parser: "glimmer"
};

function fullDocumentRange(document: TextDocument): Range {
  const lastLineId = document.lineCount - 1;
  return new Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

export class TerraPrettierFormatter
  implements
  DocumentFormattingEditProvider,
  DocumentRangeFormattingEditProvider {
  provideDocumentRangeFormattingEdits(
    document: TextDocument,
    range: Range,
    _options: FormattingOptions,
    _token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    const text = document.getText(range);

    const prettierOptions = this.getPrettierOptions(document.uri.fsPath);

    // Argument of type '{ parser: string; }' is not assignable to parameter of type 'Options'.ts(2345)
    // @ts-ignore 'glimmer' is not a released parser for prettier so this fails the type check
    const formatted = prettier.format(text, prettierOptions);

    return [TextEdit.replace(range, formatted)];
  }
  provideDocumentFormattingEdits(
    document: TextDocument,
    _options: FormattingOptions,
    _token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    const { activeTextEditor } = vscode.window;
    if (
      activeTextEditor &&
      activeTextEditor.document.languageId === "tera-html"
    ) {
      const text = document.getText();

      const prettierOptions = this.getPrettierOptions(document.uri.fsPath);

      // Argument of type '{ parser: string; }' is not assignable to parameter of type 'Options'.ts(2345)
      // @ts-ignore 'glimmer' is not a released parser for prettier so this fails the type check
      const formatted = prettier.format(text, prettierOptions);

      const range = fullDocumentRange(document);
      return [TextEdit.replace(range, formatted)];
    }
  }

  getPrettierOptions(path: string) {
    let options = DEFAULT_OPTIONS;
    const configFile = prettier.resolveConfig.sync(path);
    if (configFile) {
      return Object.assign(configFile, DEFAULT_OPTIONS);
    }
    return options;
  }
}
