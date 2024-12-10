export async function getRates(searchValue = "", limit = 8) {
  const errorMessageElement = document.getElementById("errorMessage");

  try {
    // Clear any existing error message
    errorMessageElement.classList.add("d-none");
    errorMessageElement.textContent = "";

    const res = await fetch(
      `https://api.coincap.io/v2/assets?search=${searchValue}&limit=${limit}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching rates:", error);

    // Display error message to the user
    errorMessageElement.textContent =
      "Failed to load data. Please try again later.";
    errorMessageElement.classList.remove("d-none");

    // Return an error object for further handling if needed
    return { error: true, message: error.message };
  }
}
