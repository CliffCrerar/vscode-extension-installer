# Visual Studio Code Extension installer

> #### DISCLAIMER: At the moment this is a quick Saturday evening DX project. Don't expect miracles.


## Motivation

`Vscode` extension market place has so many great extension, but sometimes when you come back from the candy store with all kinds of different types of amazingness they dont always gel and you end up having a bad time. Having a list of my favorite extensions means that as soon as I get tired of my shit not gelling I simply kill the `extensions` folder run this app and boom my minimal pristine devenv is my little piece of dev heaven again.

## Default config

1. clone this repo `https://github.com/CliffCrerar/vscode-extension-installer.git`.

2. run `cd vscode-extension-installer && npm start`

### Default Extension Manifest

* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftwarecode-spell-checker)
* [JavaScript Console Utils](https://marketplace.visualstudio.com/items?itemName=whtouche.vscode-js-console-utils)
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
* [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
* [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
* [Material Icons Theme](https://www.google.com/search?q=pkief.material-icon-theme&rlz=1C5CHFA_enZA891ZA891&oq=pkief.material-icon-theme&aqs=chrome..69i57j0.263j0j4&sourceid=chrome&ie=UTF-8)
* [SCSS Formatter for VSCODE](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter)
* [CSS Class Intellisense](https://github.com/Zignd/HTML-CSS-Class-Completion)
* [JavaScript Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
* [VSCODE Intellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeamvscodeintellicode)
* [JavaScript ES6 strings](https://www.google.com/search?q=zjcompt.es6-string-javascript&rlz=1C5CHFA_enZA891ZA891&oq=zjcompt.es6-string-javascript&aqs=chrome.69i57.275j0j4&sourceid=chrome&ie=UTF-8)

## Create a custom list

1. Create a gist like this one -> [github gist](https://gist.githubusercontent.com/CliffCrerar/a47b5153056820682bc3259795b94544/raw/88e07596c19f1073f4f822649dc6de33b1a6cd6e/vscode-bear-essentials.txt)

3. Add to the list by getting the `publisher.extension` extension unique identifier. 

>This extension key appears next to the extension title of each extension. Here is a link[`VSCODE market place`](https://marketplace.visualstudio.com/vscode).) Alternatively look at the extensions tab in `VSCODE`.

4. Save the gist once satisfied, still on the same gist click the `raw` button in the github console.

5. Copy the raw git url from the browser and paste into the `.conf` file, save an close.

6. run `npm start`

