// import parse from './src/interpreter/parser.js';
// import transform from './src/interpreter/transformer.js';
// import compile from './src/interpreter/compiler.js';
const parse = require('./src/interpreter/parser.js')
const transform = require('./src/interpreter/transformer.js')
const compile = require('./src/interpreter/compiler.js')
const fs = require('fs')

module.exports = function checkUX(driver, specFilePath) {

    return new Promise((resolve, reject) => {
        fs.readFile(String(specFilePath), 'utf8', (err, data) => {        
            const lines = String(data).split('\n');
            const json = transform(parse(lines));

            const result = compile(driver, transform(parse(lines))) 

            if (result != undefined) {
                resolve(result);
            } else {
                reject('Result is null');
            }
        })
    })
    
};