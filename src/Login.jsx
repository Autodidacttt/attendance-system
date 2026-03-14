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
username: username,
password: password
})

})
.then(res => res.json())
.then(data => {

if(data.success){
setLoggedIn(true);
}
else{
alert("Invalid login");
}

});

};

return (

<div>

<h2>Login</h2>

<input
type="text"
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={handleLogin}>
Login
</button>

</div>

);

}

export default Login;