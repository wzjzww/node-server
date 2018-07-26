var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')
function staticRoot(staticPath, req, res){
  console.log(staticPath)
  console.log(req.url)
  var pathObj = url.parse(req.url, true)
  console.log(pathObj)
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'text.html'
  }
  var filePath = path.join(staticPath, pathObj.pathname)
  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else{
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')
      res.end()      
    } 
  })
}
var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, ''), req, res)
})
server.listen(8099)
console.log('visit http://localhost:8099' )