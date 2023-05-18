import {Link} from 'react-router-dom'
import style from './Card.module.css'

const Card = ({id, name, genres, image, rating})=>{

    return(
        <div className={style.container} key={id}  >
            <Link to={`/detail/${id}`}>
            <h2 >{name}</h2>
            <img className={style.image} src={image} alt={`Img of ${name}`} />
            <h1 >Genres</h1>
            {
            genres?.map(genre => (
            <p>{genre.name}</p>
            ))
            }
             <h1>Rating</h1>
             <h2>{rating}</h2>
            </Link>
        </div>
    )
}

export default Card

