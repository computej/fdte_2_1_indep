//Business

class Pizza {
  constructor(toppings, size) {
    this.toppings = toppings;
    this.size = size;
  }
  getPrice() {
    const sizePrice = sizePriceMap.get(this.size);
    let toppingsPrice = 0;
    //make sure it's an array
    if(this.toppings.forEach) {
      this.toppings.forEach(function(value, index, array) {
        toppingsPrice += toppingPriceMap.get(value) ?? "0.99";
      });
    } 
    return sizePrice + toppingsPrice;
  }
}

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

function getNewToppingElement(asdf) {
  let outElement;
  if(asdf && asdf.length > 0) {
    outElement = document.createElement("ol");
    asdf.forEach(function(value) {
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

function getNewPizzasElement(list) {
  let outElement = document.createElement("p");
  outElement.innerText = "Nothing to order."
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

function updatePizzasList(list) {
  let pizzaListDiv = document.getElementById("pizza-list");
  pizzaListDiv.innerHTML = "";
  pizzaListDiv.append(getNewPizzasElement());
}

function pizzaAddButtonPressed(event, list, toppings, size) {
  let newPizza = new Pizza(toppings, size);
  console.log(newPizza);
  list.push(newPizza);
  updatePizzasList(list);
}

function updateToppingList(list) {
  const toppingElement = getNewToppingElement(list);
  let toppingListID = document.getElementById("topping-list");
  toppingListID.innerHTML = "";
  toppingListID.append(toppingElement);
}

function toppingButtonPressed(event, list) {
  const selectedTopping = event.target.getAttribute("data-topping");
  if(list.length < 3) {
    list.push(selectedTopping);
  }
  updateToppingList(list);
}

function toppingRemoveButtonPressed(event, list) {
  if (list.length > 0) {
    list.pop();
  }
  updateToppingList(list);
}

window.addEventListener("load",function() {
  let toppingList = new Array(0);
  //TODO: Buttons for changing size, changes an attribute in the add to order button
  let nextPizzaSize = "small";
  let pizzaList = new Array(0);

  let toppingAddButtons = document.querySelectorAll(".topping-add-button");
  toppingAddButtons.forEach(function(element, index, array){
    element.addEventListener("click", function(event){
      toppingButtonPressed(event, toppingList);
    });
  });

  let toppingRemoveButton = document.querySelector(".topping-remove-button");
  toppingRemoveButton.addEventListener("click", function(event){
    toppingRemoveButtonPressed(event, toppingList);
  });

  let placeOrderButton = this.document.getElementById("place-order-button")
  placeOrderButton.addEventListener("click", function(event) {
    orderSubmitAction(true);
  });
  
  let closSubmittedButton = this.document.getElementById("close-submitted-button")
  closSubmittedButton.addEventListener("click", function(event) {
    orderSubmitAction(false);
  });

  let pizzaAddButton = document.querySelector(".pizza-add-button");
  pizzaAddButton.addEventListener("click", function(event) {
    pizzaAddButtonPressed(event, pizzaList, toppingList, nextPizzaSize);
  });
});