var koa = require('koa');
var router = require('./routes/router');
var views = require('koa-views');
var serve = require('koa-static');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');

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

app.use(cors({origin: 'http://ajax.googleapis.com'}))
app.use(router(app));

var port = 3000;
app.listen(port);
console.log('listening on ', port)
