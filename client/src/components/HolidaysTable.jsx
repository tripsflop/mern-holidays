import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function HolidaysTable() {
  const [holidays, setHolidays] = useState([]);
  //const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("/api/holidays")
      .then((response) => response.json())
      .then((data) => setHolidays(data));
    //   }, [refresh]);
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/holidays/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data);
        //setRefresh(true);
        setHolidays(holidays.filter((h) => h._id !== id));
      });
  };

  return (
    <table border={1}>
      <caption>Holidays</caption>
      <thead>
        <tr>
          <th>Names</th>
          <th>Likes</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {holidays.map((holiday) => (
          <tr key={holiday._id}>
            <td>{holiday.name}</td>
            <td>{holiday.likes}</td>
            <td>
              <Link to="/">🎈</Link>
              <Link to={`/holidays/${holiday._id}`}>📝</Link>
              <button onClick={() => handleDelete(holiday._id)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HolidaysTable;
