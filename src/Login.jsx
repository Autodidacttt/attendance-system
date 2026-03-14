import React, { useState } from "react";

function Login({ setLoggedIn }) {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleLogin = () => {

fetch("http://localhost:5000/login", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
username,
password
})

})
.then(res => res.json())
.then(data => {

if(data.success){
setLoggedIn(true);
}else{
alert("Invalid login");
}

});

};

const cardStyle = {
background: "white",
padding: "40px",
borderRadius: "12px",
boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
width: "300px",
textAlign: "center"
};

const inputStyle = {
width: "100%",
padding: "10px",
margin: "10px 0",
borderRadius: "6px",
border: "1px solid #ccc",
fontSize: "16px"
};

const buttonStyle = {
width: "100%",
padding: "10px",
background: "#667eea",
color: "white",
border: "none",
borderRadius: "6px",
fontSize: "16px",
cursor: "pointer"
};

return (

<div style={cardStyle}>

<h2>Attendance System</h2>

<input
style={inputStyle}
type="text"
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
style={inputStyle}
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
style={buttonStyle}
onClick={handleLogin}
>
Login
</button>

</div>

);

}

export default Login;