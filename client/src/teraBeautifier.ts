import * as vscode from "vscode";
import * as cp from "child_process";

export default class TeraBeautifier {
	public format(data: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const cmd = `${this.exe} ${this.cliOptions.join(" ")}`;
			console.log(`formatting tera with command: ${cmd}`);
			console.time(cmd);

			const terabeautifier = cp.spawn(this.exe, this.cliOptions, {
				cwd: vscode.workspace.rootPath || __dirname,
				env: {
					...process.env,
					LC_ALL: "en_US.UTF-8",
				},
			});

			if (terabeautifier.stdin === null || terabeautifier.stdout === null) {
				const msg = "Couldn't initialize STDIN or STDOUT";
				console.warn(msg);
				vscode.window.showErrorMessage(msg);
				reject(msg);
				return;
			}

			let result = "";
			let errorMessage = "";
			terabeautifier.on("error", (err) => {
				console.warn(err);
				vscode.window.showErrorMessage(
					`couldn't run ${this.exe} '${err.message}'`
				);
				reject(err);
			});
			terabeautifier.stdout.on("data", (data) => {
				result += data.toString();
			});
			terabeautifier.stderr.on("data", (data) => {
				errorMessage += data.toString();
			});
			terabeautifier.on("exit", (code) => {
				if (code) {
					vscode.window.showErrorMessage(
						`failed with exit code: ${code}. '${errorMessage}'`
					);
					return reject();
				}
				console.timeEnd(cmd);
				resolve(result);
			});
			terabeautifier.stdin.write(data);
			terabeautifier.stdin.end();
		});
	}

	private get exe(): string {
		const config = vscode.workspace.getConfiguration('tera-html');
		const executePath = config.get("executePath", "terabeautifier");
		const useBundler = config.get("useBundler", false);
		const bundlerPath = config.get("bundlerPath", "bundle");
		const ext = process.platform === "win32" ? ".bat" : "";
		return useBundler ? `${bundlerPath}${ext}` : `${executePath}${ext}`;
	}

	private get cliOptions(): string[] {
		const config = vscode.workspace.getConfiguration('tera-html');
		let acc: string[] = [];

		if (config.get("useBundler")) {
			acc.push("exec", "terabeautifier");
		}

		return Object.keys(config).reduce(function(acc, key) {
			switch (key) {
				case "indentBy":
					acc.push("--indent-by", config[key]);
					break;
				case "keepBlankLines":
					acc.push("--keep-blank-lines", config[key]);
					break;
				case "stopOnErrors":
					if (config["stopOnErrors"] === true) {
						acc.push("--stop-on-errors");
					}
					break;
				case "tab":
					if (config["tab"] === true) {
						acc.push("--tab");
					}
					break;
				case "tabStops":
					acc.push("--tab-stops", config[key]);
					break;
			}
			return acc;
		}, acc);
	}
}
