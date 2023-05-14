const axios= require ('axios')
const {Videogame, Genre}= require('../db.js')
const {API_KEY, URL}= process.env

// funcion para buscar en la api o revisar la DB si existe dicho juego
const getVideogames = async()=>{
    let realURL= `${URL}?key=${API_KEY}`
//defino la url donde se estara trabajando
    let allVideogames=[]
//este array es donde se guardara el videojuego en el caso de que no este en la DB pero si en la API
    try {
//con axios recupero datos de la api para luego enseñarlos
            let info= await axios.get(realURL);
//al cambiar la url por info.data.next hago que axios pueda volver a ejecutarse con el url que aparece en "next" dentro de la data en la API
            realURL=info.data.next;
            info =info.data.results;    
// info.data.results son los juegos que tiene la api. Por ende a continuacion los instancio        
            allVideogames= info.map(element => {return{
                    id:element.id,
                    name:element.name,
                    description: element.description, 
                    platforms: element.platforms,
                    image:element.background_image,
                    released:element.released,
                    rating:element.rating,
                    genres:element.genres,
                }});
//una vez instanciados los juegos se busca que existan en la db y que estos se  relacionen con la tabla de generos
    const games=await Videogame.findAll({
        include: [{
            model:Genre,
            as: "genres",
            through:{
                attributes: []
            }
        }]
    })
    //si el juego, o mejor dicho el array de juegos existe en la db, se reemplaza el array de allgames por dicha info
    if (games.length) allVideogames=games
    //se retorna todos los juegos que esten dentro del array "allVideogames"
    return allVideogames
    } catch (error) {
        return {error: error.message}
    }    
}
module.exports= getVideogames