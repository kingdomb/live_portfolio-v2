//submit-feedback.js

// document.addEventListener('DOMContentLoaded', () => {
//   let feedbackValue = '';

//   // Attach event listeners to the buttons to set feedback value
//   document.getElementById('button1').addEventListener('click', () => {
//     feedbackValue = "Very Likely: I'm impressed and ready to connect.";
//   });

//   document.getElementById('button2').addEventListener('click', () => {
//     feedbackValue =
//       "Somewhat Likely: I'm interested, but need more information.";
//   });

//   document.getElementById('button3').addEventListener('click', () => {
//     feedbackValue = "Not Likely: I'm not convinced yet.";
//   });

//   // Handle form submission
//   document
//     .getElementById('feedback-form')
//     .addEventListener('submit', function (e) {
//       e.preventDefault(); // Prevent the default form submission

//       // Collect the entered values
//       const comments = document.getElementById('message-text').value;
//       const email = document.getElementById('recipient-email').value;

//       // Construct the data object to send
//       const data = {
//         feedback: feedbackValue,
//         comments: comments,
//         email: email,
//       };

//       // Send data to the server via fetch
//       fetch(this.action, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Success:', data);
//           // Optionally, handle success feedback to the user
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           // Optionally, handle error feedback to the user
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
  let feedbackValue = '';

  // Attach event listeners to the buttons to set feedback value
  document.getElementById('button1').addEventListener('click', () => {
    feedbackValue = "Very Likely: I'm impressed and ready to connect.";
  });

  document.getElementById('button2').addEventListener('click', () => {
    feedbackValue =
      "Somewhat Likely: I'm interested, but need more information.";
  });

  document.getElementById('button3').addEventListener('click', () => {
    feedbackValue = "Not Likely: I'm not convinced yet.";
  });

  // Handle form submission
  document
    .getElementById('feedback-form')
    .addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission

      // Collect the entered values
      const comments = document.getElementById('message-text').value;
      const email = document.getElementById('recipient-email').value;

      // Construct the data object to send
      const data = {
        feedback: feedbackValue,
        comments: comments,
        email: email,
      };

      // Send data to the server via fetch
      fetch(this.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          // if (response.status === 200) {
          //   // Set a cookie that expires in 7 days to prevent modal from opening
          //   const date = new Date();
          //   date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
          //   document.cookie = `modalClosed=true; expires=${date.toUTCString()}; path=/`;

          //   console.log('Success:', response);
          //   // Optionally, handle success feedback to the user
          // } else {
          //   console.log('Failed to submit:', response);
          //   // Optionally, handle non-200 responses
          // }
          return response.json();
        })
        .then((data) => {
          console.log('Response data:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
          // Optionally, handle error feedback to the user
        });
    });

  // Check if the modal should be prevented from opening
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=').map((c) => c.trim());
    acc[key] = value;
    return acc;
  }, {});

  if (cookies.modalClosed === 'true') {
    // Prevent the modal from opening if the cookie is set
    console.log('Modal is prevented from opening due to cookie');
    // Add logic here to prevent the modal from showing
  }
});
