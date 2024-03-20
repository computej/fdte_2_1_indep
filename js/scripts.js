//Business

class Pizza {
  constructor(toppings, size) {
    this.toppings = toppings;
    this.size = size;
  }
  getPrice() {
    const sizePrice = sizePriceMap.get(this.size);
    let toppingsPrice = 0;
    debugger;
    //make sure it's an array
    if(this.toppings.forEach) {
      this.toppings.forEach(function(value, index, array) {
        toppingsPrice += toppingPriceMap.get(value) ?? "0.99";
      });
    } 
    return sizePrice + toppingsPrice;
  }
}

let toppingList = new Array(0);
let pizzaSize = "small";
let pizzaList = new Array(0);

const sizePriceMap = new Map([
  ["small",3.99],
  ["medium",4.99],
  ["large",5.99],
]);

const toppingPriceMap = new Map([
  ["pepperoni",0.99],
  ["mushrooms",1.09],
  ["tomatoes",0.99],
  ["red peppers",1.09],
  ["asiago",1.09],
  ["ground beef",1.19],
]);

function getNewToppingList() {
  let outElement;
  if(toppingList && toppingList.length > 0) {
    outElement = document.createElement("ol");
    toppingList.forEach(function(value) {
      let li = document.createElement("li");
      li.innerText = value;
      outElement.append(li);
    });
  }
  else {
    outElement = document.createElement("p");
    outElement.innerText = "No additional toppings";
  }
  return outElement;
}

//UI

function orderSubmitAction(whatToShow) {
  //just pretend
  let orderInfoDiv = document.querySelector("#order-info");
  let orderSubmittedDiv = document.querySelector("#order-submited");
  orderInfoDiv.style.display = whatToShow ? "none" : "flex";
  //must preserve properties of BS's .row
  orderSubmittedDiv.style.display = whatToShow ? "flex": "none";
}

//TODO: For each pizza, display its toppings

function updateToppingList() {
  const toppingElement = getNewToppingList();
  let toppingListID = document.getElementById("topping-list");
  toppingListID.innerHTML = "";
  toppingListID.append(toppingElement);
}

function toppingButtonPressed(event) {
  const selectedTopping = event.target.getAttribute("data-topping");
  if(toppingList.length < 3) {
    toppingList.push(selectedTopping);
  }
  updateToppingList();
}

function toppingRemoveButtonPressed(event) {
  if (toppingList.length > 0) {
    toppingList.pop();
  }
  updateToppingList();
}

window.addEventListener("load",function() {
  let toppingAddButtons = document.querySelectorAll(".topping-add-button");
  toppingAddButtons.forEach(function(element, index, array){
    element.addEventListener("click", toppingButtonPressed);
  });
  let toppingRemoveButton = document.querySelector(".topping-remove-button");
  toppingRemoveButton.addEventListener("click", toppingRemoveButtonPressed);

  let placeOrderButton = this.document.getElementById("place-order-button")
  placeOrderButton.addEventListener("click", function(event) {
    orderSubmitAction(true);
  });
  
  let closSubmittedButton = this.document.getElementById("close-submitted-button")
  closSubmittedButton.addEventListener("click", function(event) {
    orderSubmitAction(false);
  });
});