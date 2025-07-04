let numbers = document.querySelector("#numbers");
let operators = document.querySelector("#operators");
let output = document.querySelector("#display");
let functionalButtons = document.querySelector("#functions");

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

function numberPressed(num){ //TODO: add logic for . and (-)
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

function operatorPressed(op){
    output.textContent += ` ${op} `;
}

function clear(){
    output.textContent = "";
}

function operate(number1, operator, number2){
    if(operator == "+"){
        output.textContent = String(add(number1,number2));
    } else if (operator == "-"){
        output.textContent = String(subtract(number1,number2));
    } else if (operator == "x"){
        output.textContent = String(multiply(number1,number2));
    } else if (operator == "÷"){
        output.textContent = String(divide(number1,number2));
    } else if (operator == "%"){
        output.textContent = String(number1 % number2);
    } else if (operator == "√"){ //fix this
        if(!number2){
            output.textContent = String(Math.sqrt(number1))
        }
    }
}

function extractVariables(){
    let raw = display.textContent;
    let splitInput = raw.split(" ");
    operate(Number(splitInput[0]),String(splitInput[1]),Number(splitInput[2]));
}

setup();

//TODO: make sure text doesn't go offscreen (limit characters maybe)
//you can only put 1 decimal dot
//