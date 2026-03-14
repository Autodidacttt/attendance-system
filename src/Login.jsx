import React, { useState } from "react";

function Login({ setLoggedIn }) {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {

e.preventDefault();

try {

const response = await fetch("https://attendance-backend.onrender.com/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
username: username,
password: password
})
});

const data = await response.json();

console.log("Login response:", data);

if (data.success) {
setLoggedIn(true);
} else {
alert("Invalid username or password");
}

} catch (error) {

console.error("Login error:", error);
alert("Server not responding");

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

<form style={cardStyle} onSubmit={handleLogin}>

<h2>Attendance System</h2>

<input
style={inputStyle}
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>

<input
style={inputStyle}
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>

<button style={buttonStyle} type="submit">
Login
</button>

</form>

);

}

export default Login;