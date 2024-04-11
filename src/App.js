import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { PizzaListPage } from "./PizzaListPage";
import { PizzaSinglePage } from "./PizzaSinglePage";
import { PizzaCreatePage } from "./PizzaCreatePage";
import { PizzaModPage } from "./PizzaModPage";
import { PizzaDelPage } from "./PizzaDelPage";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Pizzák</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/uj-pizza'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Új pizza</span>
              </NavLink>
              </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<PizzaListPage />} />
        <Route path="/pizza/:pizzaId" exact element={<PizzaSinglePage />} />
        <Route path="/uj-pizza" exact element={<PizzaCreatePage />} />
        <Route path="/mod-pizza/:pizzaId" exact element={<PizzaModPage />} />
        <Route path="/del-pizza/:pizzaId" exact element={<PizzaDelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
