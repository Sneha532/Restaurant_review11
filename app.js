        // Select all elements with the "i" tag and store them in a NodeList called "stars"
        const stars = document.querySelectorAll(".stars i");

        // Loop through the "stars" NodeList
        stars.forEach((star, index1) => {
            // Add an event listener that runs a function when the "click" event is triggered
            star.addEventListener("click", () => {
                // Loop through the "stars" NodeList Again
                stars.forEach((star, index2) => {
                    // Add the "active" class to the clicked star and any stars with a lower index
                    // and remove the "active" class from any stars with a higher index
                    index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
                });
            });
        });

        function openPopup() {
            document.getElementById('review-popup').classList.add('active');
        }

        function closePopup() {
            document.getElementById('review-popup').classList.remove('active');
        }

        function submitReview() {
            const reviewText = document.getElementById('review-text').value;
            if (reviewText) {
                let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
                reviews.push(reviewText);
                localStorage.setItem('reviews', JSON.stringify(reviews));
                displayReviews();
                document.getElementById('review-text').value = '';
                closePopup();
            }
        }

        function displayReviews() {
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            const reviewsContainer = document.getElementById('reviews');
            reviewsContainer.innerHTML = reviews.map(review => `<p>${review}</p>`).join('');
        }

        // Display reviews on page load
        window.onload = displayReviews;