// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension Git Commit Message Template Editor" is now active!');

	let disposable = vscode.commands.registerCommand('git-commit-msg-template-editor.editMessageTemplate', async () => {
		try {
			const wsPath = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath ?? null; // gets the path of the first workspace folder

			if (!wsPath) {
				throw new Error('No workspace found');
			}

			const gitPath = path.join(wsPath, '.git');

			const templateFilePath = path.join(gitPath, 'commit_msg_template.txt');

			if (!fs.existsSync(templateFilePath)) {
				fs.writeFileSync(templateFilePath, '');
			}

			const content = fs.readFileSync(templateFilePath, 'utf8');

			// User Input to name saved snippet
			const message = await vscode.window.showInputBox({
				placeHolder: "Enter message template",
				prompt: "Enter message template",
				value: content || '',
			});

			fs.writeFileSync(templateFilePath, message || '');

			vscode.window.showInformationMessage(`Template file updated at ${templateFilePath}`);
		} catch (e) {
			vscode.window.showErrorMessage((e as Error)?.message || 'Something went wrong');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
