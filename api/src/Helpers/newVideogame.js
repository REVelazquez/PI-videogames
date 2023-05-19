const { Op } = require('sequelize')
const {Videogame, Genre}= require ('../db')
const newVideogame=async (name, description, platforms, image, release, rating, genre)=>{    
    try {

//con este metodo de sequelize me aseguro de que si hay un videojuego en la db lance el error, ya que devuelve un 
//valor que no es booleano de otra forma crea un videojuego en la db con los valores recibidos por "default"
    let [newGame, boolean] = await Videogame.findOrCreate({
        where:{
            name:{
                [Op.iLike]: `%${name}`
            },
        },
        defaults:{
            name,
            description,
            platforms,
            image,
            release,
            rating,
            genre,
        },
    })
    if(!boolean) throw Error('The fame already exist')
    } catch (error) {
        return {error:error.message}
    }
}

module.exports= {
    newVideogame
};