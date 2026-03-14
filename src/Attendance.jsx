import React,{useState} from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

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

const submitAttendance = async ()=>{

try{

for(const student of students){

await addDoc(collection(db,"attendance"),{
name:student.name,
status:student.status,
date:new Date(),        // stores date
timestamp:Date.now()    // used for sorting
});

}

alert("Attendance saved");

}catch(error){

console.log(error);
alert("Error saving attendance");

}

};

return(

<div style={{
background:"white",
padding:"40px",
borderRadius:"10px"
}}>

<h2>Attendance</h2>

<table border="1">

<thead>
<tr>
<th>Student</th>
<th>Status</th>
</tr>
</thead>

<tbody>

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

</tbody>

</table>

<br/>

<button onClick={submitAttendance}>
Submit Attendance
</button>

</div>

);

}

export default Attendance;