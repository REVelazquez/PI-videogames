const {newVideogame}= require('../Helpers/newVideogame')
const {Videogame}= '../db'
const postNewVideogame = async(req, res)=>{
    const {name, description, platforms, image, release, rating, genre}= req.body

    try {
    const videogame = await newVideogame (name, description, platforms, image, release, rating, genre)
    return res.status(200).json(videogame)
} catch (error) {
    return res.status(404).json({error:error.message})
}}

module.exports= {
    postNewVideogame
};