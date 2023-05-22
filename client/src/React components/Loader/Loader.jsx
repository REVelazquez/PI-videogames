
import Style from './Loader.module.css'

const Loader = ()=>{
return(
    <div  className={Style.container}  >
        <div className={Style.gifCont}>
        <h1 className={Style.loading}> Loading . . .</h1>
        </div>
    </div>
)
};

export default Loader