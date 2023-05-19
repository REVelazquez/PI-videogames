
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {filterGamesByGenre, filterGamesByOrigin, getGame, getGenres, orderGamesByLetter, orderGamesByRating} from '../../redux/actions'
import Style from './Home.module.css'
import Paginate from "../Paginate/Paginate"

const Home = () =>{

    const dispatch = useDispatch()
    //estados 
    useEffect(()=>{
        dispatch(getGame());
        dispatch(getGenres());
    }, [dispatch]) 
    

    //data
    let allVideogames=useSelector((state)=>state.filteredGames)
    let allGenres= useSelector(state=>state.genres)  

    //----------Handlers para filtros y orden//
    
      const handleGenreFilter = (event)=>{
          dispatch(filterGamesByGenre(event.target.value))
      }
      const handleCreatedFilter = (event)=>{
          dispatch(filterGamesByOrigin(event.target.value))
    
      }
      const handleOrderRanking= event=>{
          dispatch(orderGamesByRating(event.target.value));
      }
      const handleOrderLetters = (event)=>{
          dispatch(orderGamesByLetter(event.target.value))
    
      }

    //----- paginacion-----//

//Pagina actual y juegos por pagina
    const [currentPage, setCurrentPage]= useState(1)
    const gamesPerPage=15

//index del ultimo juego de la pagina
    let initialLastIndex= currentPage*gamesPerPage    
    const [indexOfLastGame, setIndexOfLastGame]=useState(initialLastIndex)

//index del primer juego de la pagina
    let initialFirstIndex= indexOfLastGame-gamesPerPage
    const [indexOfFirstGame, setIndexOfFirstGame]=useState(initialFirstIndex)

//juegos que se mostraran en la pagina
    const currentGames = allVideogames.slice(indexOfFirstGame, Math.min(indexOfLastGame, allVideogames.length));
    
//tamaño de pagina y numero que le toca a cada una 
    const maxPage = Math.ceil(allVideogames.length/gamesPerPage)
    const pageNumbers= Array.from({ length: maxPage }, (_, index) => index + 1);
    
    //Handlers de paginacion
    const handleOnClick= (event)=>{
        const selectedPage=parseInt(event.target.value)
        if(selectedPage !== currentPage){
            const newIndex = (selectedPage-1)*gamesPerPage
            setCurrentPage(selectedPage)
            setIndexOfFirstGame(newIndex)
            setIndexOfLastGame(newIndex+gamesPerPage)

        }
    }

    const handleNext = (event) => {
        if (currentPage !== maxPage) {
          const nextPage = currentPage + 1;
          const newIndex = nextPage * gamesPerPage;
          setCurrentPage(nextPage);
          setIndexOfFirstGame(newIndex);
          setIndexOfLastGame(newIndex + gamesPerPage);
        }
      };
      
      const handlePrev = (event) => {
        if (currentPage > 1) {
          const prevPage = currentPage - 1;
          const newIndex = (prevPage - 1) * gamesPerPage;
          setCurrentPage(prevPage);
          setIndexOfFirstGame(newIndex);
          setIndexOfLastGame(newIndex + gamesPerPage);
        }
      };
      
        
    return(
        <div className={Style.wrapper}>
            <div >
                <div className={Style.ordNFiltCont}>
                <div key={'Filter genre'} className={Style.ordNFilt}>
                <select name="genre-filter" className={Style.selects} defaultValue={'All'} onChange={handleGenreFilter}>
                        <option value="All">None</option>
                        {allGenres.length > 0 && allGenres.map((genre, index) => {
                             return (
                                <option value={genre.name} key={index}>{genre.name}</option>
                                    );
                        })} 
                    </select>
                </div>
                <div key={'Filter orig'} className={Style.ordNFilt}>
                    <select name="Origin Filter" className={Style.selects} onChange={handleCreatedFilter}>
                        <option value={"All"}>All</option>
                        <option value={'DB'}>DB</option>
                        <option value={"API"}>API</option>
                    </select>
                </div>
                <div key={'rate order'} className={Style.ordNFilt}>
                    <select name='Rating Order'className={Style.selects}  onChange={handleOrderRanking}>
                        <option value="None">No order</option>
                        <option value="A">Ranked up</option>
                        <option value="D">Ranked down</option>
                    </select>            
                </div>
                <div key={'alph order'} className={Style.ordNFilt}>
                    <select name='Alph order'className={Style.selects} onChange={handleOrderLetters}>
                        <option value="None">No order</option>
                        <option value="A-Z">Crescent</option>
                        <option value="Z-A">Decrecent</option> 
                    </select>
                </div>
                </div>
            <div className={Style.paginateContainer}>
                <Paginate 
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleOnClick={handleOnClick}
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                maxPage={maxPage}
                // nextBtn={nextBtn}
                // prevBtn={prevBtn}
                />
            </div>
            <div className={Style.cardsContainer}>
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