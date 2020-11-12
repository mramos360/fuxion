//import selenium from 'selenium-webdriver';
const { Builder, By, Key, until } = require('selenium-webdriver');


module.exports = async function generate(driver, trans_ast) {

    let generated = [];
    let temp = [trans_ast];

    while (trans_ast.length > 0) {        
        const current_spec = trans_ast.shift();

        const location = await driver.findElement(By.css(current_spec.selector)).getRect();

        let A = {}
        A.selector = current_spec.selector;
        A.x = location.x;
        A.y = location.y;

        generated.push(A);
    }   
    
    return generated;
}

//export default generate;