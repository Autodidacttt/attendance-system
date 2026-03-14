import React, { useState } from "react";

function Attendance() {

const [students, setStudents] = useState([
{ name: "Ravi", status: "Present" },
{ name: "Priya", status: "Present" },
{ name: "Rahul", status: "Present" }
]);

const handleChange = (index, value) => {

const updatedStudents = [...students];
updatedStudents[index].status = value;

setStudents(updatedStudents);

};

const submitAttendance = async () => {

try {

const response = await fetch(
"https://attendance-backend.onrender.com/attendance",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(students)
}
);

const data = await response.json();

alert(data.message);

} catch (error) {

console.error("Error submitting attendance:", error);
alert("Failed to submit attendance");

}

};

return (

<div
style={{
background: "white",
padding: "40px",
borderRadius: "10px",
textAlign: "center"
}}
>

<h2>Attendance</h2>

<table border="1" style={{ width: "100%", marginTop: "20px" }}>

<thead>
<tr>
<th>Student</th>
<th>Status</th>
</tr>
</thead>

<tbody>
{students.map((student, index) => (
<tr key={index}>
<td>{student.name}</td>

<td>
<select
value={student.status}
onChange={(e) => handleChange(index, e.target.value)}
>
<option value="Present">Present</option>
<option value="Absent">Absent</option>
</select>
</td>

</tr>
))}
</tbody>

</table>

<br />

<button
onClick={submitAttendance}
style={{
padding: "10px 20px",
background: "#667eea",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer"
}}
>
Submit Attendance
</button>

</div>

);

}

export default Attendance;