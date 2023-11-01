import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import { Carousel } from "react-responsive-carousel";

// import "react-responsive-carousel/lib/styles/carousel.min.css";

const Search = ({ movies, initialRecommendations }) => {
  const [search, setSearch] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [recommendations, setRecommendations] = useState(
    initialRecommendations
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      // Fetch search results based on the search query
      const searchRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=78f9bd9f274e9174dfe1a019dca66e3c&query=${search}`
      );
      const searchData = await searchRes.json();

      // Update the state with search results
      setSearchedMovies(searchData.results);

      // Fetch recommendations based on the first movie from the search results
      if (searchData.results.length > 0) {
        const firstMovieId = searchData.results[0].id;
        const recommendationRes = await fetch(
          `https://api.themoviedb.org/3/movie/${firstMovieId}/recommendations?api_key=78f9bd9f274e9174dfe1a019dca66e3c`
        );
        const recommendationData = await recommendationRes.json();

        // Update the recommendations state with new recommendations
        setRecommendations(recommendationData.results);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch initial recommendations when the component mounts
    const fetchInitialRecommendations = async () => {
      if (movies.length > 0) {
        const firstMovieId = movies[0].id;
        const recommendationRes = await fetch(
          `https://api.themoviedb.org/3/movie/${search}/recommendations?api_key=78f9bd9f274e9174dfe1a019dca66e3c`
        );
        const recommendationData = await recommendationRes.json();
        // Update the recommendations state with initial recommendations
        setRecommendations(recommendationData.results);
      }
    };
    fetchInitialRecommendations();
  }, [search, movies]);

  return (
    <div className="p-5 md:p-14 border-2 border-r-0 border-l-0 border-black space-y-10">
      <Reveal>
        <h1 className="text-lg md:text-2xl font-bold capitalize underline text-center">
          Search For movies and shows below
        </h1>
      </Reveal>
      <div className="flex">
        <div className="flex w-full flex-col">
          <Reveal>
            <div className="flex">
              <input
                className="border border-gray-400 px-4 py-2 focus:outline-none focus:border-blue-500 shadow-md w-full rounded-tl-2xl text-lg"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type Here..."
                onKeyDown={handleKeyPress}
              />
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white text-md font-medium py-2 px-4 shadow-md tracking-wide transition-all rounded-tr-2xl"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </Reveal>
          <div className="flex flex-col border bg-white empty:border-none rounded-bl-2xl rounded-br-2xl p-2 border-blue-500 transition-all">
            {movies
              .filter((movies) => {
                const searching = search.toLowerCase();
                const movie = movies.original_title.toLowerCase();
                return (
                  searching && movie.includes(searching) && movie != searching
                );
              })
              .map((movie) => (
                <div
                  key={movie.id}
                  className="border-b-2 p-2 cursor-pointer hover:bg-gray-200 rounded text-lg"
                  onClick={() => setSearch(movie.original_title)}
                >
                  {movie.original_title}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* recommendation part start */}
      <Reveal>
        <div>
          <h2 className="text-lg md:text-2xl font-bold capitalize underline text-center">
            Recommended Movies
          </h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 space-y-5 md:space-y-0">
        {recommendations?.map((recommendation) => (
          <Reveal key={recommendation.id}>
            <div className="p-2 md:p-4 cursor-pointer rounded text-lg space-y-5 ">
              <div className="flex items-center justify-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                  alt="image"
                  height={300}
                  width={300}
                  className="rounded w-full shadow-xl"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4">
                <div className="text-xl">{recommendation.title}</div>
                {/* <div className="text-xl">{recommendation.release_date}</div> */}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {/* recommendation part end */}
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  try {
    // Fetch all movies initially (without a search query)
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/movie/api_key=78f9bd9f274e9174dfe1a019dca66e3c`
    );
    const searchData = await searchRes.json();

    // Check if the API response contains the expected structure
    if (searchData && searchData.results) {
      return {
        props: {
          movies: searchData.results,
          recommendations: [], // Initialize with an empty array
        },
      };
    } else {
      return {
        props: {
          movies: [], // Initialize with an empty array or provide default data
          recommendations: [], // Initialize with an empty array or handle the error appropriately
        },
      };
    }
  } catch (error) {
    return {
      props: {
        movies: [], // Initialize with an empty array or provide default data
        recommendations: [], // Initialize with an empty array or handle the error appropriately
      },
    };
  }
}
