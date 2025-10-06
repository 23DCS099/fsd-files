const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // serve CSS

// Session setup
app.use(session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
}));

// Home page
app.get("/", (req, res) => {
    res.render("home", { username: req.session.username });
});

// Login page
app.get("/login", (req, res) => {
    res.render("login");
});

// Handle login
app.post("/login", (req, res) => {
    const { username } = req.body;
    req.session.username = username;
    req.session.loginTime = new Date(); // store login time
    res.redirect("/profile");
});

// Profile page
app.get("/profile", (req, res) => {
    if (!req.session.username) {
        return res.redirect("/login");
    }

    res.render("profile", {
        username: req.session.username,
        loginTime: req.session.loginTime.toLocaleString()
    });
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Start server
app.listen(3000, () => {
    console.log("Library portal running at http://localhost:3000");
});
