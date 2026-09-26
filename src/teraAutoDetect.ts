import * as fs from 'fs/promises';
import * as path from 'path';
import { ExtensionContext, TextDocument, Uri, languages, workspace } from 'vscode';

/**
 * Crude Cargo.toml dependency scan, no TOML parser needed: tracks whether we're
 * inside a `[dependencies]`/`[workspace.dependencies]` table and matches a
 * `tera = ...` entry, or a dedicated `[dependencies.tera]` table header.
 */
function cargoUsesTera(content: string): boolean {
	let inDependenciesTable = false;

	for (const rawLine of content.split(/\r?\n/)) {
		const line = rawLine.trim();

		if (/^\[(dependencies\.tera|workspace\.dependencies\.tera)\]/.test(line)) {
			return true;
		}

		const tableHeader = line.match(/^\[(.+)\]$/);
		if (tableHeader) {
			inDependenciesTable = tableHeader[1] === 'dependencies' || tableHeader[1] === 'workspace.dependencies';
			continue;
		}

		if (inDependenciesTable && /^tera\s*=/.test(line)) {
			return true;
		}
	}

	return false;
}

async function findCargoToml(startDir: string, stopAtDir: string): Promise<string | undefined> {
	let dir = startDir;

	for (;;) {
		const candidate = path.join(dir, 'Cargo.toml');
		try {
			await fs.access(candidate);
			return candidate;
		} catch {
			// keep walking up
		}

		if (dir === stopAtDir) {
			return undefined;
		}

		const parent = path.dirname(dir);
		if (parent === dir) {
			return undefined;
		}
		dir = parent;
	}
}

/**
 * Switches `.html` documents to the `tera-html` language when the nearest
 * Cargo.toml (walking up from the file, per-crate rather than per-workspace)
 * depends on `tera`. Leaves plain HTML projects untouched.
 */
export class TeraAutoDetector {
	private readonly cargoUsesTeraCache = new Map<string, boolean>();

	constructor(context: ExtensionContext) {
		const watcher = workspace.createFileSystemWatcher('**/Cargo.toml');
		watcher.onDidChange(uri => this.cargoUsesTeraCache.delete(uri.fsPath));
		watcher.onDidCreate(uri => this.cargoUsesTeraCache.delete(uri.fsPath));
		watcher.onDidDelete(uri => this.cargoUsesTeraCache.delete(uri.fsPath));
		context.subscriptions.push(watcher);
	}

	async refreshOpenDocuments(): Promise<void> {
		for (const document of workspace.textDocuments) {
			await this.handleDocument(document);
		}
	}

	async handleDocument(document: TextDocument): Promise<void> {
		if (document.languageId !== 'html' || document.uri.scheme !== 'file') {
			return;
		}

		if (!workspace.getConfiguration('tera', document.uri).get<boolean>('autoDetect', true)) {
			return;
		}

		if (await this.projectUsesTera(document.uri)) {
			await languages.setTextDocumentLanguage(document, 'tera-html');
		}
	}

	private async projectUsesTera(uri: Uri): Promise<boolean> {
		const folder = workspace.getWorkspaceFolder(uri);
		const stopAtDir = folder ? folder.uri.fsPath : path.dirname(uri.fsPath);
		const cargoPath = await findCargoToml(path.dirname(uri.fsPath), stopAtDir);
		if (!cargoPath) {
			return false;
		}

		const cached = this.cargoUsesTeraCache.get(cargoPath);
		if (cached !== undefined) {
			return cached;
		}

		let usesTera: boolean;
		try {
			usesTera = cargoUsesTera(await fs.readFile(cargoPath, 'utf8'));
		} catch {
			usesTera = false;
		}

		this.cargoUsesTeraCache.set(cargoPath, usesTera);
		return usesTera;
	}
}
