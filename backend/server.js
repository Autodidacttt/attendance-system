const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* Middleware */

app.use(cors());
app.use(express.json());

/* MongoDB Connection */

mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log("MongoDB Connected");
})
.catch(err => {
console.error("MongoDB connection error:", err);
});

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

/* Test Route */

app.get("/", (req,res)=>{
res.json({ message: "Backend running successfully" });
});

/* Login API */

app.post("/login", (req, res) => {

const { username, password } = req.body;

if(username === "teacher" && password === "1234"){

return res.status(200).json({
success: true,
message: "Login successful"
});

}

return res.status(401).json({
success: false,
message: "Invalid login"
});

});

/* Save Attendance */

app.post("/attendance", async (req, res) => {

try{

const students = req.body;

for(const student of students){

const newAttendance = new Attendance({
name: student.name,
status: student.status
});

await newAttendance.save();

}

res.json({
success:true,
message:"Attendance saved"
});

}catch(error){

console.error(error);

res.status(500).json({
success:false,
message:"Error saving attendance"
});

}

});

/* Get Attendance */

app.get("/attendance", async (req,res)=>{

try{

const data = await Attendance.find();
res.json(data);

}catch(err){

res.status(500).json({message:"Error fetching attendance"});

}

});

/* Start Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`);
});