// focus-events.js

// Handles focus and blur events for form buttons
const buttons = document.querySelectorAll('.likely-btn');

// Add focus styling to the clicked button
buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        buttons.forEach(btn => btn.classList.remove('focused'));
        button.classList.add('focused');
    });
});

// Optional CSS for focus state
const style = document.createElement('style');
style.innerHTML = `
    .likely-btn.focused {
        outline: 3px solid #0056b3; /* Customize the focus style */
    }
`;
document.head.appendChild(style);
