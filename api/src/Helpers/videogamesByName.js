const axios= require ('axios')
const {Videogame}= require('../db.js')
const {API_KEY, URL_NAME}= process.env;
const {Op}= require ('sequelize')
//puedo usar el operador Op.iLike para buscar por las letras que me dan en la db
const getVideogameByName = async (name)=>{
//---------------Constantes-------------------//
    const URL= `${URL_NAME}${name}&key=${API_KEY}`   
//axios usa la url especificada en .env con la variable "game" guardada previamente y devuelve todos los videjuegos
//-----------Logica de la funcion------------//
try {

//Primero reviso si la db tiene algun juego que se corresponda con los parametros recibidos
    let videogamesByNameDB= await Videogame.findAll({
        where:{
            name:{
                [Op.iLike]:`%${name}%`,
            },
        },
    })

//luego consigo la informacion de la URL mediante axios
    const {data} = await axios.get(URL)

//guardo los resultados de buscar en la base de datos en un array y los de data, haciendo una copia de todos los resultados
    let foundedGames = [...videogamesByNameDB, ...data.results];
//Si es que el array anterior tiene mas de 15 resultados se aplica el slice en el index 15, permitiendo que el tamaño pase a ser de 15.
    if(foundedGames.length>15){
        foundedGames=foundedGames.slice(0, 15);
    }
    const allVideogames = foundedGames.map((element) => {
        return {
          id: element.id,
          name: element.name,
          description: element.description,
          platforms: element.platforms,
          image: element.background_image,
          released: element.released,
          rating: element.rating,
          genres: element.genres,
        };
      });
  
    if (allVideogames.length !== 0) {
        return allVideogames;
    }
    return 'Not Found'
}catch(error){
    return {error:error.message}
}
}
module.exports=getVideogameByName;