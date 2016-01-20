var express = require('express'),
	app = express(),
	path = require('path');

app.get('/',function(req,res){
	//res.send('Server created');
	console.log(__dirname + '/index.html');
	res.sendFile(path.join(__dirname + '/StoreTransfer/Apps/StoreTransfer/index.html'));
})

/*app.get('*',function(req,res){
	res.redirect('/');
})

//app.use(express.logger());
var options = {
  index: "index.html"
};

*/

app.get('*', function(req, res) {
    res.redirect('/');
});

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});