var express = require('express');//trata da requisiçoes http
var consign = require('consign');//empacota todas as pasta e coloca dentro do APP
var bodyParser = require('body-parser');// intepreta para o express a saida do borde e da um parser
var expressValidator = require('express-validator');//adiciona validação
var cors = require('cors');
var helmet = require('helmet');
module.exports = function(){
  var app = express();
  app.set('view engine','ejs');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());
  app.use(cors());
  app.use(helmet());
  app.use(express.static('public'))



  consign()
   .include('controllers')
   .then('persistencia')
   .into(app);

  return app;
}
