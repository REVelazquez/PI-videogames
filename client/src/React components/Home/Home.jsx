
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {filterGamesByGenre, filterGamesByOrigin, getGame, getGenres, orderGamesByLetter, orderGamesByRating} from '../../redux/actions'
import Style from './Home.module.css'



const Home = () =>{
    const dispatch = useDispatch()
    let z=1

    let [aux, setAux]= useState(false)

    useEffect(()=>{
        dispatch(getGame());
        dispatch(getGenres());
    }, []) 
    let videogames=useSelector((state)=>state.allVideogames)
    let allGenres= useSelector(state=>state.genres)

    const handleGenreFilter = (event)=>{
        dispatch(filterGamesByGenre(event.target.value))
    }
    const handleCreatedFilter = (event)=>{
        dispatch(filterGamesByOrigin(event.target.value))
    }
    const handleOrderRanking= event=>{
        dispatch(orderGamesByRating(event.target.value))
        setAux(true)
    }

    const handleOrderLetters = (event)=>{
        dispatch(orderGamesByLetter(event.target.value))
        setAux(true)
    }

    return(
        <div className={Style.wrapper}>
            <div><div>
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
                    <option value="B">Ranked down</option>
                </select>            
            </div>
            <div>
                <select onChange={handleOrderLetters}>
                    <option value="None">No order</option>
                    <option value="A-Z">Crescent</option>
                    <option value="Z-A">Decrecent</option>
                </select>
            </div>
            <div className={Style.container}>
            {
               videogames?.map(({id, name, image, genres, rating})=>{
                    return(
                        <Card 
                            key={id}
                            image={image}
                            name={name}
                            genres={genres}
                            rating={rating}
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