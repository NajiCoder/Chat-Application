const express = require("express");

// Create the app
const app = express();

// Set up EJS
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});


app.listen(3000, () => {
    console.log("Servere listening on por 3000");
})