/**
 * App utils
 */

const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');

exports.tBlue = chalk.blue;

exports.tRed = chalk.red;

exports.prompt = inquirer.createPromptModule();

exports.bottomBar = new inquirer.ui.BottomBar();

exports.clear = require('clear');

exports.store = require('./store');

exports.largeText = (text, color, bold) =>
    new Promise(
        (resolve, reject) => {
            figlet.text(text, {}, (err, data) => {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return reject(err);
                }
                const formatted = color
                    ? bold
                        ? chalk['bold'][color](data)
                        : chalk[color](data)
                    : data;
                return resolve(formatted);
            }
        )
    }
)
