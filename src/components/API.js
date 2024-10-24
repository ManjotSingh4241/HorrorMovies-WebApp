import React, { useEffect, useState, useCallback } from "react"; 
import Navbar from "../components/Navbar";
import './styles.css'

function API() {
  const [movieList, setMoviesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current movie index
  const [query, setQuery] = useState(""); // State for search query

  const getMovies = async (searchQuery = "") => {
    const endpoint = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=84ef156ee5f48862594a54e87593e106&with_genres=27&query=${searchQuery}`
      : `https://api.themoviedb.org/3/trending/movie/week?api_key=84ef156ee5f48862594a54e87593e106`;

    const response = await fetch(endpoint);
    const json = await response.json();
    return json.results;
  };

  const loadMovies = useCallback(async (searchQuery = "") => {
    const newMovies = await getMovies(searchQuery);
    setMoviesList(newMovies);
    setCurrentIndex(0); // Reset index to 0 when loading new movies
  }, []);

  useEffect(() => {
    loadMovies(); 
  }, [loadMovies]); // Added loadMovies as a dependency

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    loadMovies(query); // Load new results based on the query
  };

  const handleNext = () => {
    if (currentIndex < movieList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "100px", overflow: "hidden" }}>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for horror movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "black",
                color: "white"
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                marginLeft: "10px",
                borderRadius: "5px",
                backgroundColor: "rgba(255, 0, 0, 0.7)",
                color: "white",
                cursor: "pointer"
              }}
            >
              Search
            </button>
          </form>
        </div>

        {movieList.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "300px",
                height: "400px",
                marginTop: "30px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                background: "linear-gradient(135deg, #4e1b1b, #7a3d3d)", // Dark red gradient for horror
              }}
            >
              <img
                style={{ width: "100%", height: "250px" }}
                src={`https://image.tmdb.org/t/p/w500${movieList[currentIndex].poster_path}`}
                alt={movieList[currentIndex].title}
              />
              <div style={{ padding: "10px", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.2em", margin: "0" }}>{movieList[currentIndex].title}</h3>
                <p
                  style={{
                    fontSize: "1em",
                    color: "white",
                    margin: "5px 0",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: "5px",
                    borderRadius: "5px",
                    fontFamily: "Creepster, cursive", // Change this to your preferred creepy font
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)"
                  }}
                >
                  Rating: {movieList[currentIndex].vote_average ? movieList[currentIndex].vote_average.toFixed(1) : "N/A"}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                style={{ marginRight: "10px", padding: "10px 20px", backgroundColor: "rgba(255, 0, 0, 0.7)", color: "white", border: "none", borderRadius: "5px" }}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= movieList.length - 1}
                style={{ padding: "10px 20px", backgroundColor: "rgba(255, 0, 0, 0.7)", color: "white", border: "none", borderRadius: "5px" }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default API;
