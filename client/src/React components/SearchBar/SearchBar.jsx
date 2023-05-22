import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGame } from "../../redux/actions";
import Style from './SearchBar.module.css'
import DoABarrelRoll from "./DoABarrelRoll";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate= useNavigate()
  const [name, setName] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const [loading, setLoading]= useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();
    if(+name === 23 || name.toLowerCase() === "do a barrel roll"){
      DoABarrelRoll()
    }
    console.log(DoABarrelRoll);
    if (name !== "") {
      setLoading(true)
      location.pathname !== '/home' && navigate('/home')
      dispatch(getGame(name))
      .then(()=>setLoading(false));
      setName('')


    } else {
      alert("A search, to perform,Enter a query");
    }
    
  };

  return (
    <form  onSubmit={handleSubmit}  key='searchContainer' className={Style.container}>
      <input
      key='SearchInput'
        placeholder="Search...."
        type="search"
        onChange={handleChange}
        value={name}
        className={Style.input}
      />
      <button key='SearchButton'  className={Style.search} type='submit' >Search</button>
    </form>
  );
};

export default SearchBar;
