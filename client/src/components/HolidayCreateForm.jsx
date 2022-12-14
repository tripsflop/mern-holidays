import React, { useState } from "react";

function HolidayCreateForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const handleCreate = async () => {
    console.log("name", name);

    try {
      // Default options are marked with *
      const response = await fetch("/api/holidays", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ name: name }), // body data type must match "Content-Type" header
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json(); // parses JSON response into native JavaScript objects
      console.log(data);
    } catch (error) {
      setMsg("something went wrong");
    }
  };
  return (
    <React.Fragment>
      <fieldset>
        <legend>Create Holiday</legend>
        <label>
          Holiday Name:
          <input
            name="holidayName"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button onClick={handleCreate}>Create</button>
      </fieldset>
      <p>{msg}</p>
    </React.Fragment>
  );
}

export default HolidayCreateForm;
