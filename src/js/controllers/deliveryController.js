  

function deliveryController($scope, $routeParams, $http, $interval) {
  console.log($routeParams);
  var updateCourierLocation = function(location){
    $scope.courierMarker.setPosition(location);
    $scope.map.panTo(location);
  }

  var mapInit = function(){
    var mapProp = {
      center: new google.maps.LatLng($scope.update.courier.location.lat, $scope.update.courier.location.lng),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("deliveryMap"), mapProp);
    var dropoffMarker = new google.maps.Marker({
      position: new google.maps.LatLng($scope.update.dropoff.location.lat, $scope.update.dropoff.location.lng),
      map: $scope.map,
      title: $scope.update.dropoff.name
    });   
//fix theeeeseeee
    var pickupMarker = new google.maps.Marker({
      position: new google.maps.LatLng($scope.update.pickup.location.lat, $scope.update.pickup.location.lng),
      map: $scope.map,
      title: $scope.update.dropoff.name
    });   

    var courierImage = {
      url: $scope.update.courier.img_href,
      scaledSize: new google.maps.Size(20,20),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(10,10)
    }
    $scope.courierMarker = new google.maps.Marker({
      position: new google.maps.LatLng($scope.update.courier.location.lat, $scope.update.courier.location.lng),
      map: $scope.map,
      title: $scope.update.courier.name,
      icon: courierImage
    });   
  }
  var refreshDelivery = function(id) {
    var url = '/update?delivery_id='.concat(id);
    var promise = $interval(function(){

      $http({
        url: '/apiCall/',
        data: {data: url},
        method: 'POST'
      })
      .then(function(resp) {
        $scope.update = resp.data;
        if (resp.data.courier){
          console.log($scope.update.courier.name);//outputs correct name
          if ($scope.map){
            var courierLocation = new google.maps.LatLng($scope.update.courier.location.lat, $scope.update.courier.location.lng)
            updateCourierLocation(courierLocation);;
          } else {
            mapInit();
            google.maps.event.addDomListener(window, 'load', mapInit);
          }
        }
        //stops when complete
        if ($scope.update.complete){
          $interval.cancel(promise);
        }
      })
    }, 5000 );
  }
  refreshDelivery($routeParams.id);
}

module.exports = deliveryController;