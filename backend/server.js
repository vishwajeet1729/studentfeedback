const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Student = require("./models/Student");
const Teacher = require("./models/Teacher");
const Question = require("./models/Question");
const Feedback = require("./models/Feedback");
const Submission = require("./models/Submission");
const Notification = require("./models/Notification");
const Classes = require("./models/Classes");

const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://vishwajeetwalse9767:zJYPyosioLfW9iXJ@cluster0.uhc3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting database", err);
  });

app.use("/student", studentRoutes);

app.use("/teacher", teacherRoutes);

app.use("/feedback", feedbackRoutes);

app.get("/deleteAllData", async (req, res) => {
  try {
    await Student.deleteMany({});
    await Question.deleteMany({});
    await Teacher.deleteMany({});
    await Submission.deleteMany({});
    await Feedback.deleteMany({});
    await Notification.deleteMany({});

    res.status(200).json({ message: "deleted all data from database" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/allNotifications", async (req, res) => {
  try {
    const allNotifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(7);

    res.status(200).json({ notifications: allNotifications });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/notification", async (req, res) => {
  // console.log("hitting notf")

  const message = "notification created succesfully";
  const notification = new Notification({ message });

  res.status(200).json({ notification });
});

app.post("/createClass", async (req, res) => {
  //below , instead of CSAI20 .take value from req.body
  const getBranch = req.body;
  const branch = getBranch.branch;
  const newClass = new Classes({ branch });
  //console.log(branch)

  await newClass.save();
  // console.log(newClass)
  res.status(200).json({ msg: "ok" });
});

app.get("/getAllClasses", async (req, res) => {
  const classes = await Classes.find({});
  res.status(200).json({ classes });
});

app.get("/dataForDashboard", async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    const students = await Student.find({});

    var student_count = 0;

    for (let stu of students) {
      student_count += 1;
    }

    res.status(200).json({ teachers, student_count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3005, (req, res) => {
  console.log("listening on port 3005");
});
