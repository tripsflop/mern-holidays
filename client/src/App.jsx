import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import HolidaysTable from "./components/HolidaysTable";
import HolidayCreateForm from "./components/HolidayCreateForm";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <HolidayCreateForm />

      <h1>Happy Holidays!</h1>
      <HolidaysTable></HolidaysTable>
    </div>
  );
}

export default App;
