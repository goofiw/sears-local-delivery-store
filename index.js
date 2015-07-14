var koa = require('koa');
var router = require('./routes/router');
var views = require('koa-views');
var serve = require('koa-static');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');

var app = koa();

app.use(bodyParser({
  detectJSON: function (ctx) {
  return /\.json$/i.test(ctx.path);
  }
}));

app.use(views('views', {
  default: 'jade'
}));

app.use(serve(__dirname + '/dist'));

app.use(logger());

app.use(router(app));

var port = 80;
app.listen(port);
console.log('listening on ', port)
