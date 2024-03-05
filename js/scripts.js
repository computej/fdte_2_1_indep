class Pizza {
  constructor(toppings, size) {
    this.toppings = toppings;
    this.size = size;
  }
  getPrice() {
    const sizePrice = sizePriceMap.get(this.size);
    let toppingsPrice = 0;
    debugger;
    this.toppings.forEach(function(element) {
      toppingsPrice += toppingPriceMap.get(element) ?? "0.99";
    });
    return sizePrice + toppingsPrice;
  }
}