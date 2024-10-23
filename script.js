// API KEY
const API_KEY = "a653957b8a54fb47665bc8542ad31e4c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Categories URL
const POPULAR_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
const TOP_RATED_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
const TRENDING_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

// Movies Container
const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Fetch movies
const getMovies = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return showMovies(data.results);
  } catch (error) {
    console.error(error);
  }
};

// Render movies
const showMovies = (movies) => {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    // Destructuring movie object
    const { title, poster_path, vote_average, overview, release_date } = movie;

    // Create movie card
    const movieElement = document.createElement("article");
    movieElement.classList.add("movie-card");
    movieElement.id = "movie-card";

    // Format release date
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Render movie card
    movieElement.innerHTML = `
            <figure class="movie-figure">
                <img src="${IMG_URL}/${poster_path}" alt="${title}" class="movie-poster" />
            </figure>
            <div class="movie-details">
                <div class="movie-header">
                    <h2 class="movie-title">${title}</h2>
                    <p class="movie-release-date">Release: ${formatDate(
                      release_date
                    )}</p>
                </div>
                <div class="movie-rating">${vote_average}</div>
            </div>
            <p class="movie-overview" id="movie-overview" style="display: none;">${overview}</p>
        `;

    // Append movie card to movies container
    moviesContainer.appendChild(movieElement);
  });
};

// First Render
getMovies(POPULAR_URL);

// Navigate to Home
document.getElementById("home").addEventListener("click", () => {
  getMovies(POPULAR_URL);
});

// Navigate to Now Playing
document.getElementById("now-playing").addEventListener("click", () => {
  getMovies(NOW_PLAYING_URL);
});

// Navigate to Top Rated
document.getElementById("popular").addEventListener("click", () => {
  getMovies(POPULAR_URL);
});

// Navigate to Top Rated
document.getElementById("top-rated").addEventListener("click", () => {
  getMovies(TOP_RATED_URL);
});

// Navigate to Trending
document.getElementById("trending").addEventListener("click", () => {
  getMovies(TRENDING_URL);
});

// Toggle overview
document.addEventListener("click", (event) => {
  if (event.target.closest(".movie-card")) {
    const overview = event.target
      .closest(".movie-card")
      .querySelector(".movie-overview");
    if (overview) {
      overview.style.display =
        overview.style.display === "none" ? "block" : "none";
    }
  }
});

// Search movies
searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value;
  if (searchValue) {
    getMovies(SEARCH_URL + searchValue);
  }
});
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const searchValue = searchInput.value;
    if (searchValue) {
      getMovies(SEARCH_URL + searchValue);
    }
  }
});

// Bar Click
document.getElementById("bars").addEventListener("click", () => {
  const mainNav = document.getElementById("main-nav");
  const searchInput = document.getElementById("search-input");

  mainNav.style.opacity = mainNav.style.opacity === "0" ? "1" : "0";
  searchInput.style.opacity = searchInput.style.opacity === "0" ? "1" : "0";
});
