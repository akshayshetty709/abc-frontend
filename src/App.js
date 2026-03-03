import React, { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://35.168.90.51")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>ABC Company Frontend Application - Version 4</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;