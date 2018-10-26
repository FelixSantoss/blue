var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localohost',//mysql556.umbler.com
			user: 'root',//felixsantos
			password: '',//felix5526
			database: 'cadastro'//qwertyuiop
		});
}

module.exports = function() {
	return createDBConnection;
}
