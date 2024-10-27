const gotoMessagePage = document.querySelector(".bx-comment-dots");
gotoMessagePage.addEventListener("click", function () {
  window.location.href = "news.html";
});

const gotoLoginPage = document.querySelector(".bx-log-out");
gotoLoginPage.addEventListener("click", function () {
  window.location.href = "login.html";
});

const gotoUserPage = document.querySelector(".user-img");
gotoUserPage.addEventListener("click", function () {
  window.location.href = "user.html";
});

const gotoShopCart = document.querySelector(".bx-cart");
gotoShopCart.addEventListener("click", function () {
  window.location.href = "shopcart.html";
});

// DOM
const masonry = document.querySelector(".masonry");
const divider1 = masonry.querySelector(".divider1");
const productNames = ["shu uemura", "asdghwqer", "zxcvuiot", "aobuitnna"];

// variables
let pageSize = 12;
let cardCount = 0;
let colHeights = [0, 0, 0, 0]; // each column's height
let observer; // intersection observer
let imgCount = 1;

// functions
function loadData() {
  for (let i = 0; i < pageSize; i++) {
    createCard(i);
  }
}

loadData();

async function createCard(i) {
  const card = document.createElement("div");
  card.classList.add("card");
  // hide at first
  card.style.position = "fixed";
  card.style.top = 0;
  card.style.left = 0;
  card.style.visibility = "hidden";

  const img = await loadImage();

  if (img) {
    card.append(img);
    const title = document.createElement("div");
    const idturn = i % 4;
    title.classList.add("product-name");
    title.textContent = productNames[idturn];
    card.append(title);
    document.body.appendChild(card);
    const cardIndex = cardCount;
    const colIndex = (cardIndex + 1) % 4;
    const cardHeight = card.clientHeight;
    colHeights[colIndex] += cardHeight;
    setMasonryHeight();
    masonry.insertBefore(card, divider1);

    // show card
    card.style.position = "";
    card.style.visibility = "";
    card.classList.add("show");
    card.addEventListener("click", function () {
      window.location.href = `detail.html?id=${idturn+1}`;
    });
    cardCount++;

    // load more when last card shows
    if (i === pageSize - 1) {
      observe(card);
    }
  }
}

function observe(card) {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      if (entries.length === 1 && entries[0].isIntersecting) {
        loadData();
        observer.unobserve(entries[0].target);
      }
    });
  }
  observer.observe(card);
}

async function loadImage() {
  const img = document.createElement("img");
  const src = "../../image/products/" + imgCount + ".png";
  imgCount = imgCount == 4 ? 1 : imgCount + 1;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function setMasonryHeight() {
  masonry.style.height = Math.max(...colHeights) + 10 + "px";
}

// handle window resize
function resetMasonryHeight() {
  colHeights = [0, 0, 0, 0];
  document.querySelectorAll(".card").forEach((card, index) => {
    const cardHeight = card.clientHeight;
    const colIndex = (index + 1) % 4;
    colHeights[colIndex] += cardHeight;
  });
  setMasonryHeight();
}

window.addEventListener("resize", resetMasonryHeight);

document
  .querySelector(".search input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.target.value;
      window.location.href = "search.html?value=" + value;
    }
  });
