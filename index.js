const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res)=>{
  // if(req.url === "/"){
  //   fs.readFile(path.join(__dirname, "public", "index.html"), "utf8", (err, content)=>{
  //     if(err) throw err;
  //     res.writeHead(200, {'content-type' : 'text/html'});
  //     res.end(content);
  //   });
  // }
  // if(req.url === "/api/users"){
  //   const users = [
  //     { user: "Hmida", age: 30},
  //     { user: "El Madani", age: 21}
  //   ];
  //   res.writeHead(200, {'content-type' : 'text/html'});
  //   res.end(JSON.stringify(users));
  // }

  // Build filepath
  let filepath = path.join(__dirname,"public", req.url === '/' ? 'index.html' : req.url);
  // Extention of file
  let extension = path.extname(filepath);
  
  // Initial content type
  let contentType = "text/html";
  switch(extension) {
    case ".js":
      contentType = "text/javascript";
    case ".css":
      contentType = "text/css";
    case ".json":
      contentType = "application/json";
    case ".jpg":
      contentType = "image/jpg";
    break;
  }

  // Read file
  fs.readFile(filepath, (err, data)=>{
    if(err){
      if(err.code == "ENOENT"){
        // Page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, content)=>{
          res.setHeader("404", {"content-type" : contentType});
          res.end(content);
        });
      }else{
        // Some other error
        res.writeHead(500);
        res.end("Server Error");
      }
    }else{
      // Success
      res.setHeader("200", {"content-type" : contentType});
      res.end(data, 'utf8');  
    }
  });
});

const PORT = process.env.PORT || 1337;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));