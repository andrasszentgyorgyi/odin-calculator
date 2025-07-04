let numbers = document.querySelector("#numbers");
let operators = document.querySelector("#operators");
let output = document.querySelector("#display");
let functionalButtons = document.querySelector("#functions");
let titleDisplayContainer = document.querySelector("#titleDisplayContainer")

function setup(){
    //clear button
    let clearDiv = document.createElement("div");
    clearDiv.className = "clear";
    clearButton = document.createElement("button");
    clearButton.textContent = "CE";
    clearButton.id = "clearButton";
    clearButton.addEventListener("click", ()=>clear());
    clearDiv.appendChild(clearButton);
    functionalButtons.appendChild(clearDiv);

    
    //setup numbers
    let numberCurrentIndex = 0;
    let numberTextContent = ["7","8","9","4","5","6","1","2","3","0",".","(-)"]
    for(let i = 0; i<4; i++){
        let row = document.createElement("div");
        row.className = "numberRow";
        for(let j = 0;j<3;j++){
            let rowElement = document.createElement("button");
            rowElement.className = "number";
            rowElement.textContent = numberTextContent[numberCurrentIndex];
            numberCurrentIndex++;
            rowElement.addEventListener("click", ()=>numberPressed(rowElement.textContent));
            row.appendChild(rowElement);
        }
        numbers.appendChild(row);
    }

    //setup operators
    let operatorCurrentIndex = 0;
    let operatorTextContent = ["%","√","x", "÷", "+", "-", "="];
    for (let i = 0; i<2; i++){
        let row = document.createElement("div");
        row.className = "operatorRow";
        for(let j = 0; j<2; j++){
            let rowElement = document.createElement("button");
            rowElement.className = "operator";
            rowElement.textContent = operatorTextContent[operatorCurrentIndex];
            operatorCurrentIndex++;
            rowElement.addEventListener("click", ()=>operatorPressed(rowElement.textContent));
            row.appendChild(rowElement);
        }
        operators.appendChild(row);
    }

    //added +,-,= buttons manually because to achieve unorthodox alignment
    let addSubtractEqualsContainerDiv = document.createElement("div");
    addSubtractEqualsContainerDiv.id = "addSubtractEquals";
    let addContainerDiv = document.createElement("div");
    let subtractEqualsContainerDiv = document.createElement("div");
    subtractEqualsContainerDiv.id = "subtractEquals";

    let addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.className = "operator";
    addButton.id = "addButton";
    addButton.addEventListener("click", ()=>operatorPressed(addButton.textContent));
    addContainerDiv.appendChild(addButton);

    let subtractButton = document.createElement("button");
    subtractButton.textContent="-";
    subtractButton.className = "operator";
    subtractButton.addEventListener("click", ()=>operatorPressed(subtractButton.textContent));
    subtractEqualsContainerDiv.appendChild(subtractButton);

    let equalsButton = document.createElement("button");
    equalsButton.textContent="=";
    equalsButton.className="operator";
    equalsButton.addEventListener("click", ()=>extractVariables());
    subtractEqualsContainerDiv.appendChild(equalsButton);

    addSubtractEqualsContainerDiv.appendChild(addContainerDiv);
    addSubtractEqualsContainerDiv.appendChild(subtractEqualsContainerDiv);
    
    operators.appendChild(addSubtractEqualsContainerDiv);

}

function add(x,y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function multiply(x,y){
    return x*y;
}

function divide(x,y){
    return x/y;
}

function numberPressed(num){
    if (num == "."){ //1 per number 
        let splitText = output.textContent.split(" ");
        if(Number.isInteger(+splitText[splitText.length-1])){
            if(!(splitText[splitText.length-1].includes("."))){
                output.textContent += ".";
            }
        }

    } else if (num == "(-)"){ //append to beginning of number currently being typed
        let splitText = output.textContent.split(" ");
        if(Number.isInteger(+splitText[splitText.length-1])){
            splitText[splitText.length-1] = "-" + splitText[splitText.length-1];
            output.textContent = splitText.join(" ");
        }

    } else {
        output.textContent += String(num);
    }
}

function operatorPressed(op) {
    let splitText = output.textContent.trim().split(" ");

    if (op === "√") {
        if (splitText.length === 1 && splitText[0] !== "") {
            let num = Number(splitText[0]);
            if (num >= 0) {
                operate(num, "√");
            } else {
                output.textContent = "Error";
            }
        }
        return;
    }

    if (splitText.length === 3 && splitText[2] !== "") {
        let result = operate(Number(splitText[0]), splitText[1], Number(splitText[2]));
        output.textContent = `${result} ${op} `;
    } else if (splitText.length === 1 && splitText[0] !== "") {
        output.textContent += ` ${op} `;
    }
}


function clear(){
    output.textContent = "";
}

function operate(number1, operator, number2) {
    let result;
    if (operator == "+") {
        result = add(number1, number2);
    } else if (operator == "-") {
        result = subtract(number1, number2);
    } else if (operator == "x") {
        result = multiply(number1, number2);
    } else if (operator == "÷") {
        result = divide(number1, number2);
    } else if (operator == "%") {
        result = number1 % number2;
    } else if (operator === "√") {
        if (number1 >= 0) {
            result = Math.sqrt(number1);
        } else {
            result = "Error";
        }
    }
    output.textContent = String(result);
    return result;
}


function extractVariables() {
    let raw = output.textContent.trim();
    let splitInput = raw.split(" ");

    if (splitInput.length === 3 && splitInput[2] !== "") {
        operate(Number(splitInput[0]), splitInput[1], Number(splitInput[2]));
    }
}

setup();
