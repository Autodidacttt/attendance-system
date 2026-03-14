const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* Middleware */

app.use(cors());
app.use(express.json());

/* MongoDB connection */

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
console.log("MongoDB connected");
})
.catch(err => {
console.error("MongoDB error:", err);
});

/* Root route */

app.get("/", (req, res) => {
res.json({
message: "Attendance backend running"
});
});

/* Login API */

app.post("/login", (req, res) => {

const { username, password } = req.body;

console.log("Login attempt:", username);

if (username === "teacher" && password === "1234") {

return res.json({
success: true
});

}

return res.json({
success: false
});

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

/* Save Attendance */

app.post("/attendance", async (req, res) => {

try {

const students = req.body;

console.log("Attendance received:", students);

for (const student of students) {

const record = new Attendance({
name: student.name,
status: student.status
});

await record.save();

}

res.json({
success: true,
message: "Attendance saved successfully"
});

} catch (err) {

console.error("Attendance error:", err);

res.status(500).json({
success: false,
message: "Error saving attendance"
});

}

});

/* Get Attendance */

app.get("/attendance", async (req, res) => {

try {

const data = await Attendance.find();
res.json(data);

} catch (err) {

console.error("Fetch error:", err);

res.status(500).json({
success: false,
message: "Error fetching attendance"
});

}

});

/* Start Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});