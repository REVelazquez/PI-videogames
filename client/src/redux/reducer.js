
import {GET_GAMES, GET_GAMES_BY_ID, GET_GENRES, POST_GAMES, ORIGIN_FILTERED_GAMES, GENRE_FILTERED_GAMES, RATING_ORDERED_GAMES, LETTERS_ORDERED_GAMES } from './action-types'

const initialState={
    allVideogames:[],
    genres:[],
    filteredGames: [],
    detail: []
}

//----en la siguiente linea inicio el reducer, pasandole por parametros el stado inicial y las actions destructuradas--//
const reducer= (state = initialState, {type, payload})=>{

// utilizo un switch para no hacer "if" encadenados o en cascadas.
    switch(type){
///casos de recuperacion de datos o de carga de los mismos
        case GET_GAMES:
            return{
            ...state,
            allVideogames:payload,
        }
        case GET_GAMES_BY_ID:
            return{
                ...state,
                detail:payload,
            }
        case GET_GENRES:
            return{
                ...state,
                genres:payload
            }
        case POST_GAMES:
            return{
                ...state,
            }
//casos de ordenamiento o filtrado
        case ORIGIN_FILTERED_GAMES:
        const filteredFrom =  
            payload === 'db' ? [...state.allVideogames].filter(games=>(isNaN(parseInt(games.id))))
            : payload === 'api' ? [...state.allVideogames].filter(games =>!isNaN(parseInt(games.id)))
            :[...state.allVideogames]
        return {
            ...state,
            filteredGames:filteredFrom,
        }
        case GENRE_FILTERED_GAMES:
    
            let genreFiltered =state.genres.find(genres=> genres.name === payload)
            const genreFilteredGames = [...state.allVideogames].filter(game=> game?.genres?.name === genreFiltered?.name)
            if (payload === 'All') return{
                ...state,
            }
            else{
                return{
                    ...state,
                    genreFilteredGames,
                } 
            }
        case RATING_ORDERED_GAMES:
            const allVideogamesCopy = [...state.allVideogames]
            return{
                ...state,
                orderedGames:
                payload === 'A'
                ?allVideogamesCopy.sort((a, b)=>a.rating - b.rating)
                :payload === 'D' 
                ?allVideogamesCopy.sort((a, b)=>b.rating - a.rating)
                :[...state.allVideogames]
            }
            case LETTERS_ORDERED_GAMES:
                const allVideogamesCopy2 = [...state.allVideogames]
                return{
                    ...state,
                    orderedGames:
                    payload === 'A-Z'
                    ?allVideogamesCopy2.sort((a, b)=> {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return  1; }
                    return 0
                    })
                    : payload === 'Z-A' ? allVideogamesCopy2.sort((a, b)=> {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
                        if(a.name.toLowerCase() < b.name.toLowerCase()) { return  1; }
                        return 0
                        })
                    :[...state, state.allVideogames]
                }           
        default:
           return { ...state};
    }
}

export default reducer;