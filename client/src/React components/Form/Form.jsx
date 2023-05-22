import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGames } from "../../redux/actions";
import Validation from "./Validation";
import Style from './Form.module.css'
import Loader from "../Loader/Loader";

const Form = () => {
  // Constantes y variables
  const dispatch = useDispatch();
  let allGenres= useSelector(state=>state.genres)
    let z= 1
  // Estados

  const [loading, setLoading]= useState(false)
  const [genre, setGenre]=useState([])
  const [disable, setDisable]= useState(true)

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    release: "",
    rating: '',
    created: true,
    genre: [],
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    release: "",
    rating: "",
    genre: "",
  });

  useEffect(() => {
    setLoading(true)
    dispatch(getGenres())
    .then(setLoading(false))
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

    if(inputs.name && inputs.description && inputs.rating && genre.length >0 ){ setDisable(false)}
}

const handleSubmit= (event)=>{
    event.preventDefault();
    console.log(inputs);
  if(error.name || error.description || error.rating || genre.length === 0){
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
      genre:[],
      created:true,      
    })
    setGenre([])
}

if(loading)return <Loader/>
const handleGenresChanges= event=>{
  if(event.target.checked){
    setGenre([...genre, event.target.value])
    setInputs({...inputs, genre:[...genre, event.target.value]})
  }else {
    const updatedGenre = genre.filter((g) => g !== genre);
    setGenre(updatedGenre);
    setInputs({ ...inputs, genre: updatedGenre });
    } 
  }
  return (
    <form onSubmit={handleSubmit}key='form' className={Style.form}>
      <span className={Style.tittleNinputC}>
        <label htmlFor="Name" className={Style.tittles}>Name</label>
          <input type="text" name="name" value={inputs.name} className={Style.inputs} onChange={handleOnChange} />
          <p key='errors' className={Style.errors}>{error.name}</p>
      </span>
      <div>
          <label className={Style.tittles}>Genres:</label >
            <div className={Style.genresOrder}>
              {allGenres.map((e) => (
                <div className={Style.genresContainer}>
                      <ul className={Style.genrestags}>
                        <li key='genresList' className={Style.listGenres}>
                          <input 
                            onChange={handleGenresChanges}
                            type="checkbox"
                            key={'a'+ z++}
                            id={'a'+ z++}
                            value={e.name}
                            className={Style.inpG}
                            />
                          <label for={'a'+ z++} className={Style.genres}>{e.name}</label>
                        </li>
                      </ul>
                    </div>
              ))}
        </div>
              <p key='errors' className={Style.errors}>{error.genre}</p>
      </div>
      <span className={Style.tittleNinputC}>
        <label htmlFor="Release" className={Style.tittles}>Release</label>
              <input type="date" name="release" className={Style.release} onChange={handleOnChange} value={inputs.release} />
        <label htmlFor="Description" className={Style.tittles}>Description</label>
          <textarea type="text"name="description"placeholder="Write a description here" className={Style.textArea} onChange={handleOnChange} value={inputs.description}></textarea>
            <p key='errors' className={Style.errors}>{error.description}</p>
        <label htmlFor="Image" className={Style.tittles}>Image</label>
          <input type="url" name="image"className={Style.inputs}  onChange={handleOnChange} placeholder='If you want enter an url' value={inputs.image} />
        <label htmlFor="Rating" className={Style.tittles}>Rating</label>
          <input type="number" name="rating"className={Style.inputs} placeholder='Add the rate with the arrows'  onChange={handleOnChange} value={inputs.rating} />
            <p key='errors' className={Style.errors}>{error.rating}</p>   
        <label htmlFor="" className={Style.tittles}>Platforms</label>
          <input type="text" className={Style.inputs} name="platforms" onChange={handleOnChange} value={inputs.platforms} />
      </span>
        <button type="submit" disabled={disable} >Submit!</button>
    </form>
  );
}
export default Form;
