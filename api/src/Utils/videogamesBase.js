const axios= require ('axios')
const {Videogame, Genre}= require('../db.js')
const {API_KEY, URL}= process.env

// Ahora creo una funcion para guardar los videojuegos de la API en la DB
const getVideogames = async()=>{
    let realURL= `${URL}?key=${API_KEY}`
    let allVideogames=[]
    let videogame={}
    try {
//---------El '_' en la siguiente cb indica que no se usa dicho parametro, a su vez la constante es una forma de que se hace una consulta mediante axios a la api y se reciben arrays de 5 resultados.
        const consult= Array.from({length:5}, async(_, index)=>{
            let info= await axios.get(realURL);
//con lo siguiente hago que la url pase a ser para los siguientes valores de resultados, y a la info se le busca una propiedad llamada results, que es el objeto que contiene las caracteristicas del videojuego
            realURL=info.data.next;
            info =info.data.results;            
            info.forEach(element => {
                videogame={
                    id:element.id,
                    name:element.name,
                    description: element.description, 
                    platforms: element.platforms,
                    image:element.background_image,
                    released:element.released,
                    rating:element.rating,
                    genres:element.genres
                }
//al juego que esta siendo instanciado en "videogame" se lo pushea al array de allVideogames
                allVideogames.push(videogame)
            });
     });
    //ahora busco en la db si existe el videojuego
    const games=await Videogame.findAll({
        include: [{
            model:Genre,
            as: "genres",
            through:{
                attributes: []
            }
        }]
    })
    //si el juego, o mejor dicho el array de juegos existe en la db, se reemplaza el array por dicha info
    allVideogames=games
    //se retorna todos los juegos que esten dentro del array "allVideogames"
    return allVideogames
    } catch (error) {
        return {error: error.message}
    }    
}
module.exports= getVideogames