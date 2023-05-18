const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const { API_KEY, URL } = process.env;

// función para buscar en la API o revisar la DB si existe dicho juego
const getVideogames = async () => {

  let realURL = `${URL}?key=${API_KEY}&page_size=20`;
  // defino la URL donde se estará trabajandoy la limito a 20, de esta forma lograre luego llegar a 100 resultados
  let allVideogames = [];
  // este array es donde se guardarán los videojuegos en caso de que no estén en la DB pero sí en la API
  try {
    let response = await axios.get(realURL);
    let info = response.data.results;
    // info.data.results son los juegos que tiene la API. Como en un principio trae 40 hago un while para repetir la accion hasta llegar a 100

    while (info.length < 100 && response.data.next) {
      realURL = response.data.next;
      response = await axios.get(realURL);
      info = [...info, ...response.data.results];
    }
//una vez obtenidos los datos requeridos los instancio
    allVideogames = info.map((element) => {
      return {
        id: element.id,
        name: element.name,
        description: element.description,
        platforms: element.platforms,
        image: element.background_image,
        released: element.released,
        rating: element.rating,
        genres: element.genres,
      };
    });

    // una vez instanciados los juegos, se busca que existan en la DB y que estos se relacionen con la tabla de géneros
    const games = await Videogame.findAll({
      include: [
        {
          model: Genre,
          as: 'genres',
          through: {
            attributes: [],
          },
        },
      ],
    });

    // si los juegos existen en la DB, se reemplaza el array de allVideogames por dicha información
    if (games.length) allVideogames = [...games, ...allVideogames];

    // se retorna todos los juegos que estén dentro del array "allVideogames"
    return allVideogames;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getVideogames;
