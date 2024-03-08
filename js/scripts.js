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
    if(toppingsPrice.forEach) {
      toppingsPrice.forEach(function(value, index, array) {
        toppingsPrice += toppingPriceMap.get(element) ?? "0.99";
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

function updateToppingList() {
  let p = document.createElement("p");
  p.innerText = "No additional toppings";
  return p;
}