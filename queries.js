/**
 * Fetches cryptocurrency rates from the CoinCap API.
 *
 * @param {string} [searchValue=""] - The search term for filtering cryptocurrencies by name.
 * @param {number} [limit=8] - The maximum number of results to retrieve.
 * @returns {Promise<Object>} - Returns a JSON object containing the cryptocurrency data,
 * or an error object if the fetch fails.
 */
export async function getRates(searchValue = "", limit = 8) {
  // Get the error message element from the DOM
  const errorMessageElement = document.getElementById("errorMessage");

  try {
    // Clear any existing error message
    if (errorMessageElement) {
      errorMessageElement.classList.add("d-none");
      errorMessageElement.textContent = "";
    }

    // Perform the API request
    const res = await fetch(
      `https://api.coincap.io/v2/assets?search=${encodeURIComponent(
        searchValue
      )}&limit=${limit}`
    );

    // Check for HTTP errors
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
    }

    // Parse the response as JSON
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching rates:", error);

    // Display the error message to the user
    if (errorMessageElement) {
      errorMessageElement.textContent =
        "Failed to load data. Please try again later.";
      errorMessageElement.classList.remove("d-none");
    }

    // Return an error object for further handling
    return { error: true, message: error.message };
  }
}
