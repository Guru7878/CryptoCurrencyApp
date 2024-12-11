/**
 * dynamicRatesDisplay.js
 *
 * This script fetches cryptocurrency rate data at regular intervals and displays it dynamically
 * in a Bootstrap card layout on the webpage. The rates are updated every 5 seconds.
 *
 * Dependencies:
 * - `getRates` function from `queries.js` to fetch API data.
 */

// Import the function to fetch data from the API
import { getRates } from "./queries.js";

// Select the container element for displaying cards
const cardRow = document.querySelector(".row");

/**
 * Displays cryptocurrency rates in the form of Bootstrap cards.
 *
 * @param {Object} result - The result object containing cryptocurrency data.
 * @param {Array} result.data - Array of cryptocurrency objects with details like name, price, and price change.
 */
function displayRates(result) {
  // Clear any previous content from the card container
  cardRow.innerHTML = "";

  // Loop through the result data and create a card for each cryptocurrency
  result.data.forEach((coin) => {
    // Create a column container for the card
    const newCol = document.createElement("div");
    newCol.className = "col";

    // Create the card structure
    const cardContainer = document.createElement("div");
    cardContainer.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create the coin name element
    const coinTitle = document.createElement("h3");
    coinTitle.className = "card-title";
    coinTitle.textContent = coin.name; // Set the coin name as the title

    // Create the price element
    const coinPrice = document.createElement("p");
    coinPrice.className = "card-text";
    coinPrice.innerHTML = `<strong>Price in USD:</strong> ${
      coin.priceUsd ? Number(coin.priceUsd).toFixed(4) : "No Data Available"
    }`; // Display the price or fallback text if not available

    // Create the price change element
    const coinPriceChange24 = document.createElement("p");
    coinPriceChange24.className = "card-text";
    coinPriceChange24.innerHTML = `<strong>Price Change (24Hr):</strong> ${
      coin.changePercent24Hr
        ? Number(coin.changePercent24Hr).toFixed(4)
        : "No Data Available"
    }`; // Display the 24-hour price change or fallback text

    // Append all elements to the card body
    cardBody.appendChild(coinTitle);
    cardBody.appendChild(coinPrice);
    cardBody.appendChild(coinPriceChange24);

    // Append card body to the card container
    cardContainer.appendChild(cardBody);

    // Append the card container to the column
    newCol.appendChild(cardContainer);

    // Append the column to the card row
    cardRow.appendChild(newCol);
  });
}

/**
 * Initializes the cryptocurrency rate display.
 *
 * Fetches data from the API and updates the rates displayed on the webpage.
 * This function is executed every 5 seconds to keep the rates up to date.
 */
async function init() {
  try {
    // Fetch data from the API
    const result = await getRates();

    // Clear existing cards and display new data
    cardRow.innerHTML = "";
    displayRates(result);
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
}

// Start the update process, fetching rates every 5 seconds
const intervalID = setInterval(init, 5000);
init(); // Initial call to fetch and display data
