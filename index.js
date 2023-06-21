window.addEventListener('load', function() {
  const fadeIns = document.querySelectorAll('.fade-in');

  fadeIns.forEach(function(fadeIn) {
    fadeIn.classList.add('fade-in-active');
  });
});
