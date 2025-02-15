const express = require("express");
const port = process.env.PORT || 5001;
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse URL-encoded data from forms
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <h1>Welcome to Form Exercise</h1>
        <ul>
          <li><a href="/form">Form Page</a></li>
        </ul>
      `);
});
// http://localhost:5001/form should return a form with input elements for username, email, and submit button
app.get("/form", (req, res) => {
  res.send(`
    <h1>Submit All Your Details</h1>
    <form action="/submit" method="POST">
      <label for="username">Name:</label>
      <input type="text" id="username" name="username" required><br><br>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>
      
      <label for="comments">Comments:</label>
      <textarea id="comments" name="comments"></textarea><br><br>
      
      <label for="newsletter">Newsletter:</label>
      <input type="checkbox" id="newsletter" name="newsletter" value="yes"><br><br>
      
      <button type="submit">Submit</button>
    </form>
  `);
});

// http://localhost:5001/submit should return all the data the user entered
app.post("/submit", (req, res) => {
  const { username, email, comments, newsletter } = req.body;

  res.send(`
    <h1>Form Submitted Successfully</h1>
    <p><strong>Name:</strong> ${username}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Comments:</strong> ${comments || "n/a"}</p>
    <p><strong>Newsletter :</strong> ${
      newsletter ? "Subscribed" : "No, thank you."
    }</p>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
