
const getVideogames = require('../Helpers/videogamesBase');
//La linea atenrior es para guardar los valores dados a Genre en la APi dentro de la db


const getVideogamesControl= async (req, res)=>{
    try {
        const videogames = await getVideogames();
        return res.status(200).json(videogames);
    } catch (error) {
        return res.status(404).json({error:error})        
    }
}
module.exports= {
    getVideogamesControl
}