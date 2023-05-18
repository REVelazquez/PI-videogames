
import {GET_GAMES, GET_GAMES_BY_ID, GET_GENRES, POST_GAMES, ORIGIN_FILTERED_GAMES, GENRE_FILTERED_GAMES, RATING_ORDERED_GAMES, LETTERS_ORDERED_GAMES, GET_GAMES_BY_NAME} from './action-types'

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
            return {
              ...state,
              allVideogames: payload,
              filteredGames: payload,
            };
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
            return {
                ...state,
                genres: payload,
            };
        case POST_GAMES:
            return{
                ...state,
                allVideogames:[...state.allVideogames, ...payload]
            }
//casos de ordenamiento o filtrado
        case ORIGIN_FILTERED_GAMES:
          let allVideogamesDB=state.allVideogames.filter(game=>game.created)
          let allVideogamesAPI=state.allVideogames.filter(game=>!game.created)
          return {
            ...state,
            filteredGames:
              payload === 'DB' ? allVideogamesDB
              : payload === 'API' ? allVideogamesAPI
              : [...state.allVideogames]
          };
        case GENRE_FILTERED_GAMES:
          const videogamesCopy = [...state.allVideogames];
          const filterGenres =
            payload === 'All'
              ? videogamesCopy
              : videogamesCopy.filter((game) => game.genres.includes(payload));
          return {
            ...state,
            filteredGames: filterGenres,
          };
        case RATING_ORDERED_GAMES:
          const allVideogamesCopy = [...state.allVideogames];
          const orderedGames =
            payload === 'A'
              ? allVideogamesCopy.sort((a, b) => a.rating - b.rating)
              : payload === 'D'
              ? allVideogamesCopy.sort((a, b) => b.rating - a.rating)
              : [...state.allVideogames];
          return {
            ...state,
            filteredGames: orderedGames,
          };
          case LETTERS_ORDERED_GAMES:
            const allVideogamesCopy2 = [...state.allVideogames];
            const orderedGamesByName =
              payload === 'A-Z'
                ? allVideogamesCopy2.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                
                : payload === 'Z-A'
                ? allVideogamesCopy2.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
                : [...state.allVideogames];
                console.log(allVideogamesCopy2);

            return {
              ...state,
              filteredGames: orderedGamesByName,
            };
        default:
           return { ...state};
    }
}

export default reducer;