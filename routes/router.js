var request = require('koa-request');
function route(app) {
  var router = require('koa-router')(app);

  router.get('/', function *(next) {
    yield this.render('default'); 
  })

  router.post('/apiCall', function*(next, response) {
    console.log(this.request.body.data);
    var dropOffUrl = 'http://goofiw-test.apigee.net/sears-local-delivery'.concat(this.request.body.data);
    var requestOptions = {
      url: dropOffUrl,
    }
    var apiResponse = yield request(requestOptions);
    console.log(apiResponse.body);
    this.response.body = apiResponse.body;
  })

  return router.routes();
}

module.exports = route;
