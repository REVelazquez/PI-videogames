const axios= require('axios')
const {Videogame}= require('../db')
const {API_KEY, URL_ID}= process.env

const getVideogameById= async (idVideogame, res)=>{
let URL= `${URL_ID}${idVideogame}?key=${API_KEY}`
//debo sacar de la info que traera axios: id, nombre, imagen, plataforma, descripcion, fecha de lanzamiento, rating, generos
try {
    const response= await axios.get(URL);
    const info= response.data;
//en la linea anterior guardo la informacion que trajo axios en la constante "info"
//en la siguiente instancio el videojuego para luego enseñarlo
    const videogame={
        id:info.id, 
        name:info.name, 
        description:info.description, 
        platforms:info.platforms, 
        image:info.background_image, 
        released:info.released, 
        rating:info.rating,
        genres:info.genres
    }
    if(videogame) return videogame
//una vez instanciado me fijo que exista en la db
    const game = await Videogame.findOne({where:{id:idVideogame}})
    return game

//si no se encuentra ni en la api ni en la db devuelve un error
    
} catch (error) {
    return {error:error.message}
}    
}

module.exports= getVideogameById