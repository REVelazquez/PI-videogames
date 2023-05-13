import {Link} from 'react-router-dom'
import style from './Card.module.css'

const Card = (id, name, genre, image)=>{
    const genreNames= genre.filter(genre=>genre.name)
    return(
        <div>
            <Link>
            <h1>Name</h1>
            <h2 className={style.name}>{name}</h2>
            <h2 className={style.img}>{image}</h2>
            <h1>Genres</h1>
            <h2 className={style.genres}>{genreNames}</h2>
            </Link>
        </div>
    )
}

export default Card

