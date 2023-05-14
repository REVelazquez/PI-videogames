
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getGame, getGenres} from '../../redux/actions'


const Home = () =>{
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getGame())
    }, []) 
    let videogames=useSelector((state)=>state.allVideogames)

    useEffect(()=>{
        dispatch(getGenres())
    }, [])
    
    let genres= useSelector(state=>state.genres)
    console.log(genres);


    return(
        <div>
            {
                videogames.map(({id, name, image, genres})=>{
                    return(
                        <Card 
                            key={id}
                            image={image}
                            name={name}
                            genres={genres?.name}
                        />
                    )
                })
            }
        </div>
    )

}

export default Home