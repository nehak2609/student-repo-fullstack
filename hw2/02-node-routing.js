const http = require("http");
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to Node Routing Exercise</h1>");
    res.write("<ul>");
    res.write('<li><a href="/welcome">Welcome</a></li>');
    res.write('<li><a href="/redirect">Redirect</a></li>');
    res.write('<li><a href="/cache">Cache</a></li>');
    res.write('<li><a href="/cookie">Cookie</a></li>');
    res.write('<li><a href="/other">Default Handler</a></li>');
    res.write("</ul>");
    res.end();
  }
  // http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
  else if (req.url === "/welcome") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to our server World!</h1>");
    res.end();
  }
  // // http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
  else if (req.url === "/redirect") {
    res.writeHead(302, { Location: "/redirected" });
    res.end();
  }
  // Handle /redirected route - Returns a redirection message
  else if (req.url === "/redirected") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>You have been redirected successfully</h1>");
  }
  // http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
  else if (req.url === "/cache") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Cache-Control": "max-age=86400", // Cache for 1 day
    });
    res.end("<h1>This resource was cached</h1>");
  }
  // http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
  else if (req.url === "/cookie") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Set-Cookie": "hello=world", // Set cookie in response header
    });
    res.end("Cookies.. Yumm");
  }
  // For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
