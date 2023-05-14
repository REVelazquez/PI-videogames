import { useState } from "react"

const Form = ()=>{

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

const [errors, setErrors]= useState({
    name:'',
    description:'',
    release: '',
    genres:'',
    image:'',
    rating:'',
    platforms: '',
})
const handleOnChange = event =>{
    setGameData({
        ...gameData,
        [event.target.name]: event.target.value
    })
}
const handleOnSubmit = event=>{
    event.preventDefault()
}

return(
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="Name">Name</label> 
        <input type="text" />
        <hr />
        <label htmlFor="Release">Release</label>
        <input type="text" />
        <hr />
        <label htmlFor="Genres">Genres</label>
        <input type="text" />
        <hr />
        <label htmlFor="Description">Description</label>
        <textarea>Whrite here the description</textarea>
        <hr />
        <label htmlFor="Image">Image</label>
        <input type="text" />
        <hr />
        <label htmlFor="Rating">Rating</label>
        <input type="text" />
        <hr />
        <label htmlFor="">Platforms</label>
        <input type="text" />
        <hr />

        <button type='submit'>Submit!</button>

    </form>
)
}


export default Form