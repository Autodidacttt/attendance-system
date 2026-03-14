import React,{useState} from "react";

function Login({setLoggedIn}){

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const API = import.meta.env.VITE_API_URL;

const handleLogin = async (e)=>{

e.preventDefault();

try{

const response = await fetch(`${API}/login`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
password
})
});

const data = await response.json();

if(data.success){
setLoggedIn(true);
}else{
alert("Invalid login");
}

}catch(err){

console.log(err);
alert("Server error");

}

};

return(

<form onSubmit={handleLogin} style={{
background:"white",
padding:"40px",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)",
width:"300px",
textAlign:"center"
}}>

<h2>Attendance System</h2>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={{width:"100%",padding:"10px",margin:"10px 0"}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{width:"100%",padding:"10px",margin:"10px 0"}}
/>

<button type="submit" style={{
width:"100%",
padding:"10px",
background:"#667eea",
color:"white",
border:"none",
borderRadius:"6px"
}}>
Login
</button>

</form>

);

}

export default Login;