import {NavLink} from 'react-router-dom'
import style from './Card.module.css'

const Card = ({id, name, genres, image, rating})=>{

    return(
        <div  key={id}  >
            <NavLink className={style.link} to={`/detail/${id}`}>
            <div className={style.container}>
            <h3 >{name}</h3>
            <img className={style.image} src={image} alt={`Img of ${name}`} />
            <h3 >Genres</h3>
            {
            genres?.map(genre => (
            <p>{genre.name}</p>
            ))
            }
             <h4>Rating</h4>
             <p>{rating}</p>
            </div>
            </NavLink>
        </div>
    )
}

export default Card

