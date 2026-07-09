// ======================================================
// TinyScript Tokenizer v1.0
// ======================================================

function tokenize(source) {

    const lines = source.split("\n");

    const tokens = [];

    for (let i = 0; i < lines.length; i++) {

        let line = lines[i].trim();

        // Skip empty lines
        if (line === "") continue;

        // Skip comments
        if (line.startsWith("//")) continue;

        const parts = line.split(/\s+/);

        tokens.push({
            line: i + 1,
            type: parts[0].toUpperCase(),
            args: parts.slice(1),
            raw: line
        });

    }

    return tokens;

}