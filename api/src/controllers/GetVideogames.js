const {Videogame} = require('../db')

const getVideogames = require('../Utils/videogamesBase');
//La linea atenrior es para guardar los valores dados a Genre en la APi dentro de la db
getVideogames();

const getVideogamesControl= async (req, res)=>{
    try {
        const videogames = await Videogame.findAll();
        res.status(200).json(videogames);
    } catch (error) {
        res.status(404).json({error:error})        
    }
}
module.exports= {
    getVideogamesControl
}