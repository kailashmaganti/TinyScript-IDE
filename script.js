// ======================================================
// TinyScript IDE
// script.js
// ======================================================

// =========================
// DOM ELEMENTS
// =========================

const editor = document.getElementById("editor");
const output = document.getElementById("output");

const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const formatBtn = document.getElementById("formatBtn");

const helloBtn = document.getElementById("helloBtn");
const calcBtn = document.getElementById("calcBtn");
const factorialBtn = document.getElementById("factorialBtn");
const fizzBtn = document.getElementById("fizzBtn");

const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn = document.getElementById("downloadBtn");

const copyBtn = document.getElementById("copyBtn");
const copyOutputBtn = document.getElementById("copyOutput");

const fileInput = document.getElementById("fileInput");

const toast = document.getElementById("toast");

const welcomeScreen =
document.getElementById("welcomeScreen");

const lineNumbers =
document.getElementById("lineNumbers");

const lineStatus =
document.getElementById("lineStatus");

const runtimeStatus =
document.getElementById("runtimeStatus");

const lineCount =
document.getElementById("lineCount");

const variableCount =
document.getElementById("variableCount");

const executionTime =
document.getElementById("executionTime");

const outputLines =
document.getElementById("outputLines");

const loadingOverlay =
document.getElementById("loadingOverlay");

const shortcutBtn =
document.getElementById("shortcutBtn");

const shortcutModal =
document.getElementById("shortcutModal");

const closeShortcutModal =
document.getElementById("closeShortcutModal");
const docsBtn =
document.getElementById("docsBtn");
const examplesBtn =
document.getElementById("examplesBtn");
const editorBtn =
document.getElementById("editorBtn");
const aboutModal =
document.getElementById("aboutModal");

const closeAbout =
document.getElementById("closeAbout");
const aboutBtn =
document.getElementById("aboutBtn");
const startCodingBtn =
document.getElementById("startCodingBtn");
const languageGuideBtn =
document.getElementById("languageGuideBtn");
// =========================
// INITIALIZE
// =========================

window.addEventListener(

"DOMContentLoaded",

initialize

);

function initialize(){
    

loadProgram();

attachEvents();

updateEditor();

updateDashboard();

output.textContent =
`TinyScript Runtime Ready...

Waiting for program...`;

}

// =========================
// EVENTS
// =========================

function attachEvents(){

editor.addEventListener(

"input",

editorChanged

);

runBtn.addEventListener(

"click",

runProgram

);

clearBtn.addEventListener(

"click",

clearEditor

);

formatBtn.addEventListener(

"click",

formatProgram

);

helloBtn.addEventListener(

"click",

()=>loadExample("hello")

);

calcBtn.addEventListener(

"click",

()=>loadExample("calculator")

);

factorialBtn.addEventListener(

"click",

()=>loadExample("factorial")

);

fizzBtn.addEventListener(

"click",

()=>loadExample("fizzbuzz")

);

uploadBtn.addEventListener(

"click",

()=>fileInput.click()

);

downloadBtn.addEventListener(

"click",

downloadProgram

);

fileInput.addEventListener(

"change",

uploadProgram

);

copyBtn.addEventListener(

"click",

copyCode

);

copyOutputBtn.addEventListener(

"click",

copyOutput

);



document.addEventListener(

"keydown",

keyboardShortcuts

);
docsBtn.addEventListener(

    "click",

    ()=>{

        document

        .getElementById(

            "documentationSection"

        )

        .scrollIntoView({

            behavior:"smooth"

        });

    }

);
examplesBtn.addEventListener(

    "click",

    ()=>{

        document

        .getElementById(

            "examplesSection"

        )

        .scrollIntoView({

            behavior:"smooth"

        });

    }

);
editorBtn.addEventListener(

    "click",

    ()=>{

        document
        .getElementById("editorSection")
        .scrollIntoView({

            behavior:"smooth"

        });

    }

);
aboutBtn.addEventListener(

    "click",

    ()=>{

        aboutModal.classList.remove(

            "hidden"

        );

    }

);

closeAbout.addEventListener(

    "click",

    ()=>{

        aboutModal.classList.add(

            "hidden"

        );

    }

);
startCodingBtn.addEventListener(

"click",

()=>{

document
.getElementById("editorSection")
.scrollIntoView({

behavior:"smooth"

});

});
languageGuideBtn.addEventListener(

"click",

()=>{

document
.getElementById("languageGuideSection")
.scrollIntoView({

behavior:"smooth"

});


});
shortcutBtn.addEventListener("click",()=>{

    shortcutModal.classList.remove("hidden");

});

closeShortcutModal.addEventListener("click",()=>{

    shortcutModal.classList.add("hidden");

});

}

// =========================
// EDITOR
// =========================

function editorChanged(){

saveProgram();

updateEditor();

updateDashboard();

}

function updateEditor(){

updateLineNumbers();

toggleWelcome();

}

function clearEditor(){

editor.value="";

output.textContent="Console Cleared.";

editorChanged();

showToast("Editor Cleared");

}

function formatProgram(){

editor.value=

editor.value

.split("\n")

.map(

line=>line.trim()

)

.join("\n");

editorChanged();

showToast("Program Formatted");

}

// =========================
// EXAMPLES
// =========================

function loadExample(type){

switch(type){

case "hello":

editor.value=
`PRINT "Hello TinyScript!"`;

break;

case "calculator":

editor.value=
`LET a = 20
LET b = 10

PRINT a + b
PRINT a - b
PRINT a * b
PRINT a / b`;

break;

case "factorial":

editor.value=
`LET n = 5
LET fact = 1

LOOP 5

LET fact = fact * n
LET n = n - 1

ENDLOOP

PRINT fact`;

break;

case "fizzbuzz":

editor.value=
`LET i = 1

LOOP 15

PRINT i

LET i = i + 1

ENDLOOP`;

break;

}

editorChanged();

}
// ======================================================
// RUN PROGRAM
// ======================================================

function runProgram(){

    const code = editor.value.trim();

    if(code===""){

        showToast("Editor is empty");

        return;

    }

    loadingOverlay.classList.remove("hidden");

    runtimeStatus.textContent = "Running...";

    runBtn.disabled = true;

    const start = performance.now();

    setTimeout(()=>{

        try{

            const result = execute(code);

            output.textContent = result;

            outputLines.textContent =
                result === "" ? 0 : result.split("\n").length;

            runtimeStatus.textContent = "Success";

        }

        catch(error){

            output.textContent =
`Runtime Error

${error.message}`;

            runtimeStatus.textContent = "Error";

        }

        const end = performance.now();

        executionTime.textContent =
            Math.round(end-start) + " ms";

        loadingOverlay.classList.add("hidden");

        runBtn.disabled = false;

        showToast("Execution Finished");

    },150);

}

// ======================================================
// DASHBOARD
// ======================================================

function updateDashboard(){

    const lines = editor.value === ""
        ? 1
        : editor.value.split("\n").length;

    lineCount.textContent = lines;

    const vars =
        editor.value.match(/\bLET\b/g);

    variableCount.textContent =
        vars ? vars.length : 0;

}

// ======================================================
// LINE NUMBERS
// ======================================================

function updateLineNumbers(){

    const total =
        editor.value === ""
        ? 1
        : editor.value.split("\n").length;

    lineNumbers.innerHTML = "";

    for(let i=1;i<=total;i++){

        lineNumbers.innerHTML +=
            i + "<br>";

    }

    lineStatus.textContent =
        "Ln " + total;

}

// ======================================================
// WELCOME SCREEN
// ======================================================

function toggleWelcome(){

    if(editor.value.trim()===""){

        welcomeScreen.style.display="flex";

    }

    else{

        welcomeScreen.style.display="none";

    }

}

// ======================================================
// LOCAL STORAGE
// ======================================================

function saveProgram(){

    localStorage.setItem(

        "tinyscript-program",

        editor.value

    );

}

function loadProgram(){

    const saved =
        localStorage.getItem(
            "tinyscript-program"
        );

    if(saved){

        editor.value = saved;

    }

}

// ======================================================
// UPLOAD
// ======================================================

function uploadProgram(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        editor.value = reader.result;

        editorChanged();

        showToast("Program Loaded");

    };

    reader.readAsText(file);

}

// ======================================================
// DOWNLOAD
// ======================================================

function downloadProgram(){

    const blob = new Blob(

        [editor.value],

        {type:"text/plain"}

    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "program.tiny";

    a.click();

    URL.revokeObjectURL(url);

    showToast("Program Downloaded");

}

// ======================================================
// COPY
// ======================================================

function copyCode(){

    navigator.clipboard.writeText(

        editor.value

    );

    showToast("Code Copied");

}

function copyOutput(){

    navigator.clipboard.writeText(

        output.textContent

    );

    showToast("Output Copied");

}

// ======================================================
// THEME
// ======================================================

function toggleTheme(){

    showToast("TinyScript is optimized for Dark Mode 🌙");

}
// ======================================================
// TOAST
// ======================================================

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// ======================================================
// SHORTCUTS
// ======================================================

function keyboardShortcuts(e){

    if((e.ctrlKey || e.metaKey) &&
        e.key==="Enter"){

        e.preventDefault();

        runProgram();

    }

    if((e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase()==="s"){

        e.preventDefault();

        downloadProgram();

    }

}