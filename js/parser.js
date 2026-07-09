// ======================================================
// TinyScript Parser v1.0
// ======================================================

function parse(tokens) {

    return tokens.map(token => {

        return {

            command: token.type,

            args: token.args,

            line: token.line,

            raw: token.raw

        };

    });

}