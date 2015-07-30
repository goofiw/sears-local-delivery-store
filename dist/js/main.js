// product class
function product(sku, name, description, price,
                 cal, carot, vitc, folate, potassium, fiber) {
  this.sku = sku; // product code (SKU = stock keeping unit)
  this.name = name;
  this.description = description;
  this.price = price;
  this.cal = cal;
  this.nutrients = {
    "Carotenoid": carot,
    "Vitamin C": vitc,
    "Folates": folate,
    "Potassium": potassium,
    "Fiber": fiber
  };
}


function shoppingCart(cartName){
  this.name = cartName;
}

shoppingCart.prototype.addCheckoutParameters = function(serviceName, merchantId, options){

}

shoppingCart.prototype.addItem = function(sku, name, price, quantity){

}

shoppingCart.prototype.clearItems = function(){

}

shoppingCart.prototype.getTotalCount = function(sku){

}

shoppingCart.prototype.getTotalPrice = function(sku){

}

shoppingCart.prototype.checkout = function (serviceName, clearCart) {
  // select service
  if (serviceName == null) {
    var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
    serviceName = p.serviceName;
  }
  if (serviceName == null) {
    throw "Define at least one checkout service.";
  }
  var parms = this.checkoutParameters[serviceName];
  if (parms == null) {
    throw "Cannot get checkout parameters for '" + serviceName + "'.";
  }

  // invoke service
  switch (parms.serviceName) {
    case "PayPal":
      this.checkoutPayPal(parms, clearCart);
      break;
    case "Google":
      this.checkoutGoogle(parms, clearCart);
      break;
    default:
      throw "Unknown checkout service: " + parms.serviceName;
  }
}
// store (contains the products)
function store() {
  this.products = [
    new product("APL", "Apple", "Eat one every…", 12, 90, 0, 2, 0, 1, 2),
    new product("AVC", "Avocado", "Guacamole…", 16, 90, 0, 1, 1, 1, 2),
    new product("BAN", "Banana", "These are…", 4, 120, 0, 2, 1, 2, 2),
    // more products…
    new product("WML", "Watermelon", "Nothing…", 5, 90, 4, 4, 0, 1, 1)
  ];
  this.dvaCaption = ["Negligible", "Low", "Average", "Good", "Great" ];
  this.dvaRange = ["below 5%", "between 5 and 10%", "above 40%"];
}
store.prototype.getProduct = function (sku) {
  for (var i = 0; i < this.products.length; i++) {
    if (this.products[i].sku == sku)
      return this.products[i];
  }
  return null;
}
