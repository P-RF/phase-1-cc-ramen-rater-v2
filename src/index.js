// index.js

// Callbacks
// Create ramen detail section
const handleClick = (ramen) => {
  // Add code
  const detailImg = document.querySelector('#ramen-detail .detail-image');
  const detailName = document.querySelector('#ramen-detail .name');
  const detailRestaurant = document.querySelector('#ramen-detail .restaurant');
  const detailsRating = document.getElementById('rating-display');
  const detailsComment = document.getElementById('comment-display');

  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

// Create form ata and create new ramen object
// Add new image element to #ramen-menu and attach a click listener
const addSubmitListener = () => {
  // Add code
  const ramenForm = document.getElementById('new-ramen');

  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const newRamen = {name, restaurant, image, rating, comment};

    const ramenMenuDiv = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenuDiv.appendChild(img);

    ramenForm.reset();
  });
};

// Fetch ramen data, iterate through array, create img elements for each type of ramen
// Attach a click listener to each image
const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((data) => {
      const ramenMenuDiv = document.getElementById('ramen-menu');

      data.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen)); // Click listener
        ramenMenuDiv.appendChild(img);
      });
    })
    .catch((error) => console.error('Error:', error));
};

// Calls to load initial data
//Sets up submit listener for form
const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
