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
date:new Date()
});

}

alert("Attendance saved");

}catch(error){

console.log(error);
alert("Error saving attendance");

}

};

return(

<div>

<h2>Attendance</h2>

{students.map((student,index)=>(
<div key={index}>

{student.name}

<select
value={student.status}
onChange={(e)=>handleChange(index,e.target.value)}
>

<option>Present</option>
<option>Absent</option>

</select>

</div>
))}

<button onClick={submitAttendance}>
Submit Attendance
</button>

</div>

);

}

export default Attendance;