import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function HolidaysEditForm() {
  const { id } = useParams();
  const [holiday, setHoliday] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);

    // log("formInfo %o", formInfo);
    const response = await fetch(`/api/holidays/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    const fetchHoliday = async () => {
      const response = await fetch(`/api/holidays/${id}`);
      const data = await response.json();
      setHoliday(data);
    };
    fetchHoliday();
  }, [id]);

  return (
    <React.Fragment>
      <Navbar />
      <fieldset>
        <form onSubmit={handleSubmit}>
          <legend>Make your own Holiday!</legend>
          <label>
            Name:<input name="name" defaultValue={holiday.name}></input>
          </label>
          <label>
            Celebrated:
            <input name="celebrated" defaultValue={holiday.celebrated}></input>
          </label>
          <label>
            Likes:<input name="likes" defaultValue={holiday.likes}></input>
          </label>
          <label>
            Description:
            <input
              name="description"
              defaultValue={holiday.description}
            ></input>
          </label>
        </form>
      </fieldset>
      <button>Update</button>
      <button>Reset</button>
    </React.Fragment>
  );
}

export default HolidaysEditForm;
