import React,{useState} from "react";

function Attendance(){

const [students,setStudents] = useState([
{name:"Ravi",status:"Present"},
{name:"Priya",status:"Present"},
{name:"Rahul",status:"Present"}
]);

const handleChange = (index,value)=>{

const updated=[...students];
updated[index].status=value;

setStudents(updated);

};

const submitAttendance = ()=>{

fetch("https://attendance-backend.onrender.com/attendance",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(students)
})
.then(res=>res.json())
.then(data=>alert(data.message));

};

return(

<div style={{
background:"white",
padding:"40px",
borderRadius:"10px"
}}>

<h2>Attendance</h2>

<table border="1">

<tr>
<th>Student</th>
<th>Status</th>
</tr>

{students.map((student,index)=>(
<tr key={index}>

<td>{student.name}</td>

<td>
<select
value={student.status}
onChange={(e)=>handleChange(index,e.target.value)}
>

<option>Present</option>
<option>Absent</option>

</select>
</td>

</tr>
))}

</table>

<br/>

<button onClick={submitAttendance}>
Submit Attendance
</button>

</div>

);

}

export default Attendance;