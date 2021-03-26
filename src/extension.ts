// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ImportTrimer } from 'trim-ts-imports/bin/ImportTrimer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "trim-ts-imports" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('trim-ts-imports.trimTsImports', () => {
		// The code you place here will be executed every time your command is executed

		let fileContent = vscode.window.activeTextEditor?.document.getText(undefined);
		if(fileContent) {			
			(new ImportTrimer).trim(fileContent).then(newContent => {
				if(newContent != fileContent && vscode.window.activeTextEditor) {
					const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
					vscode.window.activeTextEditor?.edit(editBuilder => {
						editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), newContent);
					})
				}
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
