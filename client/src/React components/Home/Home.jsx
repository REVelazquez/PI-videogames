
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {filterGamesByGenre, filterGamesByOrigin, getGame, getGenres, orderGamesByLetter, orderGamesByRating} from '../../redux/actions'
import Style from './Home.module.css'
import Paginate from "../Paginate/Paginate"

const Home = () =>{
//constante de estado y variable de key
    const dispatch = useDispatch()
    let z=1

//estados y data generales
    useEffect(()=>{
        dispatch(getGame());
        dispatch(getGenres());
    }, [dispatch]) 

    const [order, setOrder]= useState('')


    let allVideogames=useSelector((state)=>state.allVideogames)

    
    let allVideogamesSliced=allVideogames.slice(0,101)
    let allGenres= useSelector(state=>state.genres)


//---------------------Paginacion------------------------//
    //estados de paginacion

    //constantes de paginacion

  //----------Handlers para filtros y orden//

    const handleGenreFilter = (event)=>{
        dispatch(filterGamesByGenre(event.target.value))
    }
    const handleCreatedFilter = (event)=>{
        dispatch(filterGamesByOrigin(event.target.value))

    }
    const handleOrderRanking= event=>{
        dispatch(orderGamesByRating(event.target.value))
    }
    const handleOrderLetters = (event)=>{
        dispatch(orderGamesByLetter(event.target.value))

    }

//Handlers de paginacion


    return(
        <div className={Style.wrapper}>
            <div>
                <div>
                    <select name="Genre Filter" onChange={handleGenreFilter}>
                        <option value={"All"}>All</option>
                        {
                            allGenres?.map(genre=><option key= {'a'+z++} value={genre.name}>{genre.name}</option>
                        )}
                    </select>
                </div>
                <select name="Origin Filter" onChange={handleCreatedFilter}>
                    <option value={"All"}>All</option>
                    <option value={'db'}>DB</option>
                    <option value={"api"}>API</option>
                </select>
            </div>
            <div>
                <select onChange={handleOrderRanking}>
                    <option value="None">No order</option>
                    <option value="A">Ranked up</option>
                    <option value="D">Ranked down</option>
                </select>            
            </div>
            <div>
                <select onChange={handleOrderLetters}>
                    <option value="None">No order</option>
                    <option value="A-Z">Crescent</option>
                    <option value="Z-A">Decrecent</option> 
                </select>
            </div>
            <div >
                <Paginate
                    gamesPerPage={gamesPerPage}
                    totalgames={allVideogamesSliced}
                    paginado={paginado}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    />
            </div>
            <div className={Style.container}>
            {
               allVideogames?.map(({id, name, image, genres, rating, platforms, release,description})=>{
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
            <div></div>
            </div>
        </div>
    )

}

export default Home