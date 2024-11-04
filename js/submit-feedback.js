//submit-feedback2.js

document.addEventListener('DOMContentLoaded', () => {
  let feedbackValue = '';

  // Attach event listeners to the buttons to set feedback value
  document.getElementById('button1').addEventListener('click', () => {
    feedbackValue = "Very Likely: I'm impressed and ready to connect.";
    console.log('Feedback set to:', feedbackValue);
  });

  document.getElementById('button2').addEventListener('click', () => {
    feedbackValue =
      "Somewhat Likely: I'm interested, but need more information.";
    console.log('Feedback set to:', feedbackValue);
  });

  document.getElementById('button3').addEventListener('click', () => {
    feedbackValue = "Not Likely: I'm not convinced yet.";
    console.log('Feedback set to:', feedbackValue);
  });

  // Handle form submission
  document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Show the loading spinner
    document.getElementById('spinner-container').style.display = 'block';
    document.getElementById('submit').style.display = 'none';

    // Collect the entered values
    const comments = document.getElementById('message-text').value.trim();
    const email = document.getElementById('recipient-email').value.trim();

    // Log collected values for debugging
    console.log('Collected Email:', email);
    console.log('Collected Feedback:', feedbackValue);
    console.log('Collected Comments:', comments);

    // Ensure feedbackValue has been set before submitting
    if (!feedbackValue) {
      alert('Please select your feedback before submitting.');
      document.getElementById('spinner-container').style.display = 'none'; // Hide spinner
      document.getElementById('submit').style.display = 'block'; // Show submit button again
      return;
    }

    // Construct the data object to send
    const data = {
      email: email,
      feedback: feedbackValue,
      comments: comments,
    };

    // Log data to be sent
    console.log('Data to be sent:', data);

    // Send data to the server via fetch
    fetch(this.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === 'Feedback received successfully') {
          console.log('Feedback submission successful');

          // Set a cookie that expires in 7 days to prevent modal from opening
          const date = new Date();
          date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
          document.cookie = `modalClosed=true; expires=${date.toUTCString()}; path=/`;

          // Clear the form fields
          document.getElementById('feedback-form').reset();
          feedbackValue = ''; // Reset the feedback value

          // Sanitize the HTML content
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

          // Replace inner HTML of the modal
          const feedbackModalEl = document.getElementById('feedbackModal');
          feedbackModalEl.innerHTML = sanitizedHTML;

          // Re-initialize and show the response modal
          const responseModalEl = document.getElementById('responseModal');
          const responseModal = new bootstrap.Modal(responseModalEl);
          responseModal.show();

          // Hide spinner and show the submit button again
          document.getElementById('spinner-container').style.display = 'none';
          document.getElementById('submit').style.display = 'block';
        } else {
          console.log('Failed to submit:', data);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        document.getElementById('spinner-container').style.display = 'none'; // Hide spinner
        document.getElementById('submit').style.display = 'block'; // Show submit button again
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
