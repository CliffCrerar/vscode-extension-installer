/**
 * Application entry point
 */

const
    http = require('https'),
    codeCommand = 'code --install-extension',
    cp = require('child_process'),
    fs = require('fs'),
    debug = false;

const url = fs.readFileSync('./.conf', 'utf8');

checkCodeInstallation();

function checkCodeInstallation(){
    cp.exec('code',(err,stdOut)=>{
        if(err){
            getExtensionList(false)
        } else {
            getExtensionList(true)
        }
    });
}

function getExtensionList(runInstall){

    try {
        if(!runInstall) throw new Error('Vscode CLI Is not configured. See this link https://code.visualstudio.com/docs/editor/command-line');
        http.request(url, (response) => {
            debug && console.log('STAUS:', response.statusCode)
            debug && console.log('HEADERS:', response.headers)
            let extList = '';
            response.on('data', chunk => extList += chunk)
            response.on('end', () => {
                installExtensions(extList)
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
    debug && console.log(list)
    const jsonList = list.split(/\n/);
    debug && console.log('json list', jsonList)
    const installation = jsonList.map(ext =>
        new Promise((resolve, reject) => {
            cp.exec(`${codeCommand} ${ext}`,(err,stdout,stderr)=>{
                if(err){
                    debug && console.error(err);
                    return reject(err);
                }
                console.log(stdout);
                resolve(stdout)
            })
        })
    );

    const p = Promise.all(installation);
    p.then((onFulfilled)=>{
        process.exit(0);
    });
}
