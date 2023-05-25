import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGamesById } from '../../redux/actions';
import { useParams } from "react-router-dom";
import Style from './Detail.module.css'
import Loader from "../Loader/Loader";

const Detail = () => {
  let z = 1;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading]= useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch(getGamesById(id))
    .then(()=>setLoading(false))
  },[id, dispatch])

  const detail = useSelector(state => state.detail);
  console.log({detail});
  const descripcionSinEtiq = detail.description?.replace(/<[^>]+>/g, "");

  if(loading) return(<Loader/>)

  return (
    <div key='Detail container' className={Style.wrapper}>
      <h1 key='Title' className={Style.name}>{detail.name}</h1>
      <div key='details' className={Style.details}>
          <h2 key='platTittle' className={Style.ArrayTittles}>Platforms</h2>
          <div key='platCont' className={Style.arrayCont}>
          {
          !Array.isArray(detail.platforms)? <p key='Platform created game' className={Style.platformCread}>{detail.platforms}</p>
          :(detail.platforms && detail.platforms.map(({platform}) => (
            <p key={'a' + z++} value={platform.name} className={Style.arrays}>{platform.name}</p>
          )))
          }
        </div>
          <h1 key='GenresTittle' className={Style.ArrayTittles}>Genres</h1>
        <span key='GenresCont' className={Style.arrayCont}>
          {detail.genres && detail.genres.map(genre => (
            <p key={'a' + z++} className={Style.arrays}>{genre.name}</p>
          ))}
        </span>
          <div>
          <img key='Dimg' src={detail.image} className={Style.image} alt={`Img of ${detail.name} not found`} />
          <h1 key='DescTittle' className={Style.descTittle}>Description</h1>
          <p key='descrip' className={Style.descrip}>{descripcionSinEtiq}</p>
          </div>
          <span key='ReleaseCont' className={Style.numbCont}>
          <h4 className={Style.numbTittle}>Released</h4>
          <p className={Style.numbers}>{detail.released}</p>
          <h4 className={Style.numbTittle}>Rating</h4>
          <p className={Style.numbers}>{detail.rating}</p>
          <h4 className={Style.numbTittle}>Id: </h4>
          <p className={Style.numbers}>{detail.id}</p>
          </span>
        </div> 
      </div>
  )  
}

export default Detail;
