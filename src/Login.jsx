import React, { useState } from "react";

function Login({ setLoggedIn }) {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {

try {

const response = await fetch(
"https://attendance-backend.onrender.com/login",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
username,
password
})
}
);

const text = await response.text();
console.log("Server response:", text);

let data;

try {
data = JSON.parse(text);
} catch (err) {
console.error("Invalid JSON from server:", text);
alert("Server returned invalid response");
return;
}

if (data.success) {
setLoggedIn(true);
} else {
alert("Invalid username or password");
}

} catch (error) {

console.error("Login request failed:", error);
alert("Server not responding. Try again.");

}

};

const cardStyle = {
background: "white",
padding: "40px",
borderRadius: "12px",
boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
width: "320px",
textAlign: "center"
};

const inputStyle = {
width: "100%",
padding: "10px",
margin: "10px 0",
borderRadius: "6px",
border: "1px solid #ccc"
};

const buttonStyle = {
width: "100%",
padding: "10px",
background: "#667eea",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer"
};

return (

<div style={cardStyle}>

<h2>Attendance System</h2>

<input
style={inputStyle}
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>

<input
style={inputStyle}
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>

<button style={buttonStyle} onClick={handleLogin}>
Login
</button>

</div>

);

}

export default Login;