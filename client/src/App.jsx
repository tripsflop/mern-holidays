import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HolidaysEditForm from "./components/HolidayEditForm";
import HolidaysPage from "./components/HolidaysPage";
import { useState } from "react";

function App() {
  // not secure, they just have to find out where you store this state
  const [notLoggedIn, setNotLoggedIn] = useState(true);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar setNotLoggedIn={setNotLoggedIn} />} />
        <Route path="/holidays" element={<HolidaysPage />} />
        <Route
          path="/holidays/:id"
          element={<HolidaysEditForm notLoggedIn={notLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
