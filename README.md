# TinyScript

A tiny programming language, its interpreter, and a browser IDE to run it in.
Built for COSC HackWeek 2026 — *A Tiny Programming Language* (Backend / Advanced, 500 pts).

## File structure

```
TinyScript/
├── index.html            IDE shell — links style.css and the js/ modules
├── style.css              blueprint/schematic styling for the IDE
├── script.js               editor, example picker, run/clear, keyboard shortcut
├── js/
│   ├── tokenizer.js       lexer — source text -> token stream
│   ├── parser.js          recursive-descent parser — tokens -> AST
│   ├── runtime.js         Environment, TinyLangFunction, ReturnSignal, stringify
│   └── interpreter.js     run(source) — walks the AST, returns printed lines
├── examples/
│   ├── hello.tiny
│   ├── calculator.tiny
│   ├── factorial.tiny
│   └── fizzbuzz.tiny
├── screenshots/           submission screenshots go here
├── LICENSE
└── .gitignore
```

## Try it

**In the browser:** open `index.html`, pick an example (or write your own), click **Run ▶**
(or press **⌘/Ctrl + Enter**).

**On the command line:**
```bash
node -e "console.log(require('./js/interpreter.js').run(require('fs').readFileSync('examples/fizzbuzz.tiny','utf8')).join('\n'))"
```

## Language features

- **Variables** — `let x = 5;`, reassignment with `x = x + 1;`
- **Types** — numbers, strings, booleans
- **Operators** — `+ - * / %`, `== != < > <= >=`, `&& || !`
- **Conditions** — `if (...) { } else { }`, with `else if` chaining
- **Loops** — `while (...) { }` and C-style `for (init; cond; update) { }`
- **Functions** — `function name(params) { ... return value; }`, including recursion
- **Output** — `print(expr);`
- **Comments** — `// line comment`

See the in-app language reference (bottom of the IDE) for the full syntax table.

## How the interpreter works

- **`js/tokenizer.js`** turns source text into a flat token stream — numbers, strings,
  identifiers, keywords, operators, punctuation — stripping whitespace and comments.
- **`js/parser.js`** is a recursive-descent parser that turns tokens into an AST, handling
  operator precedence (`||` → `&&` → equality → comparison → `+ -` → `* / %` → unary → calls
  → primaries) and statement forms (`let`, `if`, `while`, `for`, `function`, `return`,
  `print`, blocks).
- **`js/runtime.js`** provides the pieces the interpreter needs while it runs: a chain of
  `Environment` scopes for lexical variable lookup, `TinyLangFunction` for callable values,
  and a `ReturnSignal` used to unwind out of a function body on `return`.
- **`js/interpreter.js`** ties the three together — `run(source)` tokenizes, parses, then
  tree-walks the AST, returning every printed line as an array of strings. A step counter
  guards against infinite loops.

All four modules work standalone in Node (`require`) or loaded as plain `<script>` tags in
the browser, where they attach to a shared `window.TinyLang` namespace in load order:
`tokenizer.js` → `parser.js` → `runtime.js` → `interpreter.js` → `script.js`.

## Example programs

- **`hello.tiny`** — the smallest useful program: variables, string concatenation, a loop.
- **`calculator.tiny`** — four arithmetic functions plus a string-dispatched `calculate`
  helper, including a division-by-zero guard.
- **`factorial.tiny`** — a recursive `factorial` function called from a `while` loop, n = 1..8.
- **`fizzbuzz.tiny`** — the classic: 1–20, `Fizz` for multiples of 3, `Buzz` for multiples of
  5, `FizzBuzz` for both.

All four have been run through the interpreter and produce correct output — see
`screenshots/` for the submission captures.

## Design notes

The IDE takes a drafting-table / blueprint approach — grid paper background, schematic
title block, and an annotated "exploded" reading of one line of TinyScript syntax with
leader lines, echoing how the language itself is small enough to sketch and label in full.
