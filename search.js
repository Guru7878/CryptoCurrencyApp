/**
 * ratesApp.js
 *
 * This script provides functionality to fetch cryptocurrency rates using an API and display them in a Bootstrap card layout.
 * It handles user input, error messages, and displays search results dynamically.
 *
 * Dependencies:
 * - `getRates` function from `queries.js` for fetching data from the API.
 */

// Import the function fetching data from the API
import { getRates } from "./queries.js";

// Load search page elements into variables
const searchBtn = document.querySelector("#searchBtn"); // Search button element
const searchInput = document.querySelector("#searchInput"); // Search input field
const cardRow = document.querySelector(".row"); // Container for displaying results
const errorMessageElement = document.getElementById("errorMessage"); // Error message element

/**
 * Displays cryptocurrency rates in a grid layout using Bootstrap cards.
 *
 * @param {Object} result - The result object containing cryptocurrency data.
 * @param {Array} result.data - An array of cryptocurrency objects.
 */
function displayRates(result) {
  // Clear any previous content from the results container
  cardRow.innerHTML = "";

  // Loop through the result data to create and display a card for each cryptocurrency
  result.data.forEach((coin) => {
    // Create a Bootstrap card structure
    const newCol = document.createElement("div");
    newCol.className = "col";

    const cardContainer = document.createElement("div");
    cardContainer.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Coin Title
    const coinTitle = document.createElement("h3");
    coinTitle.className = "card-title";
    coinTitle.textContent = coin.name; // Set the coin name as the title

    // Coin Price
    const coinPrice = document.createElement("p");
    coinPrice.className = "card-text";
    coinPrice.innerHTML = `<strong>Price in USD:</strong> ${
      coin.priceUsd ? Number(coin.priceUsd).toFixed(4) : "No Data Available"
    }`; // Display the price or "No Data Available" if missing

    // Price Change (24Hr)
    const coinPriceChange24 = document.createElement("p");
    coinPriceChange24.className = "card-text";
    coinPriceChange24.innerHTML = `<strong>Price Change (24Hr):</strong> ${
      coin.changePercent24Hr
        ? Number(coin.changePercent24Hr).toFixed(4)
        : "No Data Available"
    }`; // Display the 24-hour change percentage or "No Data Available" if missing

    // Append all elements to the card
    cardBody.appendChild(coinTitle);
    cardBody.appendChild(coinPrice);
    cardBody.appendChild(coinPriceChange24);
    cardContainer.appendChild(cardBody);
    newCol.appendChild(cardContainer);
    cardRow.appendChild(newCol);
  });
}

/**
 * Handles the click event for the search button.
 *
 * Fetches data based on the search input and displays it using the displayRates function.
 * Handles errors and input validation.
 */
searchBtn.addEventListener("click", async function () {
  const searchValue = searchInput.value.trim(); // Get and trim the search input value

  // Store the search value in local storage for future use
  localStorage.setItem("searchValue", searchValue);

  // Show an error message if the search input is empty
  if (!searchValue) {
    if (errorMessageElement) {
      errorMessageElement.textContent = "Please enter a search term.";
      errorMessageElement.classList.remove("d-none"); // Show the error element
    }
    return;
  }

  // Clear any previous error message
  if (errorMessageElement) {
    errorMessageElement.classList.add("d-none");
    errorMessageElement.textContent = "";
  }

  try {
    // Fetch data from the API using the search value and a limit of 20 results
    const result = await getRates(searchValue, 20);

    // Check for errors in the API response
    if (result.error) {
      if (errorMessageElement) {
        errorMessageElement.textContent =
          "Failed to load data. Please try again later.";
        errorMessageElement.classList.remove("d-none");
      }
      return;
    }

    // Display the fetched results
    displayRates(result);
    searchInput.value = ""; // Clear the input field after successful search
  } catch (error) {
    // Handle unexpected errors during the API call
    console.error("Unexpected error:", error);
    if (errorMessageElement) {
      errorMessageElement.textContent =
        "An unexpected error occurred. Please try again later.";
      errorMessageElement.classList.remove("d-none");
    }
  }
});
