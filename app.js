var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var myConnection  = require('express-myconnection');

// Require Các routes
var book = require('./server/routes/book');
var products = require('./server/routes/products/index');
var productstype = require('./server/routes/productstype/index');
var promotionDetails = require('./server/routes/promotionDetails/index');
var taxes = require('./server/routes/taxes/index');
var bills = require("./server/routes/bills/index");
var productOrder = require("./server/routes/product_order/index");
var users = require('./server/routes/users/index');
var permission = require('./server/routes/permission/index');

var app = express();

// Cấu hình và middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Cấu hình kết nối database
var config = require('./server/constants/config');
var dbOptions = {
    connectionLimit: config.database.connectionLimit,
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port,
    database: config.database.db
}

app.use(myConnection(mysql, dbOptions, 'pool'));
// Cài đặt các api
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);
app.use('/products', products);
app.use('/productstype', productstype);
app.use('/promotiondetails', promotionDetails);
app.use('/taxes', taxes);
app.use("/bills",bills);
app.use("/product-order",productOrder);
app.use('/users', users);
app.use('/permission', permission);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

module.exports = app;
