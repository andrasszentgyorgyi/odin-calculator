let numbers = document.querySelector("#numbers");
let operators = document.querySelector("#operators");
let output = document.querySelector("#display");

function setup(){
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
    addContainerDiv.appendChild(addButton);

    let subtractButton = document.createElement("button");
    subtractButton.textContent="-";
    subtractButton.className = "operator";
    subtractEqualsContainerDiv.appendChild(subtractButton);

    let equalsButton = document.createElement("button");
    equalsButton.textContent="=";
    equalsButton.className="operator";
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

function operate(number1, operator, number2){
    console.log(number1);
    console.log(number2);
    console.log(operator);
    if(operator == "+"){
        output.textContent = String(add(number1,number2));
    } else if (operator == "-"){
        output.textContent = String(subtract(number1,number2));
    } else if (operator == "x"){
        output.textContent = String(multiply(number1,number2));
    } else if (operator == "÷"){
        output.textContent = String(divide(number1,number2));
    }
}

function extractVariables(){
    let raw = display.textContent;
    let splitInput = raw.split(" ");
    console.log(splitInput);
    operate(Number(splitInput[0]),String(splitInput[1]),Number(splitInput[2]));
}

setup();