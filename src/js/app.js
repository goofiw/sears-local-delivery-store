// App Module: the name AngularStore matches the ng-app attribute
// in the main <html> tag. The route provides parses the URL and
// injects the appropriate partial page
var storeController = require('./controllers/storeController'),
    deliveryController = require('./controllers/deliveryController');



var storeApp = angular.module('AngularStore', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/store', { 
      templateUrl: 'views/store.html',
      controller: storeController }).
    when('/products/:productSku', {
      templateUrl: 'views/product.html',
      controller: storeController }).
    when('/cart', { 
      templateUrl: 'views/shoppingCart.html',
      controller: storeController }).
    when('/delivery/:id', {
      templateUrl: 'views/delivery.html',
      controller: deliveryController }).
    otherwise({
      redirectTo: '/store' });
}])
  .controller('storeController', storeController);
// create a data service that provides a store and a shopping
// cart that will be shared by all views
// (instead of creating fresh ones for each view).
storeApp.factory("DataService", function() {
  var myStore = new store();
  var myCart = new shoppingCart("AngularStore");
  myCart.addCheckoutParameters("PayPal", "your rayPal merchant account id");
  myCart.addCheckoutParameters("Google", "your Google merchant account id ", {
    ship_method_name_1: "UPS Next Day Air",
    ship_method_price_1: "20.00",
    ship_method_currency_1: "USD",
    ship_method_name_2: "UPS Ground",
    ship_method_price_2: "15.00",
    ship_method_currency_2: "USD"
  });
  function mapInit() {

  }
  return {
    store: myStore,
    cart: myCart,
    map: mapInit
  };
});