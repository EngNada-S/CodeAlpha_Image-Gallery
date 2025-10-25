/* =========================================================
  GALLERY PROJECT SCRIPT
  =========================================================
  Sections:
  1️⃣ DOM Elements
  2️⃣ Global Variables
  3️⃣ Theme Handling
  4️⃣ Gallery Rendering
  5️⃣ Category Filtering
  6️⃣ Image Viewer
  7️⃣ Scroll To Top Button
  8️⃣ Keyboard Shortcuts
  ========================================================= */

// =========================================================
// 1️⃣ DOM Elements
// =========================================================
const theme = document.querySelector(".theme img");
const categories = document.querySelectorAll(".categories ul li");
const gallery = document.querySelector(".gallery");
const scrollToTop = document.querySelector(".top");
const viewer = document.querySelector(".viewer");
const closeViewer = document.querySelector(".closeViewer");

// =========================================================
// 2️⃣ Global Variables
// =========================================================
let galleryImages = [
  { img: "./images/1.jpg", category: "nature" },
  { img: "./images/2.jpg", category: "animals" },
  { img: "./images/3.jpg", category: "food" },
  { img: "./images/4.jpg", category: "travel" },
  { img: "./images/5.jpg", category: "food" },
  { img: "./images/6.jpg", category: "animals" },
  { img: "./images/7.jpg", category: "nature" },
  { img: "./images/8.jpg", category: "travel" },
  { img: "./images/9.jpg", category: "nature" },
  { img: "./images/10.jpg", category: "travel" },
  { img: "./images/11.jpg", category: "food" },
  { img: "./images/12.jpg", category: "animals" },
  { img: "./images/13.jpg", category: "food" },
  { img: "./images/14.jpg", category: "animals" },
  { img: "./images/15.jpg", category: "nature" },
];

let currentTheme = "dark";
let currentItems = galleryImages;
let currentOpen = null;

// =========================================================
// 3️⃣ Theme Handling (Dark / Light Mode)
// =========================================================
const setTheme = function () {
  if (currentTheme === "light") {
    // Switch to Dark
    document.body.classList.remove("light");
    theme.src = "./images/sun.png";
    currentTheme = "dark";
  } else {
    // Switch to Light
    document.body.classList.add("light");
    theme.src = "./images/moon.png";
    currentTheme = "light";
  }

  localStorage.setItem("theme", currentTheme);
};

// Apply saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  theme.src = "./images/moon.png";
  currentTheme = "light";
}
theme.addEventListener("click", setTheme);

// =========================================================
// 4️⃣ Gallery Rendering
// =========================================================
const displayGallery = function (imgs) {
  gallery.innerHTML = "";

  imgs.forEach((img, i) => {
    const card = `
      <div class="card">
        <img src="${img.img}" alt="${img.category}" loading="lazy" onclick="displayViewer(${i})">
      </div>
    `;
    gallery.insertAdjacentHTML("beforeend", card);
  });

  // Animation using GSAP
  gsap.from(".card", {
    opacity: 0,
    y: -50,
    ease: "power1.out",
    duration: 0.5,
    stagger: 0.3,
  });
};

// Initial render
displayGallery(currentItems);

// =========================================================
// 5️⃣ Category Filtering
// =========================================================
categories.forEach((cat) => {
  cat.addEventListener("click", function () {
    const selectedCat = this.dataset.cat;

    // Filter by category or show all
    currentItems = galleryImages.filter(
      (img) => selectedCat === "all" || img.category === selectedCat
    );

    // Active state update
    categories.forEach((a) => a.classList.remove("active"));
    this.classList.add("active");

    // Update gallery
    displayGallery(currentItems);
  });
});

// =========================================================
// 6️⃣ Image Viewer (Open / Close / Navigation)
// =========================================================
const displayViewer = function (i) {
  currentOpen = i;
  viewer.style.display = "flex";
  viewer.querySelector("img").src = currentItems[i].img;
};

const handleNext = function () {
  currentOpen = (currentOpen + 1) % currentItems.length;
  viewer.querySelector("img").src = currentItems[currentOpen].img;
};

const handlePrevious = function () {
  currentOpen = (currentOpen - 1 + currentItems.length) % currentItems.length;
  viewer.querySelector("img").src = currentItems[currentOpen].img;
};

// Close viewer by button
closeViewer.addEventListener("click", () => {
  viewer.style.display = "none";
});

// Close viewer by clicking outside image
viewer.addEventListener("click", (e) => {
  if (
    !viewer.querySelector(".img-holder").contains(e.target) &&
    !closeViewer.contains(e.target)
  ) {
    viewer.style.display = "none";
  }
});

// =========================================================
// 7️⃣ Scroll To Top Button
// =========================================================
window.addEventListener("scroll", () => {
  scrollToTop.style.display = window.scrollY >= 150 ? "flex" : "none";
});

scrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// =========================================================
// 8️⃣ Keyboard Shortcuts (← → Esc)
// =========================================================
document.addEventListener("keydown", (e) => {
  if (viewer.style.display === "flex") {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "Escape") viewer.style.display = "none";
  }
});
