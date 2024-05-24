//Business

class Pizza {
  constructor(toppings, size = "small") {
    this.toppings = toppings;
    this.size = size;
  }
  getPrice() {
    const sizePrice = sizePriceMap.get(this.size);
    let toppingsPrice = 0;
    //make sure it's an array
    if(this.toppings.forEach) {
      this.toppings.forEach(function(value) {
        toppingsPrice += toppingPriceMap.get(value) ?? 0.99;
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

function getNewToppingElement(toppingList) {
  let outElement;
  if(toppingList && toppingList.length > 0) {
    outElement = document.createElement("ol");
    toppingList.forEach(function(value) {
      let li = document.createElement("li");
      li.innerText = value;
      outElement.append(li);
    });
  } else {
    outElement = document.createElement("p");
    outElement.innerText = "No additional toppings";
  }
  return outElement;
}

function getNewPizzasElement(listOfPizza) {
  let outElement = document.createElement("p");
  if (listOfPizza && listOfPizza.size > 0) {
    outElement = document.createElement("ol");
    listOfPizza.forEach(function(value) {
      let ul = document.createElement("ul");
      let outText = (value.size).toString().concat(" Pizza ($",value.getPrice().toString().substring(0,4),")"); 
      let ulLi = document.createElement("li");
      ulLi.innerText = outText;
      ul.append(ulLi);
      ulLi = document.createElement("li");

      let olLi = document.createElement("li");
      olLi.append(ul);
      outElement.append(olLi);

    });
  } else {
    outElement.innerText = "Nothing to order."
  }
  return outElement;
}

//UI

function orderSubmitAction(submittedOrInfo) {
  let orderInfoDiv = document.querySelector("#order-info");
  let orderSubmittedDiv = document.querySelector("#order-submitted");
  orderInfoDiv.style.display = submittedOrInfo ? "none" : "flex";
  orderSubmittedDiv.style.display = submittedOrInfo ? "flex": "none";
}

function updatePizzasList(list) {
  const pizzasElement = getNewPizzasElement(list);
  let pizzaListDiv = document.getElementById("pizza-list");
  pizzaListDiv.innerHTML = "";
  pizzaListDiv.append(pizzasElement);
}

function pizzaAddButtonPressed(pizza, listMap) {
  const newPizza = new Pizza(pizza.toppings, pizza.size);
  if(!listMap.keys) {
    throw new Error("pizzaAddButtonPressed: Received an Array instead of expected Map");
  }
  listMap.set(listMap.size,newPizza);
  updatePizzasList(listMap);
}

function updateToppingList(pizza) {
  const toppingElement = getNewToppingElement(pizza);
  let toppingListID = document.getElementById("topping-list");
  toppingListID.innerHTML = "";
  toppingListID.append(toppingElement);
}

function toppingButtonPressed(event, toppingList) {
  const selectedTopping = event.target.getAttribute("data-topping");
  if(toppingList.length < 3) {
    toppingList.push(selectedTopping);
  }
  updateToppingList(toppingList);
}

function removePizzaButtonPressed(listOfPizza) {
  if (listOfPizza.size > 0) {
    listOfPizza.delete(listOfPizza.size - 1);
  }
  updatePizzasList(listOfPizza);
}

function toppingRemoveButtonPressed(targetPizza) {
  if (targetPizza.toppings.length > 0) {
    targetPizza.toppings.pop();
  }
  updateToppingList(targetPizza);
}

window.addEventListener("load",function() {
  let nextPizza = new Pizza([], "small");
  let pizzaList = new Map();

  let toppingAddButtons = document.querySelectorAll(".topping-add-button");
  toppingAddButtons.forEach(function(element){
    element.addEventListener("click", function(event){
      toppingButtonPressed(event, nextPizza.toppings);
    });
  });

  let toppingRemoveButton = document.querySelector(".topping-remove-button");
  toppingRemoveButton.addEventListener("click", function(){
      toppingRemoveButtonPressed(nextPizza);
  });

  let placeOrderButton = this.document.getElementById("place-order-button")
  placeOrderButton.addEventListener("click", function() {
    if(pizzaList.size > 0) {
      orderSubmitAction(true);
    }
  });
  
  let closSubmittedButton = this.document.getElementById("close-submitted-button")
  closSubmittedButton.addEventListener("click", function() {
    orderSubmitAction(false);
  });

  let pizzaAddButton = document.querySelector(".pizza-add-button");
  pizzaAddButton.addEventListener("click", function() {
    nextPizza.size = document.getElementById("pizza-size-selector").value;
      pizzaAddButtonPressed(nextPizza, pizzaList);
      delete nextPizza;
      nextPizza = new Pizza([], "small");
      updateToppingList(nextPizza);
  });
  let pizzaRemoveButton = this.document.getElementById("remove-pizza-button");
  pizzaRemoveButton.addEventListener("click", function() {
    removePizzaButtonPressed(pizzaList);
  });
});