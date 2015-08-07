var searchLoadIndicator = function(){
  return {
    restrict:'A',
    template:"<img class='loading' src='http://media.giphy.com/media/l4eA8oZpx71oQ/giphy.gif' alt='loading...'></img>",
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