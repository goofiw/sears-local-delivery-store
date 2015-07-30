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