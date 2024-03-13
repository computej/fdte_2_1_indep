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