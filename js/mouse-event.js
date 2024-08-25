document.addEventListener('mouseleave', (e) => {
  e.preventDefault();

  console.log('Event Captured');
  var modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
  modal.show();
  // document.addEventListener('DOMContentLoaded', function () {
  //   var modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
  //   modal.show();
  // });
});
