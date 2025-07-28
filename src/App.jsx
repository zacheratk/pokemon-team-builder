import "./App.css";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./Paths/Home";
import CreateMon from "./Paths/CreateMon";
import Gallery from "./Paths/Gallery";

const App = () => {
  return (
    <>
      <section className="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/create">Add a Team Member!</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
          </ul>
        </nav>
      </section>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateMon />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
