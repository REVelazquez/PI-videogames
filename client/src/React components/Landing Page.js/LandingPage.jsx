import { useNavigate } from "react-router-dom"
import Style from './LandingPage.module.css'
const LandingPage = ()=>{
    const navigate= useNavigate();

    const handleOnClick = ()=>{
        navigate('/home')
    }

    return(
        <div key='landing' className={Style.cont}>
        
            <button key='landing button'className={Style.button} onClick={handleOnClick}>
                 GET YOUR GAME ON!
            </button>

        </div>
    )
}

export default LandingPage