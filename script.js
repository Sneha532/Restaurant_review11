// Sample hotel data (in a real application, this would come from a backend API)
const hotels = [
    { id: 1, name: "Luxury Palace Hotel", rating: 4.5, price: 250, image: "https://source.unsplash.com/800x600/?luxury-hotel" },
    { id: 2, name: "Cozy Inn", rating: 4.2, price: 120, image: "https://source.unsplash.com/800x600/?cozy-hotel" },
    { id: 3, name: "Seaside Resort", rating: 4.7, price: 350, image: "https://source.unsplash.com/800x600/?beach-resort" },
    { id: 4, name: "Mountain View Lodge", rating: 4.3, price: 180, image: "https://source.unsplash.com/800x600/?mountain-hotel" },
    { id: 5, name: "City Center Suites", rating: 4.1, price: 200, image: "https://source.unsplash.com/800x600/?city-hotel" },
    { id: 6, name: "Historic Grand Hotel", rating: 4.6, price: 280, image: "https://source.unsplash.com/800x600/?historic-hotel" },
];

// Function to create hotel cards
function createHotelCard(hotel) {
    return `
        <div class="hotel-card">
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-rating">
                    ${hotel.rating} <i class="fas fa-star"></i>
                </div>
                <div class="hotel-price">$${hotel.price} per night</div>
            </div>
        </div>
    `;
}

// Function to display hotels
function displayHotels(hotelsToDisplay) {
    const hotelGrid = document.getElementById('hotel-grid');
    hotelGrid.innerHTML = hotelsToDisplay.map(createHotelCard).join('');
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
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    }
}

// Initialize theme icon
updateThemeIcon();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});