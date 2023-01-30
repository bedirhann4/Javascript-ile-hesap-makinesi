const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}
keys.addEventListener("click", function(event){
    const element = event.target;  // tıklanan elemanın html elementi

    if(!element.matches("button")) return; //matches karakter araması yapar

    if(element.classList.contains("operator")){  //classList'in içinde "operator"'ü arıyor
        // console.log("operator: ", element.value);  
        handleOperator(element.value);  //tıklanan elemanın hangi operator olduğu gönderildi
        updateDisplay();
        return;
    }
    if (element.classList.contains("decimal")) {
        // console.log("decimal: ", element.value);
        inputDecimal();
        updateDisplay();
        return;
    }
    if (element.classList.contains("clear")) {
        // console.log("clear: ", element.value);
        clear();
        updateDisplay();
        return;
    }
    inputNumber(element.value);
    updateDisplay();
});
//+, -, *, / 'ye tıklandığında
function handleOperator(clickOperator){ //clickOperator -> +, -, *, /
    const value = parseFloat(displayValue); //value = ekrandaki değer

    if(operator && waitingForSecondValue){
        operator = clickOperator;
        return;
    }
    if(firstValue === null){ 
        firstValue = value;  //clickOperator olduğunda şimdiye kadarki değeri firstValue'ya at
    }else if(operator !== null){
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(2))}`;  //eşittirden sonra sonucu ekranda string olarak yaz
        firstValue = result; //hesap işlemine devam etmek için sonucu tekrar first value ya at 
    }
    waitingForSecondValue = true;
    operator = clickOperator; 

    console.log(displayValue, firstValue, value, operator, waitingForSecondValue);
}
function calculate(first, second, operator){
    if(operator === "+"){
        return first + second;
    }else if (operator === "-"){
        return first - second;
    }else if(operator === "*"){
        return first * second;
    }else if(operator === "/"){
        return first / second;
    }
    return second;
}
function inputNumber(number){ //sayı //sayının display kısmında gözükmesi 
    if (waitingForSecondValue) { 
        displayValue = number;
        waitingForSecondValue = false;
    }else{
        displayValue = displayValue === "0" ? number: displayValue + number; //sayının ekranda gözükmesi
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}
function inputDecimal(){ //decimal ondalık demek (yani(.))
    if(displayValue.includes(".")) return;
    displayValue += ".";
}
function clear(){
    displayValue = "0";
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}