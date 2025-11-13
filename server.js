const http = require('http')
const routing = require('./src')

const server = new http.Server(function(req,res){
    let jsonSting=''

    res.setHeader('Content-Type','application/json')

    req.on('data',(data)=>{
        jsonSting +=data
    })

    req.on('end',()=>{
        routing.define(req,res,jsonSting)
    })
})
server.listen(8000,'localhost')
console.log('port http://localhost:8000')

// как сделать 2 разных базовых шаблона
// как разбить css , и потом одним файлом их отправдять на сервер браузера
// почему по тегу a ссылки нету рамки , а все остально есть 