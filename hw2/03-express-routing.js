const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// Add your code here
app.get("/", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send(`
    <h1>Welcome to Express Routing Exercise</h1>
    <ul>
      <li><a href="/welcome">Welcome</a></li>
      <li><a href="/redirect">Redirect</a></li>
      <li><a href="/cache">Cache</a></li>
      <li><a href="/cookie">Cookie</a></li>
      <li><a href="/other">Default Handler</a></li>
    </ul>
  `);
});

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
app.get("/Welcome", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>Welcome to Express Server</h1>");
});

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
app.get("/redirect", (req, res) => {
  res.redirect(302, "/redirected");
});

// Handle /redirected route - Returns a redirection message
app.get("/redirected", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>You have been redirected sucessfully</h1>");
});

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
app.get("/cache", (req, res) => {
  res.set("Cache-Control", "max-age=86400"); // Cache for 1 day
  res.status(200).send("<h1>This resource was cached</h1>");
});

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
app.get("/cookie", (req, res) => {
  res.cookie("hello", "world"); // Set a cookie
  res.status(200).send("Cookies… yummm");
});

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
