import { useState } from "react";

const SearchBar = (onSearch)=>{
    const [name, setName] = useState('')

    const handleChange = (event)=>{
        setName(event.target.value)
    }

    return(
        <div>
            <input placeHolder={'Search....'} type="search" onChange={handleChange} value={name} />
            <button onClick={()=>{onSearch(name); setName(' ')}}>Search</button>
        </div>
    )

}

export default SearchBar