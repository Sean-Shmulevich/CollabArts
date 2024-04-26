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
  if (featuredMoreInfo !== null) {

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
  }

  let modalClose = document.querySelector('.close_modal');
  let modalOpen = document.querySelector('#open_modal');
  let modal = document.querySelector('.modal_instructions');
  let cameraButton = document.querySelector('#trackbutton');
  let cameraOn = false;

  if (modalClose && modalOpen && modal) {
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
        modalOpen.textContent = "Try our Interactive Demo";

        modalOpen.style.color = "rgba(255, 255, 255, 0.65)";
      }
      modal.style.display = "none";
    });

    modalOpen.addEventListener('click', function () {
      modal.style.display = "block";

    });
    modalClose.addEventListener('click', function () {
      modal.style.display = "none";
    });
  }


  function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';  // Reset the height

    textarea.style.height = textarea.scrollHeight + 'px';  // Set the height to scroll height
  }

  // Attach the function to the input event of the textarea
  const textarea = document.querySelectorAll('.form_text_area');

  if (textarea) {
    textarea.forEach((text) => {
      text.addEventListener('input', () => adjustTextareaHeight(text));
    });
  }

  const form = document.getElementById('get_involved_form');
  const result = document.getElementById('result');

  if (form !== null && result !== null) {

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      result.innerHTML = "Please wait..."

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = "Form submitted successfully";
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 3000);
        });
    });
  }

});