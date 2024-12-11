/**
 * Handles form submission, validates input fields, saves data to local storage,
 * and redirects to the "message.html" page.
 *
 * @param {Event} event - The form submission event.
 */
function myFunc(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve input values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const pNumber = document.getElementById("pNumber").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("feedback");

  // Log the input values (for debugging)
  console.log({ firstName, lastName, email, pNumber, message });

  // Validation patterns
  const phonePattern = /^[0-9]{10}$/; // Matches 10-digit numbers
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Matches valid email format

  // Validate required fields
  if (!firstName || !lastName || !message) {
    feedback.textContent = "First Name, Last Name, and Message are required.";
    console.error("Required fields are missing.");
    return;
  }

  // Validate phone number format
  if (!phonePattern.test(pNumber)) {
    feedback.textContent = "Phone number must have 10 digits.";
    return;
  }

  // Validate email format
  if (!emailPattern.test(email)) {
    feedback.textContent = "Invalid email address.";
    return;
  }

  // Create an object to store form data
  const formData = {
    firstName,
    lastName,
    email,
    pNumber,
    message,
  };

  // Save form data to local storage
  const storedData = JSON.parse(localStorage.getItem("formSubmissions")) || [];
  storedData.push(formData);
  localStorage.setItem("formSubmissions", JSON.stringify(storedData));

  // Redirect to the "message.html" page
  window.location.href = "message.html";
}

/**
 * Retrieves and displays the most recent submission data on the "message.html" page.
 */
function displayMessageInfo() {
  const messageInfo = document.getElementById("messageInfo");

  // Retrieve stored data from local storage
  const localStorageData =
    JSON.parse(localStorage.getItem("formSubmissions")) || [];

  // Get the most recent submission (last entry in the array)
  const recentSubmission = localStorageData[localStorageData.length - 1];

  // Check if data exists and display it
  if (recentSubmission) {
    messageInfo.innerHTML = `
      <p><strong>First Name:</strong> ${recentSubmission.firstName}</p>
      <p><strong>Last Name:</strong> ${recentSubmission.lastName}</p>
      <p><strong>Email:</strong> ${recentSubmission.email}</p>
      <p><strong>Phone Number:</strong> ${recentSubmission.pNumber}</p>
      <p><strong>Message:</strong> ${recentSubmission.message}</p>
    `;
  } else {
    // Fallback message if no data is found
    messageInfo.innerHTML = "<p>No Message was found.</p>";
  }
}

// Automatically call displayMessageInfo when the "message.html" page loads
if (window.location.pathname.includes("message.html")) {
  displayMessageInfo();
}
