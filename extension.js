const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('php-comment-dotter.addDots', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== 'php') {
            vscode.window.showWarningMessage('This command only works with PHP files.');
            return;
        }

        const document = editor.document;
        const text = document.getText();

        // Match // comments that end with a space (but not URLs or other special cases)
        const commentRegex = /(\/\/[^\n]*?[^\s])(\s+)$/gm;

        const edits = [];
        let match;
        while ((match = commentRegex.exec(text))) {
            const fullMatch = match[0];
            const commentContent = match[1]; // The comment without trailing whitespace
            const trailingWhitespace = match[2];

            // Skip empty comments (just //) or comments that already end with punctuation
            if (commentContent.trim().length <= 2 || /[.!?:,)]$/.test(commentContent)) {
                continue;
            }

            const range = new vscode.Range(
                document.positionAt(match.index),
                document.positionAt(match.index + fullMatch.length)
            );

            // Add dot before the trailing whitespace
            const replacement = `${commentContent}.${trailingWhitespace}`;
            edits.push(vscode.TextEdit.replace(range, replacement));
        }

        if (edits.length > 0) {
            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(document.uri, edits);

            vscode.workspace.applyEdit(workspaceEdit).then(success => {
                if (success) {
                    vscode.window.showInformationMessage(`Added ${edits.length} missing dot(s) to PHP comments.`);
                } else {
                    vscode.window.showErrorMessage('Failed to add dots to comments.');
                }
            });
        } else {
            vscode.window.showInformationMessage('No missing dots found in PHP comments.');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
