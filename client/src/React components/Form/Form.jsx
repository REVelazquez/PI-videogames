import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGames } from "../../redux/actions";
import Validation from "./Validation";
import style from './Form.module.css'

const Form = () => {
  // Constantes y variables
  const dispatch = useDispatch();
  let allGenres= useSelector(state=>state.genres)
    let z= 1
  // Estados
  const [genres, setGenres]=useState([])
  const [disable, setDisable]= useState(true)

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    release: "",
    rating: '',
    created: true,
    genres: [],
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    release: "",
    rating: "",
    genres: "",
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

//handlers
const handleOnChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });

    setError(Validation({
      ...inputs,
      [event.target.name]: event.target.value
    }))

    if(inputs.name && inputs.description && inputs.rating && genres.length >0 ){ setDisable(false)}
}

const handleSubmit= (event)=>{
    event.preventDefault();
    console.log(inputs);
  if(error.name || error.description || error.rating || genres.length === 0){
    alert('Something is missing!')

  }else dispatch(postGames(inputs))
    alert('Your game has been sumited!')
    setInputs({
      name:'',
      description:'',
      platforms:'',
      image:'',
      release:'',
      rating:'',
      genres:[],
      created:true,      
    })
    setGenres([])
}

const handleGenresChanges= event=>{
  if(event.target.checked){
    setGenres([...genres, event.target.value])
    setInputs({...inputs, genres:[...genres, event.target.value]})
  }else {
    const updatedGenres = genres.filter((g) => g !== genres);
    setGenres(updatedGenres);
    setInputs({ ...inputs, genres: updatedGenres });
    } 
  }
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" disabled={disable} >Submit!</button>
    </form>
  );
}
export default Form;
