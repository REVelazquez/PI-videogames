import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import { useLocation } from "react-router-dom"

const Nav = ({onSearch})=>{
    const location= useLocation()


    
return (
    
    <nav>
        <SearchBar onSearch= {onSearch} />
        
        {location.pathname !== '/form' && <Link to= '/form'> <button>Submit new Game</button></Link> }

        {location.pathname !== '/home' && <Link to= '/home'> <button>Home</button></Link> }
    </nav>
)
}
export default Nav