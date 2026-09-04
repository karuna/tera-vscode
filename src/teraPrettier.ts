

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
    return this.formatRange(document, range);
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
      return this.formatRange(document, fullDocumentRange(document));
    }
  }

  private async formatRange(
    document: TextDocument,
    range: Range
  ): Promise<TextEdit[]> {
    const text = document.getText(range);
    const prettierOptions = await this.getPrettierOptions(document.uri.fsPath);
    const formatted = await prettier.format(text, prettierOptions);

    return [TextEdit.replace(range, formatted)];
  }

  async getPrettierOptions(path: string): Promise<prettier.Options> {
    const configFile = await prettier.resolveConfig(path);
    if (configFile) {
      return Object.assign(configFile, DEFAULT_OPTIONS);
    }
    return DEFAULT_OPTIONS;
  }
}
