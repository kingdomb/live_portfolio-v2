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

          // Set a cookie that expires in 7 days to prevent modal from opening again
          const date = new Date();
          date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
          document.cookie = `modalClosed=true; expires=${date.toUTCString()}; path=/`;

          // Clear the form fields and feedback value
          document.getElementById('feedback-form').reset();
          feedbackValue = '';

          // Clear all error messages
          hideError('feedbackErrorMessage');
          hideError('emailErrorMessage');

          // Dynamically update modal content
          const sanitizedHTML = DOMPurify.sanitize(`
            <div class="modal fade" id="responseModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                    <div class="modal-content" style="padding: 1.5rem; min-width: min-content;">
                        <div class="modal-header">
                            <h1 class="modal-title" id="modalLabel" style="padding: 1rem 0; color: #e6991f;">Feedback received.</h1>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h4 style="padding: 1.5rem 0 0 0; color: #e5e5e5;">
                                Every little bit helps. Thanks!!!
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
          `);
          const feedbackModalEl = document.getElementById('feedbackModal');
          feedbackModalEl.innerHTML = sanitizedHTML;

          // Show the modal
          const responseModalEl = document.getElementById('responseModal');
          const responseModal = new bootstrap.Modal(responseModalEl);
          responseModal.show();

          // Reset spinner and submit button
          resetSubmitState();
        } else {
          console.log('Failed to submit:', data);
          resetSubmitState();
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        resetSubmitState();
      });
  });

  // Check if the modal should be prevented from opening
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=').map((c) => c.trim());
    acc[key] = value;
    return acc;
  }, {});
  if (cookies.modalClosed === 'true') {
    console.log('Modal is prevented from opening due to cookie');
  }
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
