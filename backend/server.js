const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* -----------------------------
   MONGODB CONNECTION
----------------------------- */

mongoose.connect("mongodb+srv://rishimahara688_db_user:enCoAI2Txt0xXJPE@cluster0.ojxjgyg.mongodb.net/attendanceDB")
.then(() => {
console.log("MongoDB Connected Successfully");
})
.catch((err) => {
console.log("Database connection error:", err);
});

/* -----------------------------
   ATTENDANCE SCHEMA
----------------------------- */

const attendanceSchema = new mongoose.Schema({
name: String,
status: String,
date: {
type: Date,
default: Date.now
}
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

/* -----------------------------
   LOGIN API
----------------------------- */

app.post("/login", (req, res) => {

const { username, password } = req.body;

if(username === "teacher" && password === "1234"){

res.json({
success: true,
message: "Login successful"
});

}else{

res.json({
success: false,
message: "Invalid username or password"
});

}

});

/* -----------------------------
   SAVE ATTENDANCE
----------------------------- */

app.post("/attendance", async (req, res) => {

try {

const students = req.body;

for (let student of students) {

const newAttendance = new Attendance({
name: student.name,
status: student.status
});

await newAttendance.save();

}

res.json({
message: "Attendance saved successfully"
});

} catch (error) {

res.status(500).json({
message: "Error saving attendance"
});

}

});

/* -----------------------------
   GET ATTENDANCE
----------------------------- */

app.get("/attendance", async (req, res) => {

try {

const data = await Attendance.find();

res.json(data);

} catch (error) {

res.status(500).json({
message: "Error fetching attendance"
});

}

});

/* -----------------------------
   START SERVER
----------------------------- */

app.listen(5000, () => {

console.log("Server running on http://localhost:5000");

});