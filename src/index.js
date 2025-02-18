// index.js
let currentRamen; // Global variable to be updated later and assigned value(s)
// Create ramen detail section
const handleClick = (ramen) => {
  // Add code
  currentRamen = ramen // Store the currently selected ramen

  const detailImg = document.querySelector('#ramen-detail .detail-image');
  const detailName = document.querySelector('#ramen-detail .name');
  const detailRestaurant = document.querySelector('#ramen-detail .restaurant');
  const detailsRating = document.getElementById('rating-display');
  // console.log(detailsRating)
  const detailsComment = document.getElementById('comment-display');
  // console.log(detailsComment)

  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;

};
// console.log("handleClick");


// Create form data and create new ramen object
// Create an event listener 'submit' button - prevent it from reloading the page
// Add new image element to #ramen-menu and attach a 'click' listener
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
      // console.log(displayRamens);

      data.forEach((ramen, index) => {              
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen)); // Click listener
        ramenMenuDiv.appendChild(img);
        // console.log("img");

        // Display the first ramen upon page load
        if (index === 0) {
          handleClick(ramen);
        }
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

// The last clicked ramen needs to be updated - currentRamen
// New variable needs to keep track of the current ramen displayed
// When ramen is clicked, currentRamen displays
// currentRamen is modified when the form is submitted

// Update rating and comment for the featured ramen
// Select form and input fields from the HTML
const editForm = document.getElementById("edit-ramen") // Listen for submissions
const editRating = document.getElementById("edit-rating") // Get or set the rating
const editComment = document.getElementById("edit-comment") // Get or set the comment

// Add an event listener to the form
editForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting/reloading the page
  event.preventDefault();

  // Ensure a ramen is selected before updating
  if (currentRamen) {
    // Getting the values from the form
    const newRating = editRating.value; // Holds new number
    const newComment = editComment.value; // Holds new comment

    // Display new values
    const detailsRating = document.getElementById("rating-display")
    const detailsComment = document.getElementById("comment-display")

    // Find current displayed elements and update text with new values
     detailsRating.textContent = newRating;
     detailsComment.textContent = newComment;

    // Update the currentRamen object
    currentRamen.rating = newRating;
    currentRamen.comment = newComment;
  }
});
// console.log(editForm)

// Create the delete button
const deleteButton = document.createElement("button");
deleteButton.id = "delete-ramen"; // Select button id
deleteButton.textContent = "Delete"; // Text for button
deleteButton.style.marginTop = "10px"; // Placement of button

// Append the delete button to HTML page
editForm.appendChild(deleteButton);

// Add an event listener to remove the ramen selected
deleteButton.addEventListener("click", () => {
  // console.log(deleteButton) // Check if 'click' event works
  if (currentRamen) { // Select the current img
    // Remove the selected image
    const ramenMenuDiv = document.getElementById("ramen-menu");
    const images = ramenMenuDiv.getElementsByTagName("img");

    for (let img of images) {
      if (img.src === currentRamen.image) {
        ramenMenuDiv.removeChild(img);
        break; // Stop loop after the image is deleted
      }
    }

    // Clear ramen detail display
    document.querySelector('#ramen-detail .detail-image').src = "";
    document.querySelector('#ramen-detail .name').textContent = "";
    document.querySelector('#ramen-detail .restaurant').textContent = "";
    document.querySelector('#rating-display').textContent = "";
    document.querySelector('#comment-display').textContent = "";

    // Reset the current ramen
    currentRamen = null
  }
});