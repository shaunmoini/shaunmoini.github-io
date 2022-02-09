$(document).ready(() => {
  // All animations from animate.css will take half the time to accomplish
  document.documentElement.style.setProperty('--animate-duration', '.5s');

  //navbar event listeners
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(() => {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Check for click events on navbar-items
  $(".navbar-end .navbar-item").click(() => {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar
  let prevScrollpos = window.pageYOffset;
  $(window).scroll(() => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      $("nav").removeClass("animate__slideOutUp");
      $("nav").addClass("animate__slideInDown");
    }
    else
      $("nav").addClass("animate__animated animate__slideOutUp");
    prevScrollpos = currentScrollPos;
  });
});