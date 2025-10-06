const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed!"), false);
};


const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter
});


app.get("/", (req, res) => res.render("index", { message: null }));

app.post("/upload", (req, res) => {
  upload.single("resume")(req, res, function (err) {
    if (err) return res.render("index", { message: err.message });
    if (!req.file) return res.render("index", { message: "Please upload a PDF file." });
    res.render("result", { filename: req.file.filename });
  });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
