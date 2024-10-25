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

  informationForm.classList.add("show");
  overlay.classList.add("show");

  overlay.addEventListener("click", function () {
    informationForm.classList.remove("show");
    overlay.classList.remove("show");
  });
});

document
  .querySelector("form[name='modify-form']")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const userName = formData.get("username");
    const userPhone = formData.get("userphone");
    const userAddress = formData.get("useraddress");
    const userIntroduction = formData.get("userintroduction");
    showAlert("修改成功");

    fetch(form.action, {
      method: form.method,
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          document.querySelector(".user-name").innerHTML = userName;
          document.querySelector(".user-phone").innerHTML = userPhone;
          document.querySelector(".user-address").innerHTML = userAddress;
          document.querySelector(".user-introduction").innerHTML =
            userIntroduction;
          document.querySelector(".information-form").classList.remove("show");
          document.querySelector(".overlay").classList.remove("show");
          window.location.reload();
        }
      })
      .catch((error) => {
        showAlert("修改失败");
      });
  });

function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.classList.add("alert-box");
  alertBox.innerHTML = `
    <i class='bx bxs-error-circle bx-tada' ></i>
    <span class="alert-message">${message}</span>
  `;
  document.body.appendChild(alertBox);

  // show alert
  setTimeout(() => {
    alertBox.classList.add("active");
  }, 100);

  // hide alert after 3s
  setTimeout(() => {
    alertBox.classList.remove("active");
    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 300);
  }, 2000);
}
