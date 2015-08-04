function storeController($scope, $routeParams, $http, $interval, DataService) {

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
    var responseObject;
    console.log('in search');
    $http({
      url:'/apiCall', 
      data: {data: '/products?keyword=' + query + '&latlong=36.125962,-115.211263'},
      method: 'POST'
    })
    .then(function(response){
      responseObject = response.data.data;
      responseObject.forEach(function(data){
        var productData = {
          sku: data.Id.SkuPartNumber,
          productName: data.Description.Name,
          desc: data.Description.BrandName,
          price: data.Price.DisplayPrice,
          url: data.Description.ImageURL,
          storeNumber: data.StoreNumber
        }
        var temp = new product(productData)
        $scope.store.addProduct(temp)
      });
    });
  }

  $scope.getDeliveryQuote = function(){
    var responseObject;
    $scope.quoted = false;
    var storeNumber = $scope.cart.items[0].storeNumber
    console.log($scope.cart.items[0].storeNumber);
    var url = '/delivery_quote?drop_off_latlong=36.125962,-115.211263&pickup_store_number='.concat(storeNumber);
    $http({
      url: '/apiCall/',
      data: {data: url},
      method: 'POST'
    })
    .then(function(response){
      $scope.quoted = true;
      console.log(response.data.id);
      $scope.quote = response.data.fee;
      $scope.quoteId = response.data.id
    })
  }

  $scope.submitOrder = function(){
    var url = '/submit_delivery?drop_off_latlong=36.125962,-115.211263&pickup_store_number=0001709&manifest=puppies&phone_number=555-555-5555&quote_id=' + $scope.quoteId + '&customer_name=Arnold';
    $http({
      url: '/apiCall/',
      data: {data: url},
      method: 'POST'
    })
    .then(function(response){
      console.log(response);
      $scope.deliveryId = response.data.id;
      $scope.refreshDelivery();
      window.location.href='/#/delivery';
    })
  }

  $scope.refreshDelivery = function() {
    var url = '/update?delivery_id='.concat($scope.deliveryId);
    var promise = $interval(function(){
      $http({
        url: '/apiCall/',
        data: {data: url},
        method: 'POST'
      })
      .then(function(resp) {
        $scope.update = resp.data;
        if (resp.data.courier){
          $scope.update.courier = resp.data.courier;
          console.log($scope.update.courier.name);//outputs correct name
          $scope.$apply();
        }
        //stops when complete
        if ($scope.update.complete){
          $interval.cancel(promise);
        }
      })
    }, 5000 );
  }
}

module.exports = storeController;