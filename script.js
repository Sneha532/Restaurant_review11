// Sample hotel data (in a real application, this would come from a backend API)
const hotels = [
    { id: 1, name: "Luxury Palace Hotel", rating: 4.5, price: 250, image: "images/hotel1.jpg" },
    { id: 2, name: "Cozy Inn", rating: 4.2, price: 120, image: "images/hotel2.jpg" },
    { id: 3, name: "Seaside Resort", rating: 4.7, price: 350, image: "images/hotel3.jpg" },
    { id: 4, name: "Mountain View Lodge", rating: 4.3, price: 180, image: "images/hotel4.jpg" },
    { id: 5, name: "City Center Suites", rating: 4.1, price: 200, image: "images/hotel5.jpg" },
    { id: 6, name: "Historic Grand Hotel", rating: 4.6, price: 280, image: "images/hotel6.jpg" },
    { id: 7, name: "Historic Grand Hotel", rating: 4.6, price: 280, image: "images/hotel7.jpg" },
    { id: 8, name: "Historic Grand Hotel", rating: 4.6, price: 280, image: "images/hotel8.jpg" },
];

// Function to create star rating
function createStarRating(rating, hotelId) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let starHTML = '';

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starHTML += `<i class="fas fa-star" data-hotel-id="${hotelId}" data-rating="${i + 1}"></i>`;
        } else if (i === fullStars && halfStar) {
            starHTML += `<i class="fas fa-star-half-alt" data-hotel-id="${hotelId}" data-rating="${i + 1}"></i>`;
        } else {
            starHTML += `<i class="far fa-star" data-hotel-id="${hotelId}" data-rating="${i + 1}"></i>`;
        }
    }

    return starHTML;
}

// Function to create hotel cards
function createHotelCard(hotel) {
    return `
        <div class="hotel-card">
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-rating">
                    ${createStarRating(hotel.rating, hotel.id)}
                    <span>${hotel.rating.toFixed(1)}</span>
                </div>
                <div class="hotel-price">₹${hotel.price} per night</div>
                <button class="review-btn" data-hotel-id="${hotel.id}">Give Review</button>
            </div>
        </div>
    `;
}

// Function to display hotels
function displayHotels(hotelsToDisplay) {
    const hotelGrid = document.getElementById('hotel-grid');
    hotelGrid.innerHTML = hotelsToDisplay.map(createHotelCard).join('');
    addReviewEventListeners();
}

// Initial display of all hotels
displayHotels(hotels);

// Search functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

function searchHotels() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredHotels = hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm)
    );
    displayHotels(filteredHotels);
}

searchBtn.addEventListener('click', searchHotels);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchHotels();
    }
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateThemeIcon();
});

function updateThemeIcon() {
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    
    if (body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    } else {
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    }
}

// Call updateThemeIcon initially to set the correct icon
updateThemeIcon();

// Load ratings from local storage
function loadRatingsFromLocalStorage() {
    hotels.forEach(hotel => {
        const storedRating = localStorage.getItem(`hotel-rating-${hotel.id}`);
        if (storedRating) {
            hotel.rating = parseFloat(storedRating);
        }
    });
}

// Load ratings on page load
loadRatingsFromLocalStorage();

// Hamburger menu functionality
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Add event listeners for review buttons
function addReviewEventListeners() {
    const reviewButtons = document.querySelectorAll('.review-btn');
    reviewButtons.forEach(button => {
        button.addEventListener('click', openReviewModal);
    });
}

// Open review modal
function openReviewModal(event) {
    const hotelId = event.target.getAttribute('data-hotel-id');
    document.getElementById('hotel-id').value = hotelId;
    document.getElementById('review-modal').style.display = 'block';
    displayPastReviews(hotelId);
}

// Close review modal
const modal = document.getElementById('review-modal');
const closeModal = document.querySelector('.close');

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Handle review form submission
const reviewForm = document.getElementById('review-form');

reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const hotelId = document.getElementById('hotel-id').value;
    const reviewText = document.getElementById('review-text').value;
    const reviewRating = parseInt(document.getElementById('review-rating').value);

    // Store the review in local storage
    const reviews = JSON.parse(localStorage.getItem(`hotel-reviews-${hotelId}`)) || [];
    reviews.push({ text: reviewText, rating: reviewRating });
    localStorage.setItem(`hotel-reviews-${hotelId}`, JSON.stringify(reviews));

    // Update the hotel's rating
    const hotel = hotels.find(h => h.id == hotelId);
    hotel.rating = (hotel.rating + reviewRating) / 2;

    // Store the updated rating in local storage
    localStorage.setItem(`hotel-rating-${hotelId}`, hotel.rating);

    // Redisplay the hotels to reflect the updated rating
    displayHotels(hotels);

    // Close the modal
    modal.style.display = 'none';
});

// Display past reviews
function displayPastReviews(hotelId) {
    const pastReviewsContainer = document.getElementById('past-reviews');
    const reviews = JSON.parse(localStorage.getItem(`hotel-reviews-${hotelId}`)) || [];
    pastReviewsContainer.innerHTML = reviews.map(review => `
        <div class="past-review">
            <p><strong>Rating:</strong> ${review.rating}</p>
            <p>${review.text}</p>
        </div>
    `).join('');
}