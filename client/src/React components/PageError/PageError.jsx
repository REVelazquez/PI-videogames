import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Style from './PageError.module.css'

const PageError = ()=>{
    const navigate= useNavigate()
    const [image, setImage]=useState('mimic')
    const [textImage, setTextImage]=useState('')

    const onClickImage = ()=>{}

    return(
        <span>
            <h5>You shouldn't be here</h5>
            <p>Oh, look, a treasure... <p className={Style.image}>Open it?</p></p>

            <button>Home</button>
        </span>
    )
}

export default PageError