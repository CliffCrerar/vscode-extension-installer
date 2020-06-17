/**
 * Application entry point
 */

const
    http = require('https'),
    codeInstallCommand = 'code --install-extension',
    codeUninstallCommand = 'code --uninstall-extension',
    cp = require('child_process'),
    fs = require('fs'),
    debug = false;

// const url = fs.readFileSync('./.conf', 'utf8');

function processList(url,installOrRemove,cb) {

    const codeCommand = installOrRemove === 'u' ? codeUninstallCommand : codeInstallCommand

    function getExtensionList(runInstall) {

        try {
            if (!runInstall) throw new Error('Vscode CLI Is not configured. See this link https://code.visualstudio.com/docs/editor/command-line');
            http.request(url, (response) => {
                debug && console.log('STAUS:', response.statusCode)
                debug && console.log('HEADERS:', response.headers)
                let extList = '';
                response.on('data', chunk => extList += chunk)
                response.on('end', () => {
                    installExtensions(extList.toString())
                })
                response.on('error', (error) => {
                    throw new ErrorEvent('Error getting Extensions', error);
                })
            }).end();
        } catch (err) {
            console.log('ERROR!')
            console.error(err.message);
        }
    }

    function installExtensions(list) {
        if(!fs.existsSync(process.env.HOME+'/.vscode')){
            fs.mkdirSync(process.env.HOME+'/.vscode')
        }
        debug && console.log(list)
        const jsonList = list.split(/\n/);
        debug && console.log('json list', jsonList)
        const installation = jsonList.map(ext =>
            new Promise((resolve, reject) => {
                cp.exec(`${codeCommand} ${ext}`, (err, stdout, stderr) => {
                    if (err) {
                        debug && console.error(err);
                        return reject(err);
                    }
                    console.error(stderr.toString());
                    console.log(stdout.toString());
                    resolve(stdout.toString)
                })
            })
        );

        const p = Promise.all(installation);
        p.then((onFulfilled) => {
            console.log(onFulfilled);
            cb(onFulfilled);
        }).catch(onError=>{
            console.error(onError);
            cb(onError);
        });
    }
    return getExtensionList(true);
}

module.exports = processList;

process.on('uncaughtException', function (err) {
    console.log(err);
}); 