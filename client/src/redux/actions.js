import axios from 'axios';
import {GET_GAMES, GET_GAMES_BY_ID, GET_GENRES, POST_GAMES, ORIGIN_FILTERED_GAMES, GENRE_FILTERED_GAMES, RATING_ORDERED_GAMES, LETTERS_ORDERED_GAMES } from './action-types'

//URLS
const URL='http://localhost:3001/videogames'
const URL_Name = 'http://localhost:3001/videogames?name='
const URL_ID = 'http://localhost:3001/videogames/'
const URL_GENRES= 'localhost:3001/genres'


//-----------------------Actions para rutas "gets"-----------------------//
export const getGame = (name)=>{
    return async(dispatch) => {
        try{
            if(name){
                let info = await axios.get(`${URL_Name}${name}`);
                let results= []
                results.push(info.data)
                return dispatch({
                    type: GET_GAMES,
                    payload:results
                })
            } else {
                let info = await axios.get(`${URL}`);   
                let results= []
                results.push(info.data)
                return dispatch({
                    type: GET_GAMES,
                    payload:results
                })
            }
        } catch(error){
            return ({error:error.message});   
        }
    }
}

export const getGamesById= async(id)=>{
    const url=`${URL_ID}${id}`
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

export const getGenres=  ()=>{
        return async (dispatch)=>{
            try {
                const info= await axios.get(URL_GENRES)
                return dispatch({
                    type:GET_GENRES,
                    payload: info.data
                })
            } catch (error) {
                return {error:error.message}
            }
        }
}

//-------------------------action para ruta post---------------------//
export const postGames= async (payload)=>{
    const url = URL
    return async (dispatch)=>{
        try {
            let info = await axios.post(url, payload)
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