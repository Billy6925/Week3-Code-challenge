document.addEventListener('DOMContentLoaded', () => {
  fetchMovieDetails();
  fetchMovieList();
  handleBuyTicket();
});

//Fetch details of the  movie in ID:1
function fetchMovieDetails() {
  fetch('http://localhost:3000/films/1')
    .then(response => response.json())
    .then(data => {
      renderMovieDetails(data);
    })
    .catch(error => console.error('Error fetching movie details:', error));
}

function renderMovieDetails(movie) {
  const container = document.getElementById('container');
  
  const img = container.querySelector('img');
  const title = container.querySelector('p strong');
  const runtime = container.querySelector('p:nth-of-type(2)');
  const capacity = container.querySelector('p:nth-of-type(3)');
  const showtime = container.querySelector('p:nth-of-type(4)');
  const description = container.querySelector('p:nth-of-type(6)');
  const availableTickets = container.querySelector('p:nth-of-type(5)');

  img.src = movie.poster;
  title.textContent = movie.title;
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  capacity.textContent = `Capacity: ${movie.capacity}`;
  showtime.textContent = `Showtime: ${movie.showtime}`;
  description.textContent = `Description: ${movie.description}`;
  
  const ticketsAvailable = movie.capacity - movie.tickets_sold;
  availableTickets.textContent = `Available Tickets: ${ticketsAvailable}`;
  availableTickets.setAttribute('id', 'available-tickets');
}

function fetchMovieList() {
  fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(data => renderMovieList(data))
    .catch(error => console.error('Error fetching movie list:', error));
}

function renderMovieList(movies) {
  const filmsList = document.getElementById('films');
  filmsList.innerHTML = ''; // Clear any existing content

  movies.forEach(movie => {
    const li = document.createElement('li');
    li.className = 'film item';
    li.textContent = movie.title;
    filmsList.appendChild(li);
  });
}

function handleBuyTicket() {
  const buyButton = document.getElementById('buyButton');
  buyButton.addEventListener('click', () => {
    const availableTicketsElement = document.getElementById('available-tickets');
    let availableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]);

    if (availableTickets > 0) {
      availableTickets -= 1;
      availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
    } else {
      alert('Sorry, this showing is sold out!');
    }
  });
}
