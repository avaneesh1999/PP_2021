import React, { Component } from "react";
// import { getMovies } from "./MoviesService";
import axios from "axios";
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      currSearchText: "",
      currPage: 1,
      genres: [{ _id: "abcd", name: "All Genres" }],
      cGenre: "All Genres",
    };
  }
  async componentDidMount() {
    console.log("Component DID Mount");
    let res = await axios.get(
      "https://backend-react-movie.herokuapp.com/movies"
    );
    let genreRes = await axios.get(
      "https://backend-react-movie.herokuapp.com/genres"
    );
    // console.log(res.data.movies);
    console.log(genreRes.data.genres);
    this.setState({
      movies: res.data.movies,
      genres: [...this.state.genres, ...genreRes.data.genres],
    });
  }
  handleChange = (e) => {
    let val = e.target.value;
    console.log(val);
    this.setState({
      currSearchText: val,
    });
  };
  onDelete = (id) => {
    let arr = this.state.movies.filter(function (movieObj) {
      return movieObj._id !== id;
    });
    // console.log(arr);
    this.setState({
      movies: arr,
    });
  };
  sortByRatings = (e) => {
    let className = e.target.className;
    console.log(className);
    let sortedMovies = [];
    if (className === "fa fa-sort-asc") {
      //ascending order
      sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
        return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
      });
    } else {
      //descending order
      sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
        return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
      });
    }
    this.setState({
      movies: sortedMovies,
    });
  };
  sortByStock = (e) => {
    let className = e.target.className;
    console.log(className);
    let sortedMovies = [];
    if (className === "fa fa-sort-asc") {
      //ascending order
      sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
        return movieObjA.numberInStock - movieObjB.numberInStock;
      });
    } else {
      //descending order
      sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
        return movieObjB.numberInStock - movieObjA.numberInStock;
      });
    }
    this.setState({
      movies: sortedMovies,
    });
  };
  handlePageChange = (pageNumber) => {
    this.setState({ currPage: pageNumber });
  };
  handleGenreChange = (genre) => {
    this.setState({
      cGenre: genre,
    });
  };
  render() {
    console.log("render");
    let { movies, currSearchText, currPage, genres, cGenre } = this.state; //ES6 destructuring
    let limit = 4;
    let filteredArr = [];
    if (currSearchText === "") {
      filteredArr = movies;
    } else {
      filteredArr = movies.filter(function (movieObj) {
        let title = movieObj.title.toLowerCase();
        console.log(title);
        return title.includes(currSearchText.toLowerCase());
      });
    }
    if (cGenre != "All Genres") {
      filteredArr = filteredArr.filter(function (movieObj) {
        return movieObj.genre.name == cGenre;
      });
    }
    let numberofPage = Math.ceil(filteredArr.length / limit);
    let pageNumberArr = [];
    for (let i = 0; i < numberofPage; i++) {
      pageNumberArr.push(i + 1);
    }
    let si = (currPage - 1) * limit;
    let ei = si + limit;
    filteredArr = filteredArr.slice(si, ei);
    return (
      //JSX
      <>
               
                <h1>Hello</h1>
            </>
    )
  }
}

{
  /* <li className="page-item"><a class="page-link" href="#">1</a></li>
    <li className="page-item active" aria-current="page">
      <a className="page-link" href="#">2</a>
    </li>
    <li className="page-item"><a class="page-link" href="#">3</a></li> */
}
