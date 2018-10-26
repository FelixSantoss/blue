var cors = require('cors');

module.exports = function(app){

  app.get('/pagamentos', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });
 
  

  // use it before all route definitions
  app.use(cors({origin: 'http://127.0.0.1:3000'}));


   app.put('/pagamentos/pagamento/:id',function(req, res){
  var id = req.params.id;
   var pagamento = {}

    pagamento.id = id;
    pagamento.status = "CONFIRMADO";


    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro, resultado){
      if(erro){
        console.log('Erro ao atualizar no banco:' + erro);
        res.status(500).send(erro);
        
      } else {
      console.log('pagamento criado'+pagamento);
  
      res.status(203).json(pagamento);
      
    }
    });
   });

   app.post('/busca',function(req, res){
    var dados = req.body;
    var id =dados.id;
   
      
     var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.buscaPorId(id, function(erro, resultado){
      if(erro){
        console.log('Erro ao atualizar no banco:' + erro);
        res.status(500).send(erro);
        
      } else {
      console.log('dados encrotrado');

      if(resultado.length == 0){
        res.status(400).send('User NotFoud');

      }else{
        res.status(200).send(resultado);

      }
  
      
    }
    });
     


     });

   app.put('/pagamentos/lista',function(req, res){
    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);
    pagamentoDao.lista(function(erro, resultado){
      if(erro){
        console.log('Erro :' + erro);
        res.status(500).send(erro);
        
      } else {
       
  
      res.json(resultado);
      
    }
    });
   });
 
   
  app.post('/pagamentos/pagamento', function(req, res){

    req.assert("forma_de_pagamento",
        "Forma de pagamento eh obrigatorio").notEmpty();
    req.assert("valor",
      "Valor eh obrigatorio e deve ser um decimal")
        .notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    var pagamento = req.body;
    console.log('processando uma requisicao de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date;
      
    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        res.status(400).send(erro);
        
      } else {
      console.log('pagamento criado'+pagamento);
 
       res.location('/pagamentos/pagamento/' +
            resultado.insertId);

      res.status(201).json(pagamento);
      
    }
    });
  });
}
