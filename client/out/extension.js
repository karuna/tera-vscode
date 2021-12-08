"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const vscode_html_languageservice_1 = require("vscode-html-languageservice");
const vscode_languageclient_1 = require("vscode-languageclient");
const embeddedSupport_1 = require("./embeddedSupport");
const teraBeautifierProvider_1 = require("./teraBeautifierProvider");
let client;
const htmlLanguageService = (0, vscode_html_languageservice_1.getLanguageService)();
function activate(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    const virtualDocumentContents = new Map();
    vscode_1.workspace.registerTextDocumentContentProvider('embedded-content', {
        provideTextDocumentContent: uri => {
            const originalUri = uri.path.slice(1).slice(0, -4);
            const decodedUri = decodeURIComponent(originalUri);
            return virtualDocumentContents.get(decodedUri);
        }
    });
    context.subscriptions.push(vscode_1.languages.registerDocumentFormattingEditProvider('html.tera', new teraBeautifierProvider_1.default()));
    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'tera-html' }],
        middleware: {
            provideCompletionItem: async (document, position, context, token, next) => {
                // If not in `<style>`, do not perform request forwarding
                if (!(0, embeddedSupport_1.isInsideStyleRegion)(htmlLanguageService, document.getText(), document.offsetAt(position))) {
                    return await next(document, position, context, token);
                }
                const originalUri = document.uri.toString();
                virtualDocumentContents.set(originalUri, (0, embeddedSupport_1.getCSSVirtualContent)(htmlLanguageService, document.getText()));
                const vdocUriString = `embedded-content://css/${encodeURIComponent(originalUri)}.css`;
                const vdocUri = vscode_1.Uri.parse(vdocUriString);
                return await vscode_1.commands.executeCommand('vscode.executeCompletionItemProvider', vdocUri, position, context.triggerCharacter);
            }
        }
    };
    // Create the language client and start the client.
    client = new vscode_languageclient_1.LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);
    // Start the client. This will also launch the server
    client.start();
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map