
const transpile = ast => {
    let trans_ast = [];
    
    //console.log(JSON.stringify(ast, null, 2));   
    
    while (ast.length > 0) {
        let T = {
            attributes: []
        }

        const node = ast.shift();

        while (node.specs.length > 0) {
            const spec = node.specs.shift()
            
            if (spec.type == 'selector') {
                T.selector = spec.value;
            }
        }       
        trans_ast.push(T)  
    }
    return trans_ast;
}

export default transpile;