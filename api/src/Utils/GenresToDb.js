const axios= require ('axios')
const {Genre}= require('../db.js')
const {API_KEY, URL_GENRES}= process.env

// Ahora creo una funcion para guardar los generos de la API en la DB

const savedGenres = async()=>{
    try {
        const apiGenres= await axios.get(`${URL_GENRES}?key=${API_KEY}`)
        .then(response=>response.data.results)

//con la siguiente parte del codigo hago que los valores guardados en el array apiGenres, que es un array lleno de objetos, 
    const genrePromises = apiGenres.map(async (apiGenres)=>{
        const newGenre= await Genre.create({
            id: apiGenres.id,
            name:apiGenres.name
        })
        return newGenre
    })
    const genres=await Promise.all(genrePromises)
    return genres
    } catch (error) {
        return {error: error.message}
    }    
}
module.exports= savedGenres