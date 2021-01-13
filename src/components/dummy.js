import logo from './logo.svg';
import {useState,useEffect} from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import "bootstrap/dist/css/bootstrap.min.css"

const  App=()=> {
   const [ movies , SetMovies]=useState([]);
   const [ searchValue,  setSearchValue]=useState('');
   const [ Favourites ,   setFavourites] = useState([]);
   const getMovierequest = async (searchValue)=> {
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=ee5cef08`; 
 
    const response = await fetch(url); 
    const responseJson = await response.json();

    if(responseJson.Search)
    {
     SetMovies(responseJson.Search)
     }
   }
   useEffect(()=>{
    getMovierequest(searchValue);
   },[searchValue]);

useEffect(()=>{
  const movieFavourites=JSON.parse(
localStorage.getItem('react-movie-app-favourites')
    )
  setFavourites(movieFavourites)
},[]);
const saveToLocalStorage=(items)=>{
localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
}

const addFavouriteMovie=(movie)=>{
const newFavourites =[...Favourites,movie];
setFavourites(newFavourites);
saveToLocalStorage(newFavourites);
}
const removeFavouriteMovie=(movie)=>{
  const newFavouriteList=Favourites.filter(
    (favourite)=>favourite.imdbID!==movie.imdbID);
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
}
  return (
    <div className="container-fluid  movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4">
       <MovieListHeading heading='Movies'/>
       <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
      <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} FavouriteComponent={AddFavourites}/>
      </div>
       <h5>Favourites</h5>
      <div className="row">
      <MovieList movies={Favourites} handleFavouritesClick={removeFavouriteMovie} FavouriteComponent={RemoveFavourites}/>
      </div>
    </div>
  );
}

export default App;
