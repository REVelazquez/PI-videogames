import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGame } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import DoABarrelRoll from "./DoABarrelRoll";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setName("");

    if (name !== "") {
      dispatch(getGame(name));
      navigate(`/search?name=${name}`);
    } else {
      alert("There's no videogame with that word!");
    }
  };

  return (
    <div>
      <input
        placeholder="Search...."
        type="search"
        onChange={handleChange}
        value={name}
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
