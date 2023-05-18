
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {filterGamesByGenre, filterGamesByOrigin, getGame, getGenres, orderGamesByLetter, orderGamesByRating} from '../../redux/actions'
import Style from './Home.module.css'
import Paginate from "../Paginate/Paginate"

const Home = () =>{
//fucniones hechas constantes
    
    const dispatch = useDispatch()
    //estado para obtener data
    useEffect(()=>{
        dispatch(getGame());
        dispatch(getGenres());
    }, [dispatch]) 
//data
    let allVideogames=useSelector((state)=>state.allVideogames)
    let allGenres= useSelector(state=>state.genres)
    let z=1  
    //----- paginacion-----//
    const [nextBtn, setNextBtn]=useState(false)
    const [prevBtn, setPrevBtn]=useState(true)
    const [currentPage, setCurrentPage]= useState(1)
    const gamesPerPage=15

    let initialLastIndex= currentPage*gamesPerPage
    const [indexOfLastGame, setIndexOfLastGame]=useState(initialLastIndex)
    let initialFirstIndex= indexOfLastGame-gamesPerPage

    const [indexOfFirstGame, setIndexOfFirstGame]=useState(initialFirstIndex)
    const currentGames = allVideogames.slice(indexOfFirstGame, Math.min(indexOfLastGame, allVideogames.length));


    const maxPage = Math.ceil(allVideogames.length/gamesPerPage)
    const minPage =1
    const pageNumbers= Array.from({ length: maxPage }, (_, index) => index + 1);

    const handleOnClick= (event)=>{
        const selectedPage=parseInt(event.target.value)
        if(selectedPage !== currentPage){
            const newIndex = (selectedPage-1)*gamesPerPage
            setCurrentPage(selectedPage)
            setIndexOfFirstGame(newIndex)
            setIndexOfLastGame(newIndex+gamesPerPage)

        }
    }

    const handleNext= (event)=>{
        if(currentPage !== maxPage){
            const nextPage = currentPage+1
            const newIndex=(nextPage+1)*gamesPerPage
            setCurrentPage(nextPage);
            setIndexOfFirstGame(newIndex);
            setIndexOfLastGame(newIndex+gamesPerPage)
            if(nextPage=== maxPage){
                setNextBtn(true)
            }else(setNextBtn(false))
            setPrevBtn(false)
        }
    }

    const handlePrev= event=>{
        if(currentPage >1){
            const prevPage= currentPage -1
            const newIndex=(prevPage-1)*gamesPerPage
            setCurrentPage(prevPage)
            setIndexOfFirstGame(newIndex)
            setIndexOfLastGame(newIndex+gamesPerPage)
            if(prevPage === 1){
                setPrevBtn(true)
            }else(setPrevBtn(false))
            setNextBtn(false)
        }
        
    }
        

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
                <div>
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
            <div>
                <Paginate 
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleOnClick={handleOnClick}
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                nextBtn={nextBtn}
                prevBtn={prevBtn}
                />
            </div>
            <div className={Style.container}>
            {
               currentGames?.map(({id, name, image, genres, rating, platforms, release,description})=>{
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
             <div>

            </div>
            
            </div>
        </div>
        </div>
    )

}

export default Home