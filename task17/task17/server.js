const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Student = require('./models/Student');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ MongoDB connection
mongoose.connect("mongodb+srv://23dcs120_db_user:rwRIMTH1HsAiQ7lS@cluster0.pjnr8ja.mongodb.net/studentDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes

// List all students
app.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('index', { students });
    } catch (err) {
        res.status(500).send("Error fetching students");
    }
});

// Add student form
app.get('/add', (req, res) => {
    res.render('addStudent');
});

// Add student POST
app.post('/add', async (req, res) => {
    try {
        const { name, age, class: className, email } = req.body;
        const student = new Student({ name, age, class: className, email });
        await student.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error adding student");
    }
});

// Edit student form
app.get('/edit/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.render('editStudent', { student });
    } catch (err) {
        res.status(500).send("Error loading student for edit");
    }
});

// Edit student POST
app.post('/edit/:id', async (req, res) => {
    try {
        const { name, age, class: className, email } = req.body;
        await Student.findByIdAndUpdate(req.params.id, { name, age, class: className, email });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error updating student");
    }
});

// Delete student
app.get('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error deleting student");
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
