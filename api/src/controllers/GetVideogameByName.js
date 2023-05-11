const {getVideogameByName} = require ('../Helpers/videogamesByName')

const getVideogamesByName = async(req, res)=>{
    try {
        const videogames=await getVideogameByName();
        return res.status(200).json(videogames)
    } catch (error) {
        return res.status(404).json({error:error})
    }
}

module.exports= {
    getVideogamesByName
}