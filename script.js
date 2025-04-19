// Toggle Menu
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close Menu When a Link is Clicked
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("active");
  }
});

// Tab Switching
const analyseStockTab = document.getElementById("analyseStockTab");
const knowMoreTab = document.getElementById("knowMoreTab");
const aboutTab = document.getElementById("aboutTab");

const analyseStockLink = document.getElementById("analyseStock");
const knowMoreLink = document.getElementById("knowMore");
const aboutLink = document.getElementById("about");

// Show default tab (ANALYSE STOCK)
analyseStockTab.classList.add("active");

analyseStockLink.addEventListener("click", (e) => {
  e.preventDefault();
  analyseStockTab.classList.add("active");
  knowMoreTab.classList.remove("active");
  aboutTab.classList.remove("active");
});

knowMoreLink.addEventListener("click", (e) => {
  e.preventDefault();
  knowMoreTab.classList.add("active");
  analyseStockTab.classList.remove("active");
  aboutTab.classList.remove("active");
});

aboutLink.addEventListener("click", (e) => {
  e.preventDefault();
  aboutTab.classList.add("active");
  analyseStockTab.classList.remove("active");
  knowMoreTab.classList.remove("active");
});

// Redirect to the link
const analyseButton = document.getElementById("analyseButton");
analyseButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8501/#original-close-price-and-ma-for-100-days-and-ma-for-250-days";
});

// Search Functionality
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const cardTitle = card.querySelector("h3").textContent.toLowerCase();
    if (cardTitle.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Close Button Functionality
// const closeButtons = document.querySelectorAll(".close-button");

// closeButtons.forEach(button => {
//   button.addEventListener("click", (e) => {
//     e.stopPropagation(); // Prevent card click event
//     const card = e.target.closest(".card");
//     card.classList.remove("enlarged");
//     const info = card.querySelector(".info");
//     info.style.top = "100%";
//     info.style.opacity = "0";
//   });
// });

// Card Click Functionality
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    // Close all other cards
    cards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove("enlarged");
        otherCard.querySelector(".info").style.top = "100%";
        otherCard.querySelector(".info").style.opacity = "0";
      }
    });
    // Toggle the clicked card
    card.classList.toggle("enlarged");
    const info = card.querySelector(".info");
    if (card.classList.contains("enlarged")) {
      info.style.top = "0";
      info.style.opacity = "1";
    } else {
      info.style.top = "100%";
      info.style.opacity = "0";
    }
  });
});
// Close Card When Clicking Outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".card")) {
      cards.forEach(card => {
        card.classList.remove("enlarged");
        card.querySelector(".info").style.top = "100%";
        card.querySelector(".info").style.opacity = "0";
      });
    }
  });


// Show Info Boxes
const whatIsMaRow = document.getElementById("whatIsMaRow");
const typesOfMaRow = document.getElementById("typesOfMaRow");
const whatIsRsiRow = document.getElementById("whatIsRsiRow");
const typesOfRsiRow = document.getElementById("typesOfRsiRow");

const whatIsMaBox = document.getElementById("whatIsMaBox");
const typesOfMaBox = document.getElementById("typesOfMaBox");
const whatIsRsiBox = document.getElementById("whatIsRsiBox");
const typesOfRsiBox = document.getElementById("typesOfRsiBox");

whatIsMaRow.addEventListener("click", () => {
  whatIsMaBox.classList.add("active");
});

typesOfMaRow.addEventListener("click", () => {
  typesOfMaBox.classList.add("active");
});

whatIsRsiRow.addEventListener("click", () => {
    whatIsRsiBox.classList.add("active");
});

typesOfRsiRow.addEventListener("click", () => {
  typesOfRsiBox.classList.add("active");
});


// Close Info Boxes
const closeBoxButtons = document.querySelectorAll(".close-box-button");

closeBoxButtons.forEach(button => {
  button.addEventListener("click", () => {
    whatIsMaBox.classList.remove("active");
    typesOfMaBox.classList.remove("active");
    whatIsRsiBox.classList.remove("active");
    typesOfRsiBox.classList.remove("active");
  });
});