
const Validation = (inputs, error, setError)=>{

  // Errores en nombre
  if(inputs.name.length < 3){
    setError({...error, name:'The name is too short!'})
  }
  else if (inputs.name.length > 70) {
    setError({ ...error, name: 'The name of the game is too large!' });
  }else {setError({...error, name:''})}
  // Errores en descripcion
  if(inputs.description.length <= 10){
    setError({...error, description:'The description is too short!'})
  }
  else if (inputs.description.length > 400) {
    setError({ ...error, description: 'The description is too large!' });
  }else{setError({...error, description:''})}
  // Errores en rating
  if (inputs.rating < 0) {
    setError({ ...error, rating: "Even if you don't like the game, minimum rating is 0" });
  }
  else if (inputs.rating > 5) {
    setError({ ...error, rating: 'Sadly the max rate is 5' });
  }else{ setError({...error, rating: ''})}
}

export default Validation;
