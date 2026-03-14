const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* Middleware */

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

/* Test Route */

app.get("/", (req,res)=>{
res.json({message:"Backend running"});
});

/* LOGIN ROUTE */

app.post("/login",(req,res)=>{

const { username, password } = req.body;

console.log("Login request received:", username);

if(username === "teacher" && password === "1234"){

return res.json({
success:true,
message:"Login successful"
});

}else{

return res.json({
success:false,
message:"Invalid credentials"
});

}

});

/* SAVE ATTENDANCE */

app.post("/attendance", async (req,res)=>{

try{

const students = req.body;

for(const student of students){

const record = new Attendance({
name: student.name,
status: student.status
});

await record.save();

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

/* GET ATTENDANCE */

app.get("/attendance", async (req,res)=>{

try{

const data = await Attendance.find();
res.json(data);

}catch(error){

res.status(500).json({
message:"Error fetching attendance"
});

}

});

/* Start Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});