import React, { useState } from "react";
import Login from "./Login";
import Attendance from "./Attendance";

function App() {

const [loggedIn, setLoggedIn] = useState(false);

const appStyle = {
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "linear-gradient(135deg, #667eea, #764ba2)",
fontFamily: "Arial, sans-serif"
};

return (

<div style={appStyle}>

{loggedIn ? (
<Attendance />
) : (
<Login setLoggedIn={setLoggedIn} />
)}

</div>

);

}

export default App;