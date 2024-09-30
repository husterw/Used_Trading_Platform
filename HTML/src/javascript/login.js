document.addEventListener("DOMContentLoaded", function () {
  // 初始化第一个链接为活动状态
  const firstLink = document.querySelector(".login-info .password-login");
  if (firstLink) {
    firstLink.classList.add("active");
  }
  // 初始化只显示密码登录的表单，不显示邮箱登录的表单
  const secondForm = document.querySelector(".mail-login-form");
  if (secondForm && firstForm) {
    secondForm.classList.remove("active");
  }
});

document.querySelectorAll(".login-info > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".login-info > a")
      .forEach((link) => link.classList.remove("active"));
    this.classList.add("active");

    const firstForm = document.querySelector(".password-login-form");
    const secondForm = document.querySelector(".mail-login-form");

    if (this === document.querySelector(".password-login")) {
      firstForm.classList.remove("hidden");
      secondForm.classList.remove("active");
    } else if (this === document.querySelector(".mail-login")) {
      firstForm.classList.add("hidden");
      secondForm.classList.add("active");
    }
  });
});

document
  .querySelector(".register-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".login-img").classList.add("move-right");
    document.querySelector(".login-info-container").classList.add("fade-out");
    document.querySelector(".register-info-container").classList.add("fade-in");
  });

document.querySelector(".login-link").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");
  document.querySelector(".login-img").classList.remove("move-right");
  document.querySelector(".login-info-container").classList.remove("fade-out");
  document
    .querySelector(".register-info-container")
    .classList.remove("fade-in");
});
