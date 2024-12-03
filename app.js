const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn =  document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr =  document.querySelector(".to select");
const mssg = document.querySelector(".mssg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    // *Below, the first argument "change" specifies the type of event to listen for. In this case, it is the "change" event, which fires when the user selects a different option from the dropdown list.
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); //Passes the element that triggered the event to updateFlag
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue <1){
        amtValue = 1;
        amount.value = "1";
    }
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    // see below explanation for using [] brackets
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amount.value*rate; 
    mssg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]; //* IN, SR
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// * below explanation
window.addEventListener("load", () => {
    updateExchangeRate();
});

//*event.target (often abbreviated as evt.target or e.target) refers to the element that triggered the event. When an event, such as a click or change, occurs, an event object is created and passed to the event handler. This event object contains various properties and methods related to the event, and target is one of these properties.

// *event Object: When an event occurs, the browser creates an event object that contains information about the event. This object is automatically passed as an argument to the event handler function.

// *target Property: The target property of the event object refers to the DOM element that triggered the event. It is the element on which the event originally occurred.

// * Explanation of using [] brackets-
// *below, Square brackets are used to access properties of an object dynamically in JavaScript. When you use dot notation (.), you must know the exact property name. However, when you need to access a property using a variable, you use square brackets.
/* let data = {
    usd: { inr: 74.85, eur: 0.85 },
    eur: { usd: 1.18, inr: 88.20 }
};
let fromCurrency = 'usd';
let toCurrency = 'inr';
console.log(data[fromCurrency][toCurrency]); // 74.85   */

// *