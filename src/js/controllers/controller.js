function storeController($scope, $routeParams, $http, DataService) {

  // get store and cart from service
  $scope.store = DataService.store;
  $scope.cart = DataService.cart;
  $scope.mapInit = DataService.mapInit;

  // use routing to pick the selected product
  if ($routeParams.productSku != null) {
    $scope.product = $scope.store.getProduct($routeParams.productSku);
  }

  // var locationOptions = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0
  // }

  // navigator.geolocation.getCurrentPosition(function(pos){
  //   var mapOptions = {
  //     center: { lat: pos.coords.latitude, lng: pos.coords.longitude},
  //     zoom: 13
  //   };
  //   var map = new google.maps.Map(document.getElementById('map'),
  //       mapOptions);
  // });

  $scope.search = function(query){
    console.log('in search');
    $http({
      url:'/apiCall', 
      data: {data: '/products?keyword=' + query + '&latlong=47.6568777,-122.3159348'},
      method: 'POST'
    })
    .then(function(response){
      responseObject = response.data.data;
      responseObject.forEach(function(data){
        var productData = {
          sku: data.Id.SkuPartNumber,
          name: name,
          description: data.Description.Name,
          price: data.Price.DisplayPrice,
          url: data.Description.ImageURL
        }
        var temp = new product(productData)
        $scope.store.addProduct(temp)
      });
    });
  }
}

module.exports = storeController;