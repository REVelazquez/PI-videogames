
const Validation = (inputs)=>{
  const errors={}
  // Errores en nombre
  if(!inputs.name){
    errors.name= "This field is obligatory"
  }else if(inputs.name.length <3){
    errors.name='The name is too short'
  }else if(inputs.name.length >70){
    errors.name='The name is too large'
  }else{
    errors.name= ''
  }
  //errores en description
  if(!inputs.description){
    errors.description='This field is obligatory'
  }else if(inputs.description.length <10){
    errors.description='The description is too short'
  }else if(inputs.description.length >400){
    errors.description='The description is too large'
  }else{
    errors.description=''
  }
  //errores en rating
  if(!inputs.rating){
    errors.rating='This field is obligatory'
  }else if(inputs.rating < 0){
    errors.rating="Even if you don't like the game the min rating is 0"
  }else if(inputs.rating >5){
    errors.rating='Sadly the max rating is 5'
  }else{
    errors.rating= ''
  }
  return errors
}
export default Validation;
