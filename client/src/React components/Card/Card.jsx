import {NavLink} from 'react-router-dom'
import style from './Card.module.css'

const Card = ({id, name, genres, image, rating})=>{

    return(
        <div  key={id}  >
            <NavLink key={'Link'+id} className={style.link} to={`/detail/${id}`}>
            <div key={'cont'+id}className={style.container}>
            <h3 key={'name'+id} className={style.name}>{name}</h3>
            <img key={'img'+id} className={style.image} src={image} alt={`Img of ${name}`} />
            <h4 key={"TG"+id} className={style.tittleGenres}>Genres</h4>
            {
            genres?.map(genre => (
            <p key={genre.id} className={style.genres}>{genre.name}</p>
            ))
            }
             <h4 key={"tr"+id} className={style.tRating}>Rating</h4>
             <p key={'r'+id} className={style.rating}>{rating}</p>
            </div>
            </NavLink>
        </div>
    )
}

export default Card

