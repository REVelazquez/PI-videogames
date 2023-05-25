const axios= require('axios')
const {Videogame, Genre}= require('../db')
const {API_KEY, URL_ID}= process.env

const getVideogameById= async (idVideogame, res)=>{
    let URL= `${URL_ID}${idVideogame}?key=${API_KEY}`
    //debo sacar de la info que traera axios: id, nombre, imagen, plataforma, descripcion, fecha de lanzamiento, rating, generos
    try {
        let isUUID= /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;


        if(isUUID.test(idVideogame)){
            const game = await Videogame.findByPk(idVideogame, {
                include: {
                  model: Genre,
                  attributes:['name'],
                  through: {
                    attributes: [],
                  },
                },
              });
              console.log(game);
              if (game) {
                return game;
              }
        }else{
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
            if(videogame) return videogame
        //si no se encuentra ni en la api ni en la db devuelve un error
        }
    
} catch (error) {
    return {error:error.message}
} }

module.exports= getVideogameById