function storeController($scope, $routeParams, DataService) {

  // get store and cart from service
  $scope.store = DataService.store;
  $scope.cart = DataService.cart;
  $scope.mapInit = DataService.mapInit;

  // use routing to pick the selected product
  if ($routeParams.productSku != null) {
    $scope.product = $scope.store.getProduct($routeParams.productSku);
  }
  var mapOptions = {
    center: { lat: -34.397, lng: 150.644},
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
}

module.exports = storeController;