import {Link} from 'react-router-dom'

const Card = (name, genre, image)=>{
    const genreNames= genre.filter(genre=>genre.name)
    return(
        <div >
            <Link>
            <h1>Name</h1>
            <h2 >{name}</h2>
            <h2 >{image}</h2>
            <h1 >Genres</h1>
            <h2 >{genreNames}</h2>
            </Link>
        </div>
    )
}

export default Card

