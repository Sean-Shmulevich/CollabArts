particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 90,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 100,
      "color": "#aa90f9",
      "opacity": 0.6,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "bubble"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 6,
        "duration": 1,
        "opacity": 0.75,
        "speed": 2
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

function toggleNav() {
  var navBar = document.getElementById("navBar");
  navBar.classList.toggle("show");
}


var slideIndex = 0;

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 2000); // Change slide every 2 seconds
}


function plusSlides(n) {
  showSlides(slideIndex += n);
}

document.addEventListener('DOMContentLoaded', function () {
  // showSlides();

  var featuredMoreInfo = document.querySelector('.featured_more_info');
  featuredMoreInfo.addEventListener('click', function () {
    // Add your code here to handle the click event

    let featuredItems = document.querySelector('.featured_items');

    let newCarat = document.createElement('span');
    newCarat.className = 'carat';
    if (featuredItems.style.display === "flex") {
      featuredItems.style.display = "none";
      featuredMoreInfo.textContent = "more info";
      newCarat.textContent = "⌄";
      featuredMoreInfo.appendChild(newCarat);
    }
    else {
      featuredMoreInfo.textContent = "less info";
      newCarat.textContent = "⌃";
      featuredMoreInfo.appendChild(newCarat);
      featuredItems.style.display = "flex";
    }
  }, true);

  let modalClose = document.querySelector('.close_modal');
  let modalOpen = document.querySelector('.open_modal');
  let modal = document.querySelector('.modal_instructions');
  let cameraButton = document.querySelector('#trackbutton');
  let cameraOn = false;

  cameraButton.addEventListener('click', function () {
    cameraOn = !cameraOn;
    if (cameraOn) {
      cameraButton.textContent = "Disable Camera";
      cameraButton.style.backgroundColor = "red";
      modalOpen.textContent = "Interactive Demo Active";
      modalOpen.style.color = "#4caf50";
    }
    else {
      cameraButton.textContent = "Enable Camera";
      cameraButton.style.backgroundColor = "#4caf50";
      modalOpen.textContent = "Try our Interactive Demo";
      modalOpen.style.color = "rgba(255, 255, 255, 0.65)";
    }
  });

  modalOpen.addEventListener('click', function () {
    modal.style.display = "block";

  });
  modalClose.addEventListener('click', function () {
    modal.style.display = "none";
  });
});