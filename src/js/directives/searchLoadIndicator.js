var searchLoadIndicator = function(){
  return {
    restrict:'A',
    template:"<div class='loading'><img src='http://flight.chinatripadvisor.com/images/loading.gif' alt='loading...'></img><h2>Querying Servers...</h2></div>",
    link:function(scope, elem, attrs){
      scope.$on('loading-started', function(e){
        elem.css({"display":''});
      });
      scope.$on('loading-complete', function(e){
        elem.css({"display": "none"});
      });
    }
  };
};

module.exports = searchLoadIndicator;