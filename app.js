var express = require('express')

var app = express()
var PORT = process.env.PORT || 3000

app.listen(PORT, function (){
	console.log('Express listening on port ' + PORT)
})

// VARIOUS
app.use(express.static(__dirname + '/public'))
