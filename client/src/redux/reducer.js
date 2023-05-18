
import {GET_GAMES, GET_GAMES_BY_ID, GET_GENRES, POST_GAMES, ORIGIN_FILTERED_GAMES, GENRE_FILTERED_GAMES, RATING_ORDERED_GAMES, LETTERS_ORDERED_GAMES, GET_GAMES_BY_NAME } from './action-types'

const initialState={
    allVideogames:[],
    genres:[],
    filteredGames: [],
    detail: {}
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
            filteredGames:payload,

        }
        case GET_GAMES_BY_NAME:
            return{
                ...state,
                filteredGames:payload
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
      payload === 'db'
        ? [...state.allVideogames].filter((game) => isNaN(parseInt(game.id)))
        : payload === 'api'
        ? [...state.allVideogames].filter((game) => !isNaN(parseInt(game.id)))
        : [...state.allVideogames];
        return {
            ...state,
            filteredGames:filteredFrom,
        }
        case GENRE_FILTERED_GAMES:
            let genreFiltered = state.genres.find((genre) => genre.name === payload);
            const genreFilteredGames = [...state.allVideogames].filter(
              (game) => game.genres?.some((genre) => genre.name === genreFiltered?.name)
            );
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
            const allVideogamesCopy = [...state.allVideogames];
            const orderedGames = 
              payload === 'A' ? allVideogamesCopy.sort((a, b) => a.rating - b.rating)
            : payload === 'D' ? allVideogamesCopy.sort((a, b) => b.rating - a.rating)
            : [...state.allVideogames];
         return {
            ...state,
            orderedGames: orderedGames,
        };
            case LETTERS_ORDERED_GAMES:
                const allVideogamesCopy2 = [...state.allVideogames];
                const orderedGamesByName = payload === 'A-Z'
                  ? allVideogamesCopy2.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                  : payload === 'Z-A'
                  ? allVideogamesCopy2.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
                  : [...state.allVideogames];
                return {
                  ...state,
                  orderedGames: orderedGamesByName,
                };
        default:
           return { ...state};
    }
}

export default reducer;