document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(data => renderMovieDetails(data))
      .catch(error => console.error('Error fetching movie details:', error));
  });
  
  function renderMovieDetails(movie) {
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');
  
    poster.src = movie.poster;
    title.textContent = movie.title;
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
    showtime.textContent = `Showtime: ${movie.showtime}`;
    const ticketsAvailable = movie.capacity - movie.tickets_sold;
    availableTickets.textContent = `Available Tickets: ${ticketsAvailable}`;
  }
  