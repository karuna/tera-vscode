"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const teraBeautifier_1 = require("./teraBeautifier");
class TeraBeautifierProvider {
    constructor() {
        this.teraBeautifier = new teraBeautifier_1.default();
    }
    provideDocumentFormattingEdits(document, options, token) {
        return this.teraBeautifier.format(document.getText()).then((result) => {
            return [
                new vscode.TextEdit(document.validateRange(new vscode.Range(0, 0, Infinity, Infinity)), result),
            ];
        }, (err) => {
            // will be handled in format
            return [];
        });
    }
}
exports.default = TeraBeautifierProvider;
//# sourceMappingURL=teraBeautifierProvider.js.map