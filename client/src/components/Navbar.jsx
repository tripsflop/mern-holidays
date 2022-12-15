import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ setNotLoggedIn }) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState({});

  const handleLogin = (info) => async () => {
    const response = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    if (response.ok) {
      fetch("/api/secret")
        .then((request) => request.json())
        .then((data) => setMsg(data));
      navigate("/holidays/6396b9008494e4ecfe650f64");
      setNotLoggedIn(false);
    }
  };

  useEffect(() => {
    fetch("/api/secret")
      .then((request) => request.json())
      .then((data) => setMsg(data));
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/holidays">Holidays</Link>
        </li>
        <li>
          <button onClick={handleLogin({ password: "123" })}>Login</button>
          <button onClick={handleLogin({ password: "" })}>Fail Login</button>
        </li>
      </ul>
      <p>{msg.msg}</p>
    </nav>
  );
}

export default Navbar;
