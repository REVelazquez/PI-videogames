import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import {getVideogames} from '../../redux/actions'


const Home = () =>{
    const selector= useSelector;

    const allVideogames= selector(state.allVideogames)
    
    return(
        <div>
            {
                allVideogames.map(({id, name, image, genres})=>{
                    return(
                        <Card 
                            key={id}
                            id={id}
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


export default Home;