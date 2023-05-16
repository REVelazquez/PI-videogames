import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../../redux/actions"


const Form = ()=>{
//constantes y variables
const dispatch=useDispatch()
let z=1

//estados
const [gameData, setGameData]= useState({
    name:'',
    description:'',
    release: '',
    genres:'',
    image:'',
    rating:'',
    platforms: '',
    created: true
})

const [error, setError]= useState({
    name:'',
    description:'',
    release: '',
    genres:[],
    image:'',
    rating:'',
    platforms: '',
})

useEffect(()=>{
    dispatch (getGenres())
}, [])

let allGenres= useSelector(state=>state.genres)


//handlers
const handleOnChange = event =>{
    if(event.target.name === gameData.genres){
        const selectedGenre = event.target.value
        let updatedGenres = []
        updatedGenres = [...gameData.genres]
        updatedGenres.push(selectedGenre)

        setGameData({
            ...gameData,
            genres:updatedGenres
        })
    }
    setGameData({
        ...gameData,
        [event.target.name]: event.target.value
    })

}
const handleOnSubmit = event=>{
    event.preventDefault()
}

const handleButtonClick = event=>{
    const selectedGenre= gameData.genres
    if(selectedGenre){

    }
}

return(
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="Name">Name</label> 
        <input type="text" name='name' value={gameData.name} onChange={handleOnChange}/>
        <hr />
        <label htmlFor="Release">Release</label>
        <input type="number" name="release" onChange={handleOnChange} value={gameData.release} />
        <hr />
        <label htmlFor="Genres">Genres</label>
        <select name="genres" id="Genres Form" onChange={handleOnChange}>
            <option value= {null} >None</option>
        { allGenres?.map(genre=><option key= {'a'+z++} value={genre.name}>{genre.name}</option>
                    )}
        </select>
        <button value={gameData.genres} onClick={handleButtonClick}></button>
        <hr />
        <label htmlFor="Description">Description</label>
        <textarea type='text'name='description' placeholder={'Write a description here'} onChange={handleOnChange} >{gameData.description}</textarea>
        <hr />
        <label htmlFor="Image">Image</label>
        <input type="text" name='image' onChange={handleOnChange} value={gameData.image} />
        <hr />
        <label htmlFor="Rating">Rating</label>
        <input type="number" name="rating" onChange={handleOnChange} value={gameData.rating} />
        <hr />
        <label htmlFor="">Platforms</label>
        <input type="text" onChange={handleOnChange}value={gameData.platforms} />
        <hr />

        <button type='submit'>Submit!</button> 


    </form>
)
}


export default Form