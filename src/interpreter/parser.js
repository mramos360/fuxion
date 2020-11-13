//import lexer from './lexer.js';
const lexer = require('./lexer.js');


module.exports = function parse(lines) {
    let AST = [];
    let A = {
        specs: []
    }
    let count = -1;

    for (let i=0; i < lines.length; i++) {
        
        if (lines[i].trim() != '') {
            const tokens = lexer(lines[i]);

            while (tokens.length > 0) {
                const current_token = tokens.shift();

                if (current_token.value.includes(':')) {
                    A.element = current_token.value;
                }
                if (current_token.value == 'selector') {
                    const argument = tokens.shift();
                    A.specs.push({
                        type: "selector",
                        value: argument.value
                    })
                }
                if ((current_token.value == 'above') || (current_token.value == 'below')) {
                    let B = {}
                    B.type = "position";
                    B.value = current_token.value;
                    let arr = []

                    while (tokens.length > 0) {
                        const c_token = tokens.shift();
                        if (c_token.value.startsWith('$')) {
                            B.offsetParent = c_token.value;
                        } else if (!isNaN(c_token.value)) {
                            arr.push(c_token.value);
                        }
                        if (c_token.value == 'px') {
                            B.unit = "px";
                        }
                    }
                    switch (current_token.value) {
                        case "above":
                            B.range = arr;
                            // B.top.push({
                            //     top: arr
                            // })
                            break;
                        case "below":
                            B.range = arr;
                            // B.top.push({
                            //     bottom: arr
                            // })
                            break;
                    }
                    
                    A.specs.push(B);
                }
                
            }
        }
        
        const next_line = lines[i+1];
        if (String(next_line).trim() != '') {            
            const next_tokens = lexer(String(next_line));
            while (next_tokens.length > 0) {
                const next_c_token = next_tokens.shift();
                if (next_c_token.value.includes(':')) {
                    AST.push(A);
                    A = {
                        specs: []
                    }
                }
            }
        }
    }
    AST.push(A);

    // console.log("***************************** PARSER OUTPUT *****************************");
    // console.log(JSON.stringify(AST, null, 2));

    return AST;
}

