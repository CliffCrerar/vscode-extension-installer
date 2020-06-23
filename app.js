
const processList = require('./install-list');

const defaultRun = false;
const defaultList = require('fs').readFileSync('./.conf');

const urlFirst = 'https://gist.githubusercontent.com/CliffCrerar/a47b5153056820682bc3259795b94544/raw/';
const rev = '71ef67839f5428c9425d7777304b296a86ff3feb/'


const List_files = [
    /* 0 */'bear-essentials',
    /* 1 */'angular', 
    /* 2 */'docker',
    /* 3 */'azure',
    /* 4 */'bootstrap',
    /* 5 */'aspnet',
    /* 6 */'ionic',
    /* 7 */'aws'
];

const install = [
    List_files[0], // bear-essentials
    List_files[1], // angular
    List_files[2], // docker
    //List_files[3], // azure
    //List_files[4], // bootstrap
    //List_files[5], // aspnet
    List_files[6], // ionic
    List_files[7] // aws
]

if (defaultRun) {

    processList(defaultList, null, res => console.log('done'));

} else {
    if(require('fs').existsSync(process.env.HOME+'/.vscode/extensions')) require('child_process').execSync('rm -rd ~/.vscode/extensions');
    function Install() {
        return install.map(list => new Promise((resolve) => {
            console.log('url',`${urlFirst}${rev}${list}.txt`)
            processList(`${urlFirst}${rev}${list}.txt`, null, (res) => {
                console.log('res: ', res);
                resolve(res);
            });
        }))
    }

    Promise
    .all(Install()).then(res => {
        console.log('Success: ', res);
    })
    .catch(err => console.log(err));

}






