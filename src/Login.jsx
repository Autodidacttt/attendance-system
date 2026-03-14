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
.then(async (response) => {

if (!response.ok) {
throw new Error("Server error");
}

const data = await response.json();

if (data.success) {
setLoggedIn(true);
} else {
alert("Invalid login");
}

})
.catch((error) => {
console.error("Login error:", error);
alert("Login failed. Please try again.");
});

};