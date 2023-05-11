
const getVideogames = require('../Helpers/videogamesBase');
const getVideogameByName = require ('../Helpers/videogamesByName')
//La linea atenrior es para guardar los valores dados a Genre en la APi dentro de la db


const getVideogamesControl= async (req, res)=>{
    try {
        const videogames = await getVideogames();
        return res.status(200).json(videogames);
    } catch (error) {
        return res.status(404).json({error:error})        
    }
}

const getVideogamesByName= async(req, res)=>{
    const{name}=req.query;
    try {
        const videogames= name? await getVideogameByName(name):await getVideogames
        return res.status(200).json(videogames)
    } catch (error) {
        return res.status(404).json({error:error})
    }
}
module.exports= {
    getVideogamesControl,
    getVideogamesByName
}