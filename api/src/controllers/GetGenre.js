const {Genre} = require('../db')

const savedGenres= require('../Helpers/GenresToDb')
savedGenres();
//La linea anterior es para guardar los valores dados a Genre en la APi dentro de la db
const getGenres= async (req, res)=>{
    try {
        const genres = await Genre.findAll();
        res.status(200).json(genres);
    } catch (error) {
        res.status(404).json({error:error})        
    }
}
module.exports= {
    getGenres
}