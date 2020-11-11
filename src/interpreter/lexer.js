//const lexer = str => str.split(' ').map(value => value.trim()).filter(s => s.length);

const lexer = str => {
    return str.split(' ').filter(value => value.length > 0)
            .map(s => {
                return isNaN(s)
                    ? {type: 'word', value: s}
                    : {type: 'number', value: s}
            })
}

export default lexer;