import {Link} from 'react-router-dom'

const Card = (name, genre, image)=>{
    
    return(
        <div >
            <Link>
            <h1>Name</h1>
            <h2 >{name}</h2>
            <h2 >{image}</h2>
            <h1 >Genres</h1>
            <h2 >{genre}</h2>
            </Link>
        </div>
    )
}

export default Card

