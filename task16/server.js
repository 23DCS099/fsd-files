const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home page
app.get("/", (req, res) => {
    res.render("home");
});

// Contact form page
app.get("/contact", (req, res) => {
    res.render("contact", { success: null, errors: [] });
});

// Handle contact form submission
app.post("/contact",
    // Validation
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").notEmpty().withMessage("Message cannot be empty"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("contact", { success: false, errors: errors.array() });
        }

        const { name, email, message } = req.body;

        // NodeMailer setup
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "23dcs120@charusat.edu.in",    // Replace with your email
                pass: "cgac zqoo azzw idfe"        // Gmail App Password
            }
        });

        let mailOptions = {
            from: email,
            to: "23dcs120@charusat.edu.in",          // Replace with your email
            subject: `New Contact Message from ${name}`,
            text: message
        };

        try {
            await transporter.sendMail(mailOptions);
            res.render("contact", { success: true, errors: [] });
        } catch (err) {
            console.error(err);
            res.render("contact", { success: false, errors: [{ msg: "Failed to send email" }] });
        }
    }
);

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
