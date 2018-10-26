
module.exports = function (app) {

    app.post('/regiter', function (req, res) {
        var dadosenviado = req.body;
        var connection = app.persistencia.connectionFactory();
        var cadastroMysql = new app.persistencia.CadastroMysql(connection);

        {//validação

            req.assert("usuario", "Não pode esta vazia").notEmpty();
            req.assert("email", "Não pode esta vazia").notEmpty();

            var erros = req.validationErrors();
        }
        {// pesistindo

            if (erros) {
                console.log('foi encrotrado erro no formulario!');
                res.status(400).json(erros)
                return;
            }
            else {

                cadastroMysql.salva(dadosenviado, function (erro, resultado) {
                    if (erro) {
                        console.log('Erro ao inserir no banco:' + erro);
                        res.status(400).send(erro);

                    } else {
                        console.log('cadastrado com sucessor');
                        res.status(201);
                        res.redirect('/regiterok');
                    }
                });
            }

        }
    })//end method post



    //API verifica se exiti usuario
    app.post('/veriregiter', function (req, res) {
        var dadosenviado = req.body;
        var connection = app.persistencia.connectionFactory();
        var cadastroMysqll = new app.persistencia.CadastroMysql(connection);

        {//validação


            var usuario = dadosenviado.usuario;
        }
        {// pesistindo


             cadastroMysqll.consulta(usuario, function (erro, resultado) {
                if (erro) {
                    console.log('erro interno');
                     res.json(resultado)

                } else {
                    if (resultado.length == 0) {
                        res.json(0)

                    }
                    else {
                        res.json(1)

                    }


                }
            });


        }

    })//end method post




















}//end module





