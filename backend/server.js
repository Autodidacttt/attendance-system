const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
console.log("MongoDB Connected");
})
.catch(err => console.log(err));

/* Attendance Schema */

const attendanceSchema = new mongoose.Schema({
name: String,
status: String,
date: {
type: Date,
default: Date.now
}
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

/* Login API */

app.post("/login", (req, res) => {

const { username, password } = req.body;

if(username === "teacher" && password === "1234"){

res.json({
success: true
});

}else{

res.json({
success: false
});

}

});

/* Save Attendance */

app.post("/attendance", async (req, res) => {

try{

const students = req.body;

for(let student of students){

const newAttendance = new Attendance({
name: student.name,
status: student.status
});

await newAttendance.save();

}

res.json({
message: "Attendance saved"
});

}catch(error){

res.status(500).json({
message: "Error saving attendance"
});

}

});

/* Get Attendance */

app.get("/attendance", async (req,res)=>{

const data = await Attendance.find();

res.json(data);

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{

console.log(`Server running on port ${PORT}`);

});