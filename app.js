
const processList = require('./install-list');

const defaultRun = true;
const defaultList = require('fs').readFileSync('./.conf');

const urlFirst = 'https://gist.githubusercontent.com/CliffCrerar/a47b5153056820682bc3259795b94544/raw/';
const rev = 'a9baf42926583a6fb226c0c0aab75419c0ab1675/';

const List_files = [
    /* 0 */'bear-essentials',
    /* 1 */'angular', 'docker',
    /* 2 */'azure',
    /* 3 */'bootstrap',
    /* 4 */'aspnet',
    /* 5 */'bootstrap',
    /* 6 */'ionic'
];

const install = [
    List_files[0], // bear-essentials
    List_files[1], // angular
    List_files[2], // docker
    List_files[3], // azure
    // List_files[4], // asp-net
    // List_files[5], // bootstrap
    List_files[6] // ionic
]

if (defaultRun) {

    processList(defaultList, null, res => console.log('done'));

} else {

    require('child_process').execSync('rm -rd ~/.vscode/extensions');
    function Install() {
        return install.map(list => new Promise((resolve) => {
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






