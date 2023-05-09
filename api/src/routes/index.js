const { Router } = require('express');
const {getGenres}= require('../controllers/GetGenre')
const {getVideogamesControl}= require('../controllers/GetVideogames')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', getVideogamesControl)
router.get('/genres', getGenres)

module.exports = router;
