import axios from 'axios';
import {GET_GAMES, GET_GAMES_BY_ID, GET_GENRES, POST_GAMES, ORIGIN_FILTERED_GAMES, GENRE_FILTERED_GAMES, RATING_ORDERED_GAMES, LETTERS_ORDERED_GAMES } from './action-types'


//-----------------------Actions para rutas "gets"-----------------------//
export const getGame = (name)=>{
    return async(dispatch) => {
        try{
            if(name){
                let info = await axios.get(`/videogames/name?=${name}`);
                payload=info.data;
            } else {
                info = await axios.get(`/videogames`);
                payload=info.data;                
            }
            dispatch({
                type:GET_GAMES,
                payload:payload
            })
        } catch(error){
            return ({error:error.message});   
        }
    }
}

export const getGamesById= async(id)=>{
    const url=`http://localhost:3001/videogames/${id}`
    return async (dispatch)=>{
        try {
            const info= await axios.get(url)
            return dispatch({
                type:GET_GAMES_BY_ID,
                payload:info
            })
        } catch (error) {
            return {error:error.message}
        }
    }
    
}

export const getGenres= async ()=>{
    const url =`http://localhost:3001/genres`
        return async (dispatch)=>{
            try {
                const info= await axios.get(url)
                return dispatch({
                    type:GET_GENRES,
                    payload: info.result
                })
            } catch (error) {
                return {error:error.message}
            }
        }
}

//-------------------------action para ruta post---------------------//
export const postGames= async ()=>{
    const url = `http:localhost:3001/videogames`
    return async ()=>{
        try {
            let info = await axios.post(url)
            return dispatch({
                type:POST_GAMES,
                payload: info.data
            })
        } catch (error) {
            return {error:error.message}
        }
    }
    
}

//--------------------------actions de ordenamiento--------------------//

export const filterGamesByGenre = (genre)=>{
    return {type:GENRE_FILTERED_GAMES, payload:genre}
}

export const filterGamesByOrigin = (origin)=>{
    return {type:ORIGIN_FILTERED_GAMES, payload: origin}
}

export const orderGamesByLetter = (letters)=>{
    return {type:LETTERS_ORDERED_GAMES, payload: letters}
}

export const orderGamesByRating = (rating)=>{
    return {type:RATING_ORDERED_GAMES, payload: rating}
}