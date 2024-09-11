// mouse-events.js

document.addEventListener('DOMContentLoaded', () => {
  let modalShown = false;
  let initialTouchY = 0;

  // Mouse leave event for desktop
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) {
      console.log('mouseleave');
      showModal();
    }
  });

  // Touch event for mobile
  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    initialTouchY = touch.screenY;
  });

  document.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const finalTouchY = touch.screenY;

    if (initialTouchY < 200 && finalTouchY > initialTouchY) {
      console.log('touchend');
      showModal();
    }
  });

  // Media query to check if the screen width is less than or equal to 768px (common mobile breakpoint)
  // Debounced scroll event
  let debounceTimer;

  const isMobile = window.matchMedia('(max-width: 1000px)').matches;

  const scrollThreshold = isMobile ? 11100 : 6520;

  window.addEventListener('scroll', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(
        'ScrollY:',
        window.scrollY,
        'Threshold:',
        scrollThreshold,
        'Modal shown:',
        modalShown
      ); // Log the values for debugging

      if (window.scrollY >= scrollThreshold && !modalShown) {
        console.log('Condition met, showing modal');
        showModal(); // Ensure this function is defined
        modalShown = true; // Set to true to prevent further modals
      }
    }, 100); // Adjust debounce delay as needed
  });

  // Time-based trigger (after 3.5 minutes)
  setTimeout(() => {
    showModal(true);
  }, 210000);

  function showModal(time = false) {
    console.log('Event Captured');
    if (time) console.log('time-based');

    if (!document.cookie.includes('modalClosed=true') && !modalShown) {
      var modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
      modal.show();
      modalShown = true; // Set flag to prevent multiple modals
    }
  }
});
