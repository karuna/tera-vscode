import * as vscode from "vscode";
import { prettifyTera } from "./format";

export function activate() {
  vscode.languages.registerDocumentFormattingEditProvider("tera", {
    provideDocumentFormattingEdits(document) {
      const start = new vscode.Position(0, 0);
      const end = new vscode.Position(
        document.lineCount - 1,
        document.lineAt(document.lineCount - 1).text.length
      );
      const range = new vscode.Range(start, end);

      const code = document.getText(range);
      const workspaceConfig = vscode.workspace.getConfiguration("editor");
      const activeEditorOptions =
        (vscode.window.activeTextEditor &&
          vscode.window.activeTextEditor.options) ||
        {};
      const newText = prettifyTera({
        code,
        indent_size: activeEditorOptions.tabSize || workspaceConfig.tabSize,
        indent_char: activeEditorOptions.insertSpaces ? " " : "\t",
      });
      return [vscode.TextEdit.replace(range, newText)];
    },
  });
}
