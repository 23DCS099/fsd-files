const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index", { error: null });
});


app.post("/calculate", (req, res) => {
  const income1 = req.body.income1;
  const income2 = req.body.income2;

  if (!income1 || !income2 || isNaN(income1) || isNaN(income2)) {
    return res.render("index", { error: "Please enter valid numbers for both incomes." });
  }

  const total = parseFloat(income1) + parseFloat(income2);
  res.render("result", { total });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
