import { useSelector } from "react-redux"
import Card from "../Card/Card"
import Style from './Search.module.css'

const Search = ()=>{
    const searchedGames = useSelector(state=>state.filteredGames)
return(
    <div  className={Style.container}  >
        {
            searchedGames?.map(({id, name, image, genres, rating, platforms, release,description})=>{
                return(
                    <Card 
                        key={id}
                        id={id}
                        image={image}
                        name={name}
                        genres={genres}
                        rating={rating}
                        platforms={platforms}
                        release={release}
                        description={description}
                    />
                )
            })
        }
    </div>
)
}

export default Search