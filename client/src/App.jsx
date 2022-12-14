import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HolidaysEditForm from "./components/HolidayEditForm";
import HolidaysPage from "./components/HolidaysPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/holidays" element={<HolidaysPage />} />
        <Route path="/holidays/:id" element={<HolidaysEditForm />} />
      </Routes>
    </div>
  );
}

export default App;
