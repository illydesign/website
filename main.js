

// Object to keep track of slide indices for each modal
var modalSlideIndexes = {};


// Open the modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "flex";
    if (!modalSlideIndexes[modalId]) {
        modalSlideIndexes[modalId] = 1;
    }
    showSlides(modalId, modalSlideIndexes[modalId]); // Show the first slide or the current slide
}

// Close the modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add('ease-out'); // Add the fade-out animation class

    setTimeout(function () {
        modal.style.display = "none";
        modal.classList.remove('ease-out'); // Remove the class to reset the animation
    }, 200); // Match the timeout with the animation duration
}

// Navigate to the previous or next slide
function plusSlides(modalId, n) {
    var slides = document.getElementById(modalId).getElementsByClassName("mySlides");
    var totalSlides = slides.length;
    var currentSlideIndex = modalSlideIndexes[modalId];
    var newIndex = currentSlideIndex + n;

    // Cycle through slides
    if (newIndex > totalSlides) {
        newIndex = 1;
    } else if (newIndex < 1) {
        newIndex = totalSlides;
    }

    modalSlideIndexes[modalId] = newIndex;
    showSlides(modalId, newIndex);
}

// Show the current slide in a modal
function currentSlide(modalId, n) {
    modalSlideIndexes[modalId] = n; // Update the index
    showSlides(modalId, n);
}


// Show slides with a fade transition effect
function showSlides(modalId, n) {
    var i;
    var modal = document.getElementById(modalId);
    var slides = modal.getElementsByClassName("mySlides");
    var thumbnails = modal.getElementsByClassName("thumbnail");

    if (n > slides.length) n = 1;
    if (n < 1) n = slides.length;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active", "");
        thumbnails[i].style.opacity = "0.6"; // Dim all thumbnails
    }
    slides[n - 1].style.display = "block";
    slides[n - 1].style.animation = "fadeEffect 1s";
    thumbnails[n - 1].className += " active";
    thumbnails[n - 1].style.opacity = "1"; // Highlight the active thumbnail
}

document.addEventListener('keydown', function (event) {
    var openModal = document.querySelector('.modal[style*="flex"]');
    if (openModal) {
        var modalId = openModal.id;
        if (event.key === "Escape") {
            closeModal(modalId);
        } else if (event.key === "ArrowLeft") {
            plusSlides(modalId, -1);
        } else if (event.key === "ArrowRight") {
            plusSlides(modalId, 1);
        }
    }
});

function copyEmail() {
    var tempInput = document.createElement("input");
    var email = document.querySelector('.icon-wrapper .link').textContent.trim();
    document.body.appendChild(tempInput);
    tempInput.value = email;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    var tooltip = document.querySelector('.icon-wrapper .link .copy-tooltip');
    tooltip.innerHTML = 'Copied!';

    setTimeout(function () {
        tooltip.innerHTML = '<img src="./assets/icons/copy-to-clipboard.svg" alt="Copy Icon" class="copy-icon">Copy';
    }, 2000);
}

const currentYear = new Date().getFullYear();
document.getElementById('copyright').textContent = `© ${currentYear} illydesign | Handmade in HTML, CSS & Vanilla JS`;