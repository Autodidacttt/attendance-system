const handleLogin = () => {

fetch("https://attendance-backend.onrender.com/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
username,
password
})
})
.then(async (res) => {

const text = await res.text(); // get raw response

try {

const data = JSON.parse(text); // try converting to JSON

if(data.success){
setLoggedIn(true);
}else{
alert("Invalid login");
}

} catch(error) {

console.error("Invalid JSON response:", text);
alert("Server error. Please try again.");

}

})
.catch(err => {
console.error("Login error:", err);
});

};