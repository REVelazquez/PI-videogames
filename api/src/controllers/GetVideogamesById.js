const {Videogame} = require('../db')
const getVideogameById = require('../Helpers/videogamesById')

const getGameById = async (req, res)=>{
    try {
//--destructuro req para sacar la id y asi poder trabajar con la funcion definida en utils.
        let {idVideogame}=req.params
//--guardo el resultado de la funcion en una constante
        const videogame=await getVideogameById(idVideogame);
//--retorno la constante en un formato json
        return res.status(200).json(videogame)
    } catch (error) {
        return {error:error.message}       
    }
}

module.exports={
    getGameById
}