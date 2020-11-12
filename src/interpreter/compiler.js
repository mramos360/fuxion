import selenium from 'selenium-webdriver';
const { Builder, By, Key, until } = selenium;
import chai from 'chai';
const { expect, assert } = chai;

import generate from './generator.js';

const getActualY = (selector, generated) => {
    let arr = generated.map(x => x);

    for (let key in arr) {
        if (arr[key].selector == selector) {
            return arr[key].y;
        }
    }
}

const getSelectorByElementVariable = (varName, trans_ast) => {
    for (let key in trans_ast) {
        if (trans_ast[key].element == varName) {
            return trans_ast[key].selector;
        }
    }
}


const compile = async (driver, trans_ast) => {
    let specs = trans_ast.map(x => x);
    let arr = trans_ast.map(x => x);
    const generated = await generate(driver, trans_ast);    
    //console.log(generated);

    while (specs.length > 0) {
        const current_spec = specs.shift();

        let val;
        let currElement;
        let currElementY;
        let offsetParent;
        let offsetParentY;
        let distance;
        let range;

        currElement = getSelectorByElementVariable(current_spec.element, arr);
        currElementY = getActualY(currElement, generated)
        
        //console.log(currElement, currElementY)

        for (let key in current_spec.attributes) {

            if (current_spec.attributes[key].value == 'above') {
                val = 'above';
            } else if (current_spec.attributes[key].value == 'below') {
                val = 'below';
            }
            offsetParent = current_spec.attributes[key].offsetParent;

            if (offsetParent) {
                const sel = getSelectorByElementVariable(offsetParent, arr)
                offsetParentY = getActualY(sel, generated)
            }
            range = current_spec.attributes[key].range;
        }

        if (val == 'above') {
            distance = offsetParentY - currElementY
        } else if (val == 'below') {
            distance = currElementY - offsetParentY;
        }

        //console.log("###", distance, range[0], range[1])
        if (range.length == 2) {            
            if ((distance >= Number(range[0])) && (distance <= Number(range[1]))) {
                expect((distance >= Number(range[0])) && (distance <= Number(range[1]))).to.be.true
                //console.log('\x1b[32m%s\x1b[0m', 'UX checks passed.');
                
            } else {
                expect.fail("UX check failed.")
                //console.log('\x1b[31m%s\x1b[0m', 'UX checks failed.');
            }
        } else {
            if (distance == Number(range[0])) {
                expect(true).to.be.true;
            } else {
                expect.fail("UX check failed.")
            }
        }
        //console.log(range);
        
        
    }

    return generated;
}

export default compile;