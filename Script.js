// ===== Typing Effect =====
const typingTexts = ["BCA Student", "Web Developer", "Tech Enthusiast", "Football Player"];
let currentTextIndex = 0;
let currentCharIndex = 0;

function typeEffect() {
  const typingElement = document.getElementById("typing");
  if (currentCharIndex < typingTexts[currentTextIndex].length) {
    typingElement.textContent += typingTexts[currentTextIndex][currentCharIndex];
    currentCharIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  const typingElement = document.getElementById("typing");
  if (currentCharIndex > 0) {
    typingElement.textContent = typingTexts[currentTextIndex].substring(0, currentCharIndex - 1);
    currentCharIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    setTimeout(typeEffect, 200);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ===== Modal Functionality =====
function openModal(title) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-title").innerText = title;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Close modal on outside click
window.addEventListener("click", function(e) {
  if (e.target.id === "modal") {
    closeModal();
  }
});

// Close modal on Escape key
window.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeModal();
});

// ===== Profile Photo Upload =====
const profileInput = document.getElementById("upload-photo");
const profilePhoto = document.getElementById("profile-photo");

profileInput.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      profilePhoto.src = event.target.result;
      localStorage.setItem("profilePhoto", event.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// Load saved profile photo on page load
window.addEventListener("load", function() {
  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) profilePhoto.src = savedPhoto;

  const savedEmail = localStorage.getItem("contactEmail");
  const savedPhone = localStorage.getItem("contactPhone");

  if (savedEmail) document.getElementById("contact-email").textContent = savedEmail;
  if (savedPhone) document.getElementById("contact-phone").textContent = savedPhone;
});

// ===== Edit Contact Details =====
const editContactBtn = document.getElementById("edit-contact");

editContactBtn.addEventListener("click", function() {
  const emailElement = document.getElementById("contact-email");
  const phoneElement = document.getElementById("contact-phone");

  const newEmail = prompt("Enter your email:", emailElement.textContent);
  const newPhone = prompt("Enter your phone number:", phoneElement.textContent);

  if (newEmail && newPhone) {
    emailElement.textContent = newEmail;
    phoneElement.textContent = newPhone;

    localStorage.setItem("contactEmail", newEmail);
    localStorage.setItem("contactPhone", newPhone);
  }
});
