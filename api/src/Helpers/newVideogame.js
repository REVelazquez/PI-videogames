const {Videogame, Genre}= require ('../db')
const {Op } = require ('sequelize');
const newVideogame=async (name, description, platforms, image, release, rating, genre)=>{    
    try {

    let genreDb = null;
    let newGame;
    const foundVideogame = await Videogame.findOne({
        where:{
            name: name            
        },
    })  
    console.log(name, description, rating, genre)
    if(foundVideogame) return 'The videogame already exists!';
    if(!name || !description || !rating || !genre) throw Error('You need an obligatory data') 

    newGame = await Videogame.create({
        name:name,
        description:description,
        platforms:platforms,
        image:image,
        release:release,
        rating:rating,
        created:true

    })
        const foundGenre= await Genre.findOne({
            where: {
                name:{
                    [Op.iLike]: `%${genre}%`
                }
            },
        })
        if (!foundGenre) {
            genreDb = await Genre.create({
                name: genre,
            });
            newGame.addGenre(genreDb);
            return newGame;
        } else {
            genreDb = foundGenre;
            newGame.addGenre(genreDb);
        }
        Videogame.sync({alter:true})
        return newGame
    } catch (error) {
        return {error:error.message}
    }
}

module.exports= {
    newVideogame
};