import React, { useState } from "react";
import Login from "./Login";
import Attendance from "./Attendance";

function App() {

const [loggedIn, setLoggedIn] = useState(false);

return (

<div>

{loggedIn ? (
<Attendance />
) : (
<Login setLoggedIn={setLoggedIn} />
)}

</div>

);

}

export default App;