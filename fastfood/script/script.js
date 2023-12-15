// tabs manipulation on tab bar
function openTab(tab) {
    // window.open("home.html");   // open new tab
    window.location.href = tab + '.html';   // reload current tab
}

// manual timing carousel
// {
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
// }

$(function () {
  let includes = $('[data-include]');
  
  function loadContent(element) {
      let file = $(element).data('include') + '.html';
      $(element).load(file, function () {
          if (!localStorage.getItem("currentUID")) {
              $(element).find('.dropdown-content').hide();
          }
      });
  }

  $.each(includes, function () {
      loadContent(this);
  });
});

let currentUser = null;

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/users/' + localStorage.getItem("currentUID"),
    success: function(user) {
      let logInButton = $('.tabBar').children().last().find('a');
      logInButton.text(user.userName);
      currentUser = user;
    },
    error: function(error) {
      console.log(error);
    }
  });

  
});

$(document).on('click', '.logOut', function (e) { 
  e.preventDefault();
  
  localStorage.removeItem("currentUID");
  location.reload();
});

$(document).on('click', '.dropdown > .tabButton', function () {
  if (currentUser) {
    if (currentUser.userName == 'admin') {
      window.location.href = 'admin.html';
      $('.dropdown > .tabButton > a').attr('href', 'admin.html');
    }
    else {
      window.location.href = 'home.html';
      $('.dropdown > .tabButton > a').attr('href', 'home.html');
    }
  }
});