function CadastroMysql(connection) {
    this._connection = connection;
}

CadastroMysql.prototype.salva = function(usuario,callback) {
    this._connection.query('INSERT INTO usuarios SET ?', usuario, callback);
}

CadastroMysql.prototype.atualiza = function(pagamento,callback) {
    this._connection.query('UPDATE pagamentos SET status = ? where id = ?', [pagamento.status, pagamento.id], callback);
}

CadastroMysql.prototype.lista = function(callback) {
    this._connection.query('select * from pagamentos',callback);
}

CadastroMysql.prototype.consulta = function (usuario,callback) {
    this._connection.query("select * from usuarios where usuario = ?",usuario,callback);
}

module.exports = function(){
    return CadastroMysql;
};
