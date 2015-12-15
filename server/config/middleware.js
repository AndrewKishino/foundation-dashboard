var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {
  // set up basic middleware
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname + '/../../client')));

  // app.all('/*', function(req, res, next) {
  //     res.sendFile(path.join(__dirname + '/../../client'), { root: __dirname });
  // });

  // define routers
  var usersRouter = express.Router();
};