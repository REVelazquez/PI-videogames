import { Link } from "react-router-dom"

const LandingPage = ()=>{
    return(
        <div>
            <button>
                <Link to={'/home'}>
                 P L A Y
                 </Link>
            </button>
        </div>
    )
}

export default LandingPage