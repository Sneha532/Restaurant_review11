# Restaurant Review

## Overview
This project is a responsive restaurant review website. It features a navigation bar, a hero section, a contact form, and a footer. The website is designed to be fully responsive, adapting to different screen sizes using media queries.

## HTML Structure
The HTML structure is organized into several sections:

1. **Header and Navigation**:
    ```html
    <header>
        <nav>
            <div class="logo">LuxeStay Reviews</div>
            <div class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-links" id="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="right-buttons">
                <div class="search-container">
                    <input type="text" id="search-input" placeholder="Search hotels...">
                    <button id="search-btn"><i class="fas fa-search"></i></button>
                </div>
                <button id="theme-toggle">
                    <i class="fas fa-sun"></i>
                    <i class="fas fa-moon"></i>
                </button>
            </div>
        </nav>
    </header>
    ```

2. **Hero Section**:
    ```html
    <section class="hero">
        <h1>Welcome to LuxeStay Reviews</h1>
    </section>
    ```

3. **Main Content**:
    ```html
    <main>
        <!-- Content goes here -->
    </main>
    ```

4. **Contact Form**:
    ```html
    <section id="contact">
        <form id="contact-form">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Message</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send</button>
        </form>
    </section>
    ```

5. **Footer**:
    ```html
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>About Us</h3>
                <p>Information about the company.</p>
            </div>
            <div class="footer-section">
                <h3>Contact</h3>
                <ul>
                    <li>Email: info@example.com</li>
                    <li>Phone: 123-456-7890</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2023 LuxeStay Reviews. All rights reserved.
        </div>
    </footer>
    ```

## CSS Styling
The CSS is organized to provide a responsive design and includes styles for different sections:

1. **Global Styles**:
    ```css
    :root {
        --primary-color: #3498db;
        --secondary-color: #2ecc71;
        --text-color: #333;
        --bg-color: #f4f4f4;
        --card-bg: #fff;
        --header-bg: #fff;
        --footer-bg: #333;
        --footer-text: #fff;
    }

    body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: var(--text-color);
        background-color: var(--bg-color);
        transition: background-color 0.3s ease;
        margin: 0;
        padding: 0;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    ```

2. **Header and Navigation**:
    ```css
    header {
        background-color: var(--header-bg);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 1000;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
    }

    .nav-toggle {
        display: none;
        flex-direction: column;
        cursor: pointer;
    }

    .nav-links {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        flex-grow: 1;
    }

    .right-buttons {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
    ```

3. **Responsive Design**:
    ```css
    @media (max-width: 768px) {
        .nav-toggle {
            display: flex;
        }

        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--header-bg);
            flex-direction: column;
            align-items: center;
            padding: 1rem 0;
            display: none;
        }

        .nav-links.active {
            display: flex;
        }

        .right-buttons {
            flex-direction: column;
            width: 100%;
            align-items: center;
            margin-top: 1rem;
        }

        .search-container {
            width: 80%;
            margin-top: 1rem;
        }

        #search-input {
            width: 100%;
        }
    }
    ```

## JavaScript Functionality
The JavaScript code handles various functionalities such as displaying hotel data, search functionality, theme switching, and handling reviews.

### Sample Hotel Data
The sample hotel data is defined as an array of objects. In a real application, this data would come from a backend API.
```javascript
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
```
#### Creating Star Ratings
The `createStarRating` function generates HTML for star ratings based on the hotel's rating.

```javascript
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
```
#### Creating Hotel Cards
The `createHotelCard` function generates HTML for each hotel card.

```javascript
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
```
#### Displaying Hotels
The `displayHotels` function displays the hotel cards on the page.

```javascript
function displayHotels(hotelsToDisplay) {
    const hotelGrid = document.getElementById('hotel-grid');
    hotelGrid.innerHTML = hotelsToDisplay.map(createHotelCard).join('');
    addReviewEventListeners();
}

// Initial display of all hotels
displayHotels(hotels);
```
#### Search Functionality
The search functionality filters hotels based on the search term.

```javascript
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
```

#### Dark Mode Toggle
The dark mode toggle switches between light and dark themes.
```javascript
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
```

#### Hamburger Menu Functionality
The hamburger menu toggles the visibility of the navigation links.
```javascript
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
```

#### Handling Reviews
The review functionality allows users to submit reviews and updates the hotel ratings
```javascript
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
```

This README.md file provides a comprehensive overview of the HTML structure, CSS styling, and JavaScript functionality used in the project. It explains how different parts of the code work together to create a responsive and interactive restaurant review website.