const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const studentRoutes = express.Router();

let Student = require("./student.model");

const PORT = 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin1:bfcIdVoeYmF8zlLk@Student.kv17t.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Create
studentRoutes.route('/add').post(function(req, res) {
    let student = new Student(req.body);
    student.save()
        .then(student => {
            res.status(200).json({'student': 'student record added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new student record failed');
        });
});

// Read
studentRoutes.route('/').get(function(req , res) {
    Student.find(function(err, students) {
        if (err) {
            console.log(err);
        } else {
            res.json(students);
        }
    });
});

studentRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Student.findById(id, function(err, student) {
        res.json(student);
    });
});


//Update
studentRoutes.route('/update/:id').patch(function(req, res) {
    Student.findByIdAndUpdate(req.params.id, req.body, {new : true})
    .then(function(student) {
        if (!student)
            res.status(404).send("data is not found");
            res.send('Student record updated!');
        })
        .catch(err => {
            res.status(400).send("Error in Update");
        });
    });

// Delete
studentRoutes.route("/delete/:id").delete(function(req, res) {
     Student.findById(req.params.id, function(err, student) {
        if (!student)
            res.status(404).send("data is not found");
        else{
            Student.deleteOne({_id: req.params.id})
                .then(function() {
                    res.status(200).send('Record Deleted!')
                });
            }
     });
});

app.use("/api", studentRoutes);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});