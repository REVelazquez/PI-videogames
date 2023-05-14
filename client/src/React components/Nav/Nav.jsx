import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
const Nav = ({onSearch})=>{


return (
    <nav>
        <SearchBar onSearch= {onSearch} />

        <Link to='/form'>
        <button>Submit a Game</button>
        </Link>
    </nav>
)
}
export default Nav