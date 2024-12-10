// Importing via module the function fetching data from API
import { getRates } from "./queries.js";

// Loading search page elements into variables
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");
const cardRow = document.querySelector(".row");
const errorMessageElement = document.getElementById("errorMessage");

// Function to display results
function displayRates(result) {
  // Clear any previous content
  cardRow.innerHTML = "";

  // Loop through the result data
  result.data.forEach((coin) => {
    // Create Bootstrap card structure
    const newCol = document.createElement("div");
    newCol.className = "col";

    const cardContainer = document.createElement("div");
    cardContainer.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Coin Title
    const coinTitle = document.createElement("h3");
    coinTitle.className = "card-title";
    coinTitle.textContent = coin.name;

    // Coin Price
    const coinPrice = document.createElement("p");
    coinPrice.className = "card-text";
    coinPrice.innerHTML = `<strong>Price in USD:</strong> ${
      coin.priceUsd ? Number(coin.priceUsd).toFixed(4) : "No Data Available"
    }`;

    // Price Change (24Hr)
    const coinPriceChange24 = document.createElement("p");
    coinPriceChange24.className = "card-text";
    coinPriceChange24.innerHTML = `<strong>Price Change (24Hr):</strong> ${
      coin.changePercent24Hr
        ? Number(coin.changePercent24Hr).toFixed(4)
        : "No Data Available"
    }`;

    // Append elements to the card
    cardBody.appendChild(coinTitle);
    cardBody.appendChild(coinPrice);
    cardBody.appendChild(coinPriceChange24);
    cardContainer.appendChild(cardBody);
    newCol.appendChild(cardContainer);
    cardRow.appendChild(newCol);
  });
}

// Function to handle the search button click
searchBtn.addEventListener("click", async function () {
  const searchValue = searchInput.value.trim();

  // Store the search value in local storage
  localStorage.setItem("searchValue", searchValue);

  // Show error if search input is empty
  if (!searchValue) {
    if (errorMessageElement) {
      errorMessageElement.textContent = "Please enter a search term.";
      errorMessageElement.classList.remove("d-none");
    }
    return;
  }

  // Clear any previous error message
  if (errorMessageElement) {
    errorMessageElement.classList.add("d-none");
    errorMessageElement.textContent = "";
  }

  try {
    // Fetch data from API
    const result = await getRates(searchValue, 20);

    // Check for errors returned by getRates
    if (result.error) {
      if (errorMessageElement) {
        errorMessageElement.textContent =
          "Failed to load data. Please try again later.";
        errorMessageElement.classList.remove("d-none");
      }
      return;
    }

    // Display results
    displayRates(result);
    searchInput.value = ""; // Clear input field
  } catch (error) {
    console.error("Unexpected error:", error);
    if (errorMessageElement) {
      errorMessageElement.textContent =
        "An unexpected error occurred. Please try again later.";
      errorMessageElement.classList.remove("d-none");
    }
  }
});
