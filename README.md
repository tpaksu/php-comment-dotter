# PHP Comment Dotter

A Visual Studio Code extension that automatically adds missing dots at the end of inline PHP comments to improve code consistency and readability.

## Features

- Automatically detects PHP comments that are missing trailing dots
- Adds dots to inline comments (`//`) that don't already end with punctuation
- Preserves existing comments that already have proper punctuation
- Works only with PHP files for targeted functionality
- Provides feedback on the number of dots added

## Usage

### Command Palette
1. Open a PHP file in VS Code
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Search for "Add dots to PHP comments"
4. Execute the command

### Keyboard Shortcut
- **Windows/Linux**: `Ctrl+Alt+.`
- **Mac**: `Cmd+Alt+.`

The keyboard shortcut only works when a PHP file is active and focused.

## How It Works

The extension scans your PHP file for inline comments (`//`) and:
- Skips empty comments (just `//`)
- Skips comments that already end with punctuation (`.`, `!`, `?`, `:`, `,`, `)`)
- Adds a dot to comments that end with a letter or number
- Preserves any trailing whitespace after adding the dot

### Example

**Before:**
```php
// This is a comment about the function
// Another comment here
// This comment already ends properly.
// This one too!
```

**After:**
```php
// This is a comment about the function.
// Another comment here.
// This comment already ends properly.
// This one too!
```

## Requirements

- Visual Studio Code version 1.75.0 or higher
- PHP files (the extension only activates for PHP language files)

## Installation

1. Download or clone this repository
2. Open VS Code
3. Go to Extensions view (`Ctrl+Shift+X`)
4. Click on "..." and select "Install from VSIX..." (if you have a .vsix file)
5. Or use the "Load Unpacked" option in Developer mode

## Development

This extension is built using:
- JavaScript
- VS Code Extension API
- Regular expressions for comment pattern matching

## Author

Published by: tpaksu

## Version

1.0.0