// tabs manipulation on tab bar
function openTab(tab) {
    // window.open("home.html");   // open new tab
    window.location.href = tab + '.html';   // reload current tab
}

// manual timing carousel
{
// let currentSlide = 0;
// const slideInterval = 3000;  // Change slide every 3 seconds (adjust as needed)
// let slideTimer;

// function showSlide(index) {
//     const slides = document.querySelectorAll('.carousel');

//     if (index >= slides.length) {
//         currentSlide = 0;
//     } else if (index < 0) {
//         currentSlide = slides.length - 1;
//     } else {
//         currentSlide = index;
//     }

//     slides.forEach((slide) => {
//         slide.style.display = 'none';
//     });

//     slides[currentSlide].style.display = 'block';
// }

// function prevSlide() {
//     showSlide(currentSlide - 1);
//     delayCarousel();
// }

// function nextSlide() {
//     showSlide(currentSlide + 1);
//     delayCarousel();
// }

// function startCarousel() {
//     slideTimer = setInterval(() => {
//         showSlide(currentSlide + 1);
//     }, slideInterval);
// }

// function stopCarousel() {
//     clearInterval(slideTimer);
// }

// function delayCarousel() {
//     stopCarousel();
//     startCarousel();
//     // startCarousel delay for a while at first itself
// }

// // Show the first slide initially
// showSlide(currentSlide);
// startCarousel();
}

$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
      let file = $(this).data('include') + '.html'
      $(this).load(file)
    })
  })