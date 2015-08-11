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
