/**
 * Application entry point
 */
const
    debug = false,
    http = require('https'),
    os = require('os'),
    config = require('./.conf.json'),
    installCommand = 'code --install-extension',
    uninstallCommand = 'code --uninstall-extension',
    cp = require('child_process'),
    fs = require('fs'),
    path = require('path');
    // extDir = path.join(os.homedir(), '.vscode', 'extensions');
    // installedExtensions = fs.readdirSync(extDir);

// console.log('installedExtensions: ', installedExtensions);


// const url = fs.readFileSync('./.conf', 'utf8');

function checkCodeInstallation(checkCodeCliCallback) {
    return cp.exec('code', (err, stdOut) => {
        if (err) {
            debug
                ? console.err(err.message, '\n', err.stack)
                : console.err(err.message);
            console.log('\n Vscode CLI Is not configured. See this link https://code.visualstudio.com/docs/editor/command-line')
            checkCodeCliCallback(err);
        } else {
            checkCodeCliCallback(null);
        }
        console.log('stdOut: ', stdOut);
    });
}


function uninstallExtensions(installed) {
    // return installed.map(extWithVersion => new Promise((resolve, reject) => {
        // console.log('extWithVersion: ', extWithVersion);
        // fs.unlink(path.join(extDir, ext), (err) => {
        //     if (err) {
        //         reject(err);
        //     } else {
        //         resolve(ext);
        //     }
        // })

        // const extWithVersionArr = extWithVersion.subStrin()
        // const strToArr = extWithVersion.split('-');
        // strToArr.splice(strToArr.length - 1)
        // const extOnly = strToArr.join('-');
        // console.log('strToArr: ', strToArr);


        // console.log('extWithVersion: ', extWithVersion);
        // console.log('strLen: ', strLen);

        // const extOnly = extWithVersion.substr(0,extWithVersion-strLen);


        // const extOnly = extWithVersionArr.join('-');
        // console.log('extWithVersionArr: ', extWithVersionArr);
    //     console.log('extOnly: ', extOnly);

    //     cp.exec(`${uninstallCommand} ${extOnly}`, err => {
    //         return err ? reject(err) : resolve(extOnly);
    //     })
    //     cp.exec(`${uninstallCommand} ${extOnly}`, err => {
    //         return err ? reject(err) : resolve(extOnly);
    //     })
    // }))
}

function installExtensions(exList) {
    return exList.split(/\n/).map(ext =>
        new Promise((resolve, reject) => {
            cp.exec(`${installCommand} ${ext}`, (err, stdout, stderr) => {
                if (err) {
                    return reject(err);
                }
                return resolve(stdout)
            })
        })
    );
}

function httpCallList(url, resultCallback) {
    return http.request(url, (response) => {
        let extList = '';
        response.on('data', chunk => extList += chunk)
        response.on('end', () => resultCallback(null, extList))
        response.on('error', error => resultCallback(error, null))
    }).end();
}

function getSelectedEnvUrls(conf) {
    const fileStores = `${conf.gists}/${conf.gistNumber}/raw/${conf.gistRevision}`;
    return getEnvironments(conf.environments)
        .filter(({ install }) => install)
        .map(({ fileName }) => `${fileStores}/${fileName}`);
}

function getEnvironments(environments) {
    return Object
        .keys(environments)
        .map(env => environments[env])
}


checkCodeInstallation(err => {
    if (err) throw err;
    // const removedExtensions = uninstallExtensions(installedExtensions);

    // removedExtensions.map(promise => promise
    //     .then(result => console.log('Success', result))
    //     .catch(uninstallErr => console.log("ERROR Uninstall:", uninstallErr))
    // );

    // Promise.all(removedExtensions).then(result => {
    //     // console.log('result: ', result);

    // }).catch(err => {
    //     // console.log('err: ', err);

    // })

    // cp.execSync('rm -rd ~/.vscode/extensions')
    
    
    
        const Lists = getSelectedEnvUrls(config)
        .map(url=>httpCallList(url,(err,httpCallResult)=>new Promise((reject,resolve)=>{
            if(err){
                reject(err)
            } else {
                resolve(httpCallResult)
            }
        })));

        console.log(Lists);
    
})