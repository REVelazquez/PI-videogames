const axios= require('axios')
const {Videogame}= require('../db')
const {API_KEY, URL_ID}= process.env

const getVideogameById= async (idVideogame, res)=>{
let URL= `${URL_ID}?key=${API_KEY}`
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
//una vez instanciado me fijo que exista en la db
    const game = await Videogame.findOne({where:{id:idVideogame}})
    if(game) return res.status(200).json(game)
//si no existe, pero si existe en la api va a retornarlo
    if(videogame) return res.status(200).json(videogame)
//si no se encuentra ni en la api ni en la db devuelve un error
    return res.status(404).send("Not Found");
} catch (error) {
    res.status(500).send('Server error')
}    
}

module.exports= getVideogameById