import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGamesById } from '../../redux/actions';
import { useParams } from "react-router-dom";

const Detail = () => {
  let z = 1;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getGamesById(id))
  },[id, dispatch])

  const detail = useSelector(state => state.detail);

  console.log(detail);

  return (
    <div>
      <img src={detail.image} alt={`Image of ${detail.name} not found`} />
      <h1>Id</h1>
      <p>{detail.id}</p>
      <h1>Name</h1>
      <p>{detail.name}</p>
      <h1>Platforms</h1>
      {detail.platforms && detail.platforms.map(platform => (
        <p key={'a' + z++} value={platform.name}>{platform.name}</p>
      ))}
      <h1>Description</h1>
      <p>{detail.description}</p>
      <h1>Released</h1>
      <p>{detail.released}</p>
      <h1>Rating</h1>
      <p>{detail.rating}</p>
      <h1>Genres</h1>
      {detail.genres && detail.genres.map(genre => (
        <p key={'a' + z++} value={genre.name}>{genre.name}</p>
      ))}
    </div>
  );
}

export default Detail;
