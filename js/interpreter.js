// ======================================================
// TinyScript Interpreter v1.0
// ======================================================

function execute(code){

    runtime.reset();

    const tokens = tokenize(code);

    const program = parse(tokens);

    interpret(program);

    return runtime.getOutput();

}
// ======================================================
// Main Interpreter
// ======================================================

function interpret(program){

    for(

        let pc = 0;

        pc < program.length;

        pc++

    ){

        const instruction =

            program[pc];

        switch(

            instruction.command

        ){

            case "LET":

                executeLET(

                    instruction.args

                );

                break;
                case "PRINT":

    executePRINT(

        instruction.args

    );

    break;

case "IF":

    pc = executeIF(

        program,

        pc

    );

    break;

case "LOOP":

    pc = executeLOOP(

        program,

        pc

    );

    break;

            default:

                throw new Error(

                    "Unknown command: " +

                    instruction.command

                );

        }

    }

}
// ======================================================
// LET
// ======================================================

function executeLET(args){

    const variable =

        args[0];

    const expression =

        args.slice(2).join(" ");

    runtime.set(

        variable,

        evaluate(expression)

    );

}
// ======================================================
// PRINT
// ======================================================

function executePRINT(args){

    runtime.print(

        evaluate(

            args.join(" ")

        )

    );

}
// ======================================================
// IF
// ======================================================

function executeIF(program, pc){

    const condition =

        program[pc].args.join(" ");

    if(evaluate(condition)){

        return pc;

    }

    while(

        pc < program.length &&

        program[pc].command !== "ENDIF"

    ){

        pc++;

    }

    return pc;

}
// ======================================================
// LOOP
// ======================================================

function executeLOOP(program, pc){

    const count =

        evaluate(

            program[pc].args.join(" ")

        );

    let end = pc + 1;

    while(

        end < program.length &&

        program[end].command !== "ENDLOOP"

    ){

        end++;

    }

    const block =

        program.slice(

            pc + 1,

            end

        );

    for(

        let i = 0;

        i < count;

        i++

    ){

        interpret(block);

    }

    return end;

}
// ======================================================
// Evaluate
// ======================================================

function evaluate(expression){

    expression =

        expression.trim();

    // String

    if(

        expression.startsWith('"')

        &&

        expression.endsWith('"')

    ){

        return expression.slice(

            1,

            -1

        );

    }

    // Replace variables

    for(

        const key

        in

        runtime.variables

    ){

        const regex =

            new RegExp(

                "\\b"+key+"\\b",

                "g"

            );

        expression =

            expression.replace(

                regex,

                runtime.get(key)

            );

    }

    // Number

    if(

        !isNaN(expression)

    ){

        return Number(

            expression

        );

    }

    // Arithmetic
    return Function(

`"use strict";

return (${expression});`

)();

}
