const moviesContainer = document.getElementById('movies');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const recommendedMoviesContainer = document.getElementById('recommendedMovies');

// Function to fetch movies from the OMDB API
async function fetchMoviesByTitle(title) {
  const apiKey = '1ee3626f';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Function to display movies in the UI
function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <h3>${movie.Title}</h3>
      <p>Released: ${movie.Year}</p>
      <p>Imdb ID: ${movie.imdbID}</p>
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="200">
    `;

    // Add event listener to movie element
    movieElement.addEventListener('click', () => {
      window.location.href = `movie.html?id=${movie.imdbID}`;
    });

    moviesContainer.appendChild(movieElement);
  });
}

// Function to fetch recommended movies
async function fetchRecommendedMovies() {
  const apiKey = '1ee3626f';
  const genre = 'action'; // Change the genre as per your requirement
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.Search;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    return [];
  }
}

// Function to display recommended movies in the UI
function displayRecommendedMovies(movies) {
  recommendedMoviesContainer.innerHTML = '';

  // Sort movies by year of release in descending order
  movies.sort((a, b) => b.Year - a.Year);

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <h3>${movie.Title}</h3>
      <p>Released: ${movie.Year}</p>
      <p>Imdb ID: ${movie.imdbID}</p>
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="200">
    `;

    // Add event listener to movie element
    movieElement.addEventListener('click', () => {
      window.location.href = `movie.html?id=${movie.imdbID}`;
    });

    recommendedMoviesContainer.appendChild(movieElement);
  });
}

// Function to handle search button click event
function handleSearchButtonClick() {
  const searchInputValue = searchInput.value.trim();

  if (searchInputValue !== '') {
    fetchMoviesByTitle(searchInputValue)
      .then((movies) => {
        displayMovies(movies);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

// Function to handle recommended movies loading
function loadRecommendedMovies() {
  fetchRecommendedMovies()
    .then((movies) => {
      displayRecommendedMovies(movies);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Add event listener for search button click
searchButton.addEventListener('click', handleSearchButtonClick);

// Load recommended movies
loadRecommendedMovies();
