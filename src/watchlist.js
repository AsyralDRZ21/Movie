// Get the watchlist from local storage
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Display watchlist items
const watchlistContainer = document.getElementById('watchlist');

function displayWatchlist() {
  watchlistContainer.innerHTML = '';

  watchlist.forEach((movie, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="poster">
          <a href="movie.html?id=${movie.ID}">
            <img src="${movie.poster}" alt="${movie.title} Poster" width="100">
          </a>
      </div>
      <div>
        <h2>
          <a href="movie.html?id=${movie.ID}">${movie.title}</a>
        </h2>
        <div class="movie-actions">
          <label for="watchStatus_${index}">Watch Status:</label>
          <select id="watchStatus_${index}" onchange="updateWatchStatus(${index}, this.value)">
            <option value="Not Watched" ${movie.watchStatus === 'Not Watched' ? 'selected' : ''}>Not Watched</option>
            <option value="Watched" ${movie.watchStatus === 'Watched' ? 'selected' : ''}>Watched</option>
          </select>
          <button onclick="deleteMovie(${index})">Delete</button>
        </div>
      </div>
      <div class="watch-status">
        <strong>Watch Status:</strong> ${movie.watchStatus}
      </div>
    `;
    watchlistContainer.appendChild(listItem);
  });
}

// Add "watchStatus" property to each movie in watchlist if not already present
watchlist = watchlist.map((movie) => {
  if (!movie.hasOwnProperty('watchStatus')) {
    movie.watchStatus = 'Not Watched';
  }
  return movie;
});

function updateWatchStatus(index, status) {
  watchlist[index].watchStatus = status;
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}

function deleteMovie(index) {
  watchlist.splice(index, 1);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}

displayWatchlist();

// Add event listener to back button
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.history.back();
});
