import * as vscode from "vscode";
import TeraBeautifier from "./teraBeautifier";

export default class TeraBeautifierProvider
	implements vscode.DocumentFormattingEditProvider {
	private teraBeautifier: TeraBeautifier;

	constructor() {
		this.teraBeautifier = new TeraBeautifier();
	}

	public provideDocumentFormattingEdits(
		document: vscode.TextDocument,
		options: vscode.FormattingOptions,
		token: vscode.CancellationToken
	): vscode.ProviderResult<vscode.TextEdit[]> {
		return this.teraBeautifier.format(document.getText()).then(
			(result) => {
				return [
					new vscode.TextEdit(
						document.validateRange(new vscode.Range(0, 0, Infinity, Infinity)),
						result
					),
				];
			},
			(err) => {
				// will be handled in format
				return [];
			}
		);
	}
}
