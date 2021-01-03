var express = require ('express')
var app = express()

var cb = function()
{
    console.log("listeing on porty 3000")
}

app.listen(3000,cb)