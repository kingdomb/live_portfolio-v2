// //submit-feedback2.js

document.addEventListener('DOMContentLoaded', () => {
  let feedbackValue = '';

  // Attach event listeners to the buttons to set feedback value
  ['button1', 'button2', 'button3'].forEach((id, index) => {
    document.getElementById(id).addEventListener('click', () => {
      const messages = [
        "Very Likely: I'm impressed and ready to connect.",
        "Somewhat Likely: I'm interested, but need more information.",
        "Not Likely: I'm not convinced yet."
      ];
      feedbackValue = messages[index];

      // Clear any previous feedback error
      hideError('feedbackErrorMessage');
      console.log('Feedback set to:', feedbackValue);
    });
  });

  document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Show spinner and hide submit button
    document.getElementById('spinner-container').style.display = 'block';
    document.getElementById('submit').style.display = 'none';

    const comments = document.getElementById('message-text').value.trim();
    const email = document.getElementById('recipient-email').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // Validation for feedback selection
    if (!feedbackValue) {
      showError('feedbackErrorMessage', 'Please click one feedback button above before submitting.');
      isValid = false;
    } else {
      hideError('feedbackErrorMessage');
    }

    // Validation for email
    if (!email) {
      showError('emailErrorMessage', 'Email is required.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('emailErrorMessage', 'Please enter a valid email address.');
      isValid = false;
    } else {
      hideError('emailErrorMessage');
    }

    // If validation fails, reset the submit button and spinner
    if (!isValid) {
      resetSubmitState();
      return;
    }

    const data = { email, feedback: feedbackValue, comments };

    // Send data to the server
    fetch(this.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        if (data.message === 'Feedback received successfully') {
          console.log('Feedback submission successful');
          document.getElementById('feedback-form').reset();
          feedbackValue = '';
          // Clear all error messages
          hideError('feedbackErrorMessage');
          hideError('emailErrorMessage');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        resetSubmitState();
      });
  });
});

// Function to show error message for a specific field
function showError(elementId, message) {
  const errorMessage = document.getElementById(elementId);
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

// Function to hide error message for a specific field
function hideError(elementId) {
  const errorMessage = document.getElementById(elementId);
  errorMessage.style.display = 'none';
}

// Function to reset submit button and spinner to their default states
function resetSubmitState() {
  document.getElementById('spinner-container').style.display = 'none';
  document.getElementById('submit').style.display = 'block';
}
