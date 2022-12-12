import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";

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
      <h1>Happy Holidays!</h1>
    </div>
  );
}

export default App;
