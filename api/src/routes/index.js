const { Router } = require('express');
const {getGenres}= require('../controllers/GetGenre')
const {getVideogamesControl}= require('../controllers/GetVideogames')
const {getGameById} = require('../controllers/GetVideogamesById')
const {getVideogamesByName}= require('../controllers/GetVideogameByName')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogamesControl)
router.get('/genres', getGenres)
router.get('/videogames/:idVideogame', getGameById)
router.get('/videogames/name?="..."', getVideogamesByName)

module.exports = router;
