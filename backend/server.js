const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Demo database (temporary storage)
let attendance = [];

/* -----------------------------
   LOGIN API
----------------------------- */

app.post("/login", (req, res) => {

const { username, password } = req.body;

// Simple authentication check
if (username === "teacher" && password === "1234") {

res.json({
success: true,
message: "Login successful"
});

} else {

res.json({
success: false,
message: "Invalid username or password"
});

}

});


/* -----------------------------
   SAVE ATTENDANCE API
----------------------------- */

app.post("/attendance", (req, res) => {

const data = req.body;

attendance.push(data);

console.log("Attendance Received:", data);

res.json({
message: "Attendance saved successfully"
});

});


/* -----------------------------
   GET ATTENDANCE API
----------------------------- */

app.get("/attendance", (req, res) => {

res.json(attendance);

});


/* -----------------------------
   START SERVER
----------------------------- */

app.listen(5000, () => {

console.log("Server running on http://localhost:5000");

});