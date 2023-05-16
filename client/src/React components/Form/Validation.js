const regex= /^[a-zA-Z0-9 ,.()?!¿¡-]*$/
const  regexDate= /^(0[1-9]|1\d|2\d|3[01])[-\/](0[1-9]|1[0-2])[-\/](19|20)\d{2}$/
const Validation = (gameData, error, setError)=>{

////Errores en nombre
    if(!regex.test(gameData.name)) {setError({...error, name: 'Invalid Name'})}}
    if(gameData.name.length === 0){setError({...error, name: 'The field is empty!'})}
    if(gameData.name.length >70){setError({...error, name: 'The name of the game is too large!'})}
    
//// Errores en descripcion 
    if(gameData.description.length ===0 ){setError({...error, description: 'This is an obligatory element'})}
    if(gameData.description.length >= 400){setError({...error, description: 'The description is too large!'})}
//// Errores en rating
    if(gameData.rating > 0){setError({...error, description:"Even if you don't like the game, minimum rating is 0"})}
    if(gameData.rating < 5){setError({...error, description:'Sadly the max rate is 5'})}

//// Errores en genres
    if(gameData.genres.length === 0){setError({...error, genres:'You need to choose at least one genre'})}
    if(gameData.genres.length >3 ){setError({...error, genres: "There's too many genres!"})}
/// Errores en date:
    if(gameData.release && !regexDate.test(gameData.name)){setError({...error, rating:"The date must be in the patter dd/mm/yyyy or dd-mm-yyyy"})}

export default Validation