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

document.querySelector(".profile-edit").addEventListener("click", function (e) {
  e.preventDefault();
  const informationForm = document.querySelector(".information-form");
  const overlay = document.querySelector(".overlay");

  console.log(informationForm);

  informationForm.classList.add("show");
  overlay.classList.add("show");

  overlay.addEventListener("click", function () {
    informationForm.classList.remove("show");
    overlay.classList.remove("show");
  });
});
