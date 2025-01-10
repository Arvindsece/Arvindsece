var num1 = 10;
var num2 = 5;

const modules = require("./modules");
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.write("")
  res.write("Addition       : " + modules.add(num1, num2) + "\n");
  res.write("Subtraction    : " + modules.subract(num1, num2) + "\n");
  res.write("Multiplication : " + modules.multiply(num1, num2) + "\n");
  res.write("Division       : " + modules.divide(num1, num2) + "\n");
  res.end();
});

server.listen(3000, () => {
  console.log("server is running on port http://localhost:3000");
});