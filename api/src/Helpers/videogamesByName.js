const axios= require ('axios')
const {Videogame}= require('../db.js')
const {API_KEY}= process.env;
const {Op}= require ('sequelize')
//puedo usar el operador Op.iLike para buscar por las letras que me dan en la db
const getVideogameByName = async (game)=>{

    const URL= `https://api.rawg.io/api/games?search=${game}&key=${API_KEY}`   

//axios usa la url especificada en .env con la variable "game" guardada previamente y devuelve todos los videjuegos

//-----------Logica de la funcion------------//
try {
    let videogamesByNameDB= await Videogame.findAll({
        where:{
            include:{
                [Op.iLike]:`%${game}`,
            },
        },
    })
    const {data} = await axios.get(URL)

    const foundedGames = [...videogamesByNameDB, ...data.results];
    if(foundedGames.length>15){
        foundedGames=foundedGames.slice(0, 15);
    }
    if (foundedGames.length !== 0) return foundedGames
    return 'Not Found'
}catch(error){
    return {error:error}
}
}
module.exports=getVideogameByName;