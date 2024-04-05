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
  if (list && list.forEach) {
    //TODO: Correct capitalization
    //
    // <size> Pizza ($n.nn)
    // Ͱ N toppings: A, B

    outElement = document.createElement("ol");
    list.forEach(function(value, index, array) {
      let ul = document.createElement("ul");
      let outText = (value.size).toString().concat(" Pizza ($",value.getPrice(),")"); 
      let ul_li = document.createElement("li");
      ul_li.innerText = outText;
      ul.append(ul_li);
      ul_li = document.createElement("li");

      let ol_li = document.createElement("li");
      ol_li.append(ul);
      outElement.append(ol_li);

    });
  }
  else {
    outElement.innerText = "Nothing to order."
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

function updatePizzasList(list) {
  let pizzaListDiv = document.getElementById("pizza-list");
  pizzaListDiv.innerHTML = "";
  pizzaListDiv.append(getNewPizzasElement(list));
}

function pizzaAddButtonPressed(event, pizza, list) {
  const asdf = new Pizza(pizza.toppings, pizza.size);
  pizza = null;
  pizza = new Pizza([],"small");
  if(!list.keys) {
    throw new Error("What's an array doing here? This is for maps only!");
    return;
  }
  list.set(list.size,asdf);
  updatePizzasList(list);
}

function updateToppingList(pizza) {
  const toppingElement = getNewToppingElement(pizza);
  let toppingListID = document.getElementById("topping-list");
  toppingListID.innerHTML = "";
  toppingListID.append(toppingElement);
}

function toppingButtonPressed(event, intoppings) {
  const selectedTopping = event.target.getAttribute("data-topping");
  if(intoppings.length < 3) {
    intoppings.push(selectedTopping);
  }
  updateToppingList(intoppings);
}

function removePizzaButtonPressed(event, listOfPizza) {
  if (listOfPizza.length > 0) {
    listOfPizza.pop();
  }
  updatePizzasList(listOfPizza);
}

function toppingRemoveButtonPressed(event, inpizza) {
  if (inpizza.toppings.length > 0) {
    inpizza.toppings.pop();
  }
  updateToppingList(inpizza);
}

// Debug

window.addEventListener("load",function() {
  //TODO: fix serious bug where all pizzas get the exact same toppings
  let nextPizza = new Pizza([], "small");
  //TODO: fix functions because I changed this to a Map
  let pizzaList = new Map();

  let toppingAddButtons = document.querySelectorAll(".topping-add-button");
  toppingAddButtons.forEach(function(element, index, array){
    element.addEventListener("click", function(event){
      toppingButtonPressed(event, nextPizza.toppings);
      console.table(pizzaList)
    });
  });

  let toppingRemoveButton = document.querySelector(".topping-remove-button");
  toppingRemoveButton.addEventListener("click", function(event){
      toppingRemoveButtonPressed(event, nextPizza);
      console.table(pizzaList)
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
    nextPizza.size = document.getElementById("pizza-size-selector").value;
    pizzaAddButtonPressed(event, nextPizza, pizzaList);
    //destroy any pointers to the original object
    //to not have stupid behavior
    delete nextPizza;
    nextPizza = new Pizza([], "small");
    console.table(pizzaList);
  });
});