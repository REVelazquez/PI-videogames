const {Videogame, Genre}= require ('../db')
const {Op } = require ('sequelize')
const newVideogame=async (name, description, platforms, image, release, rating, genre)=>{    
    try {
    let newGame;
    const foundVideogame = await Videogame.findOne({
        where:{
            name: name            
            },
    })  
    if(foundVideogame) return 'The videogame already exists!';
    if(!name || !description || !rating || !genre) throw Error('You need an obligatory data') 

    newGame = await Videogame.create({
        name:name,
        description:description,
        platforms:platforms,
        image:image,
        release:release,
        rating:rating,
    })
       await genre.forEach(async (genr) => {
        let newGenre= await Genre.findOne({where: {name:genr}});
        if (!newGenre) newGenre= await Genre.create({name:genr})
        await newGame.addGenre(newGenre)
       });
        console.log(newGame);
        return newGame
    } catch (error) {
        return {error:error.message}
    }
}

module.exports= {
    newVideogame
};