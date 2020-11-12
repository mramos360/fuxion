//const lexer = str => str.split(' ').map(value => value.trim()).filter(s => s.length);

module.exports = function lexer(str) {
    const tokens = str.split(' ').filter(value => value.length > 0)
            .map(s => {
                return isNaN(s)
                    ? {type: 'word', value: s}
                    : {type: 'number', value: s}
            })

    return tokens;
}

//export default lexer;