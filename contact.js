function myFunc(event) {
  // 1. prevent form submission
  event.preventDefault();

  // Input Fields
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const pNumber = document.getElementById("pNumber").value;
  const message = document.getElementById("message").value;
  const feedback = document.getElementById("feedback");

  console.log({ firstName, lastName, email, pNumber, message });
  // Validation Patterns
  const phonePattern = /^[0-9]{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation Checks
  if (!firstName || !lastName || !message) {
    feedback.textContent = "First Name, Last Name, and Message are required.";
    console.error("required fields are missing.");
    return;
  }

  if (!phonePattern.test(pNumber)) {
    feedback.textContent = "Phone number must have 10 digits.";
    return;
  }

  if (!emailPattern.test(email)) {
    feedback.textContent = "Invalid email address.";
    return;
  }

  // Create an object to store the data
  const formData = {
    firstName,
    lastName,
    email,
    pNumber,
    message,
  };

  // Save data to Local Storage
  const storedData = JSON.parse(localStorage.getItem("formSubmissions")) || [];
  storedData.push(formData);
  localStorage.setItem("formSubmissions", JSON.stringify(storedData));

  // Redirect to message.html
  window.location.href = "message.html";
}

// Retrieving and displaying data on message.html page
function displayMessageInfo() {
  const messageInfo = document.getElementById("messageInfo");

  // Retrieve stored data from local storage
  const localStorageData =
    JSON.parse(localStorage.getItem("formSubmissions")) || [];

  // Retrieve the most recent submission (last entry in the array)
  const recentSubmission = localStorageData[localStorageData.length - 1];

  // Check if data exists
  if (recentSubmission) {
    // Display the retrieved data
    messageInfo.innerHTML = `
      <p><strong>First Name:</strong> ${recentSubmission.firstName}</p>
      <p><strong>Last Name:</strong> ${recentSubmission.lastName}</p>
      <p><strong>Email:</strong> ${recentSubmission.email}</p>
      <p><strong>Phone Number:</strong> ${recentSubmission.pNumber}</p>
      <p><strong>Message:</strong> ${recentSubmission.message}</p>
    `;
  } else {
    // Display a fallback message if no data is found
    messageInfo.innerHTML = "<p>No Message was found.</p>";
  }
}

// Call displayMessageInfo when the page loads
if (window.location.pathname.includes("message.html")) {
  displayMessageInfo();
}
