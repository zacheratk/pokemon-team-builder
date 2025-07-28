import "./App.css";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./Paths/Home";

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
        </Routes>
      </main>
    </>
  );
};

export default App;
