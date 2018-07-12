const app = require('express')();

app.get('/', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send("test");

})

app.listen(8000, function () {
	console.log('Example app listening on port 8000!')
})
