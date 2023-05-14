const { Router } = require('express');
const {getGenres}= require('../controllers/GetGenre')
const {getVideogamesControl}= require('../controllers/GetVideogames')
const {getGameById} = require('../controllers/GetVideogamesById')
const {postNewVideogame} = require ('../controllers/PostVideogame')
// const {getVideogameByName}= require('../Helpers/videogamesByName')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogamesControl)
router.get('/genres', getGenres)
router.get('/videogames/:idVideogame', getGameById)
router.post('/videogames', postNewVideogame)

module.exports = router;
