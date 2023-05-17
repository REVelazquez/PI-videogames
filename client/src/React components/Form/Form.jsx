import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import Validation from "./Validation";
import style from './Form.module.css'

const Form = () => {
  // Constantes y variables
  const dispatch = useDispatch();
  let allGenres= useSelector(state=>state.genres)
  

  let z= 1
  // Estados
  const [inputs, setinputs] = useState({
    name: "",
    description: "",
    release: "",
    image: "",
    rating: '',
    platforms: "",
    genres: [],
    created: true,
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    release: "",
    image: "",
    rating: "",
    platforms: "",
    genres: "",
  });
  const [genres, setGenres]=useState([])


  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);



//handlers
const handleOnChange = (event) => {
    setinputs({
      ...inputs,
      [event.target.name]: event.target.value
    });

    Validation({...inputs, [event.target.name]:event.target.value}, error, setError)
  
}


const handleOnSubmit= (event)=>{
    event.preventDefault();
}


const handleGenresChanges= event=>{
  if(event.target.checked){
    setGenres([...genres, event.target.value])
    setinputs({...inputs, genres:[...genres, event.target.value]})
  }
}
console.log(inputs.name)
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="Name">Name</label>
        <input type="text" name="name" value={inputs.name} onChange={handleOnChange} />
        <p>{error.name}</p>
      </div>
       <div>
        <label htmlFor="Release">Release</label>
        <input type="date" name="release" onChange={handleOnChange} value={inputs.release} />
        <p>{error.release}</p>
      </div>
      <div>
          <h1 className={style.genres}>Genres:</h1 >
            <div className={style.genresOrder}>
              {allGenres.map((e) => (
                    <div className={style.genresContainer}>
                      <ul className={style.genrestags}>
                        <li>
                          <input
                            onChange={handleGenresChanges}
                            type="checkbox"
                            key={'a'+ z++}
                            id={'a'+ z++}
                            value={e.name}
                          />
                          <label for={'a'+ z++}>{e.name}</label>
                        </li>
                      </ul>
                    </div>
              ))}
        </div>
      </div>
      <div>
        <label htmlFor="Description">Description</label>
        <textarea type="text"name="description"placeholder="Write a description here"onChange={handleOnChange} value={inputs.description}>
        </textarea>
        <p>{error.description}</p>
      </div>
      <div>
        <label htmlFor="Image">Image</label>
        <input type="text" name="image" onChange={handleOnChange} value={inputs.image} />
      </div>
      <div>
        <label htmlFor="Rating">Rating</label>
        <input type="number" name="rating" onChange={handleOnChange} value={inputs.rating} />
        <p>{error.rating}</p>
      </div>
      <div>        
        <label htmlFor="">Platforms</label>
        <input type="text" onChange={handleOnChange} value={inputs.platforms} />
      </div>
      <button type="submit" >Submit!</button>
    </form>
  );
      }
export default Form;
