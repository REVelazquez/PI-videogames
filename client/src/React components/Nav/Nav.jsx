import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Style from './Nav.module.css'
const Nav = () => {
  const location = useLocation();
  const [disableForm, setDisableForm] = useState(false);
  const [disableHome, setDisableHome] = useState(false);

  useEffect(() => {
    setDisableForm(location.pathname === "/form");
    setDisableHome(location.pathname === "/home");
  }, [location.pathname]);

  return (
    <nav className={Style.nav}>
      <Link to="/form">
        <button disabled={disableForm}>Submit new Game</button>
      </Link>

      <SearchBar />

      <Link to="/home">
        <button disabled={disableHome}>Home</button>
      </Link>
    </nav>
  );
};

export default Nav;
