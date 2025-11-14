const fs = require('fs')
const path = require('path')
const url = require('url')

const define = function (req, res) {
    const urlParse = url.parse(req.url, true)
    let pathName = urlParse.pathname

    let templatePath = ''
    let stylePath = ''
    let filePath = ''
    // let stylePathNew = '/modules/main/new-product.css'
    

    if (/\.(css|js|png|svg|woff2)$/i.test(pathName)) {
        const ext = path.extname(pathName).toLowerCase()
        let contentType = 'text/plain'

        if (ext === '.css') contentType = 'text/css'
        else if (ext === '.js') contentType = 'text/javascripts'
        else if (ext === '.png') contentType = 'image/png'
        else if (ext === '.svg') contentType = 'image/svg+xml'
        else if (ext === '.woff2') contentType = 'font/woff2'
        const filePath = path.join(__dirname, pathName)

        fs.readFile(filePath, (err, data) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(data)
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' })
                res.end('Ошибка зашрузки стилей')
            }
        })
        return
    }

    if(pathName ==='/'){
        filePath = path.join(__dirname, '/modules/main/main.html')
        stylePath='/modules/main/content-info.css'
        templatePath = path.join(__dirname, '/shared/template/base.html')
    }
    else if(pathName ==='/product'){
        filePath = path.join(__dirname, '/modules/product/product.html')
        stylePath='/modules/product/product.css'
        templatePath = path.join(__dirname, '/shared/template/alterBase.html')
    }

    fs.readFile(templatePath, 'utf-8',(err, layoutPage) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' })
            res.end('Ошибка базавого шаблона')
            return
        }
        fs.readFile(filePath,'utf-8', (err, pageData) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' })
                res.end('Ошибка домашней  страницы')
                return
            }
            const  html = layoutPage
                .replace('{{content}}',pageData)
                .replace('{{style}}', `<link rel="stylesheet" href=${stylePath}>`)

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html)
        })
    })
}

exports.define = define