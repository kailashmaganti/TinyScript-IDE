// ======================================================
// TinyScript Runtime v1.0
// ======================================================

class Runtime {

    constructor() {
        this.reset();
    }

    reset() {
        this.variables = {};
        this.output = [];
    }

    has(name) {
        return Object.prototype.hasOwnProperty.call(this.variables, name);
    }

    get(name) {

        if (!this.has(name)) {
            throw new Error(`Undefined variable "${name}"`);
        }

        return this.variables[name];

    }

    set(name, value) {
        this.variables[name] = value;
    }

    print(value) {
        this.output.push(String(value));
    }

    clearOutput() {
        this.output = [];
    }

    getOutput() {
        return this.output.join("\n");
    }

}

const runtime = new Runtime();