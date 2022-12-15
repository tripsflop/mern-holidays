import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function HolidaysEditForm({ notLoggedIn }) {
  const { id } = useParams();
  const [holiday, setHoliday] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const info = Object.fromEntries(formData);

    console.log("formInfo %o", info);
    if (info.celebrated === "on") {
      info.celebrated = true;
    } else {
      info.celebrated = false;
    }

    console.log("after %o", info);

    // log("formInfo %o", formInfo);
    const response = await fetch(`/api/holidays/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data);
        navigate("/holidays");
      });
  };

  useEffect(() => {
    if (notLoggedIn) {
      navigate("/");
    }
  }, [navigate, notLoggedIn]);

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
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Make your own Holiday!</legend>
          <label>
            Name:<input name="name" defaultValue={holiday.name}></input>
          </label>
          <label>
            Celebrated:
            <input
              name="celebrated"
              type="checkbox"
              defaultChecked={holiday.celebrated}
            ></input>
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
        </fieldset>
        <button>Update</button>
        <button type="reset">Reset</button>
      </form>
    </React.Fragment>
  );
}

export default HolidaysEditForm;
