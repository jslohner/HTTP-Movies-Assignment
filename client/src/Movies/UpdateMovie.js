import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

function UpdateMovie(props) {
  const [movie, setMovie] = useState(initMovie);
  // const [updateFormValues, setUpdateFormValues] = useState(initMovie);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        setMovie(res.data);
        // setUpdateFormValues(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const changeHandler = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const starChangeHandler = e => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star) => (star === e.target.name ? movie.stars[star] = e.target.value : star))
    });
  };

  return (
    <div className="update-movie-page">
      <h2>Update Movie</h2>
      {!movie && <h3>Loading Movie Data...</h3>}
      <form className="update-movie-form">
        <input value={movie.title} onChange={changeHandler} type="text" name="title" placeholder="Title"/>
        <input value={movie.director} onChange={changeHandler} type="text" name="director" placeholder="Director"/>
        <input value={movie.metascore} onChange={changeHandler} type="number" name="metascore" placeholder="Metascore"/>
        <h4>Stars</h4>
        {movie.stars.length > 0 && movie.stars.map((star, idx) => {
          return <input key={idx} value={star} onChange={starChangeHandler} type="text" name={star} placeholder={`Star ${idx + 1}`}/>
        })}
      </form>
    </div>
  );
}

export default UpdateMovie;

// /api/movies/id
// title, director, metascore, stars
// id - num

// title - string
// director - string
// metascore - num
// stars - array
