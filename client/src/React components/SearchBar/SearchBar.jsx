import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGame } from "../../redux/actions";

const SearchBar = ()=>{
    
    
    const dispatch= useDispatch()
    const [name, setName] = useState('')
    const handleChange = (event)=>{
        event.preventDefault()
        setName(event.target.value)}
    const handleSubmit=(event)=>{
        event.preventDefault()
        setName('')
        if(name !== '' ){
            dispatch(getGame(name))
        }else{
            alert("There's no videogame with thar word!")
        }
    }


    return(
        <div>
            <input placeHolder={'Search....'} type="search" onChange={handleChange} value={name} />
            <button onClick={handleSubmit}>Search</button>
        </div>
    )

}

export default SearchBar