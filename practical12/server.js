const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the calculator form
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Kids Calculator</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background: #f9f9f9; }
          input, select, button { padding: 10px; margin: 5px; font-size: 16px; }
          .container { border: 2px solid #4CAF50; background: #fff; display: inline-block; padding: 20px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); }
          h2 { color: #4CAF50; }
          .error { color: red; font-weight: bold; }
          .ok { color: green; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Kids Calculator</h2>
          <form action="/calculate" method="POST">
            <input type="text" name="num1" placeholder="Enter first number" required>
            <input type="text" name="num2" placeholder="Enter second number" required>
            <br>
            <select name="operation">
              <option value="add">+</option>
              <option value="subtract">-</option>
              <option value="multiply">×</option>
              <option value="divide">÷</option>
            </select>
            <br><br>
            <button type="submit">Calculate</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// Handle calculation
app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  // Validation
  if (isNaN(a) || isNaN(b)) {
    return res.send(`
      <h3 class="error">❌ Invalid input. Please enter valid numbers.</h3>
      <a href="/">🔙 Try Again</a>
    `);
  }

  let result;
  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) {
        return res.send(`
          <h3 class="error">❌ Cannot divide by zero.</h3>
          <a href="/">🔙 Try Again</a>
        `);
      }
      result = a / b;
      break;
    default:
      return res.send(`
        <h3 class="error">❌ Unknown operation.</h3>
        <a href="/">🔙 Try Again</a>
      `);
  }

  res.send(`
    <h2 class="ok">✅ Result: ${a} ${getSymbol(operation)} ${b} = ${result}</h2>
    <a href="/">🔙 Back</a>
  `);
});

function getSymbol(op) {
  switch (op) {
    case "add": return "+";
    case "subtract": return "-";
    case "multiply": return "×";
    case "divide": return "÷";
  }
}

app.listen(PORT, () => {
  console.log(`✅ Kids Calculator running at http://localhost:${PORT}`);
});
