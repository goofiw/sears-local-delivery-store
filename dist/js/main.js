// product class
function product(data) {
  this.sku = data.sku; // product code (SKU = stock keeping unit)
  this.productName = data.productName;
  this.description = data.desc;
  this.price = data.price;
  this.url = data.url;
  this.storeNumber = data.storeNumber;
};



function shoppingCart(cartName){
  this.name = cartName;
  this.items = [];
}

shoppingCart.prototype.addCheckoutParameters = function(serviceName, merchantId, options){

}

shoppingCart.prototype.addItem = function(sku, name, price, quantity, storeNumber){
  var update = false;
  console.log(name);
  if (this.items.length < 1) {
    this.items.push({sku: sku, name: name, price: price, quantity: quantity, storeNumber: storeNumber});
    update = true;
  } else {
    for (var i = 0; i < this.items.length; i++){
      if (this.items[i].sku == sku){
        this.items[i].quantity += quantity;
        update = true;
        break;
      }
    }
  }
  if (!update){
    this.items.push({sku: sku, name: name, price: price, quantity: quantity, storeNumber: storeNumber});
  }
}

shoppingCart.prototype.clearItems = function(){
  this.items = [];
}

shoppingCart.prototype.getTotalCount = function(sku){
  var quantity = 0;
  if (this.items.length > 0){
    if(sku){
      this.items.forEach(function(item) {
        if (item.sku == sku){
          quantity = item.quantity;
        }
      })
    }
    quantity = this.items.reduce(function(total, item){
      return total + item.quantity;
    }, 0);
  }
  return quantity;
}

shoppingCart.prototype.getTotalPrice = function(sku){
  var total = 0;
  if (this.items.length > 0){
    if(sku){
      total = this.items.forEach(function(item) {
        if (item.sku == sku){
          total = item.quantity * item.price;
        }
      })
    }
    total = this.items.reduce(function(total, item){
      return total + item.quantity * item.price;
    }, 0);
  }
  return total;
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
  this.products = [];
}
store.prototype.getProduct = function (sku) {
  for (var i = 0; i < this.products.length; i++) {
    if (this.products[i].sku == sku)
      return this.products[i];
  }
  return null;
}

store.prototype.addProduct = function(product){
  this.products.push(product);
}

store.prototype.clearProducts = function(product) {
  this.products = [];
}
