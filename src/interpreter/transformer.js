
const transform = ast => {
    let trans_ast = [];
        
    while (ast.length > 0) {
        let T = {
            attributes: []
        }
        const node = ast.shift();
        T.element = String(node.element).substring(0, String(node.element).length - 1);

        while (node.specs.length > 0) {
            const spec = node.specs.shift()
            
            if (spec.type == 'selector') {
                T.selector = spec.value;
            } else {
                for (let key in spec) {
                    if (spec.hasOwnProperty(key)) {
                        const A = {};
                        A[key] = spec[key];
                        T.attributes.push(A)                        
                    }
                }
            }
        }       
        trans_ast.push(T)  
    }
    console.log("***************************** TRANSPILER OUTPUT *****************************");
    console.log(JSON.stringify(trans_ast, null, 2));

    return trans_ast;
}

export default transform;