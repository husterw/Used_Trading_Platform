document.addEventListener("DOMContentLoaded", function () {
  // 初始化第一个链接为活动状态
  const firstLink = document.querySelector(".login-info .password-login");
  if (firstLink) {
    firstLink.classList.add("active");
  }
  // 初始化只显示密码登录的表单，不显示邮箱登录的表单
  const secondForm = document.querySelector(".mail-login-form");
  if (secondForm) {
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
  document.querySelector(".login-img").classList.remove("move-right");
  document.querySelector(".login-info-container").classList.remove("fade-out");
  document
    .querySelector(".register-info-container")
    .classList.remove("fade-in");
});

// 处理密码登录表单提交
document.querySelectorAll("form").forEach((form) => {
  if (form.name === "plf" || form.name === "mlf") {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const Form = e.target;
      const formData = new FormData(Form);
      const type = Form.name === "plf" ? "password" : "email";
      formData.append("type", type);

      fetch(Form.action, {
        method: form.method,
        body: new URLSearchParams(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            localStorage.setItem("userid", data.userid);
            window.location.href = "../html/index.html";
          } else {
            showAlert(data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
});

// 控制表单切换时的数据存留
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("focusin", function () {
    document.querySelectorAll("form").forEach((f) => {
      if (f !== form) {
        f.querySelectorAll("input").forEach((input) => {
          input.value = "";
        });
      }
    });
  });
});

// 验证码倒计时控制和发送验证码请求
document.addEventListener("DOMContentLoaded", function () {
  const getVerCodeLinks = document.querySelectorAll(".get-ver-code");

  getVerCodeLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const email1 = document.querySelectorAll("input[name='email']")[0]?.value;
      const email2 = document.querySelectorAll("input[name='email']")[1]?.value;

      const email = email1 || email2;
      const regex = /^[A-Z]\d{9}@hust\.edu\.cn$/;

      if (regex.test(email)) {
        startCountDowm(link);
      } else {
        showAlert("请输入正确的学校邮箱");
        return;
      }
      fetch("http://localhost:3000/get-ver-code", {
        method: "POST",
        body: new URLSearchParams({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            // alert("yanzhengma: " + data.message);
            showVerCode(data.message);
          } else {
            showAlert("验证码发送失败");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });

  function startCountDowm(link) {
    let time = 60;
    link.classList.add("disabled");
    link.innerText = time + "s";
    link.style.pointerEvents = "none";

    const timer = setInterval(() => {
      time--;
      if (time > 0) {
        link.innerText = time + "s";
      } else {
        clearInterval(timer);
        link.classList.remove("disabled");
        link.innerText = "获取验证码";
        link.style.pointerEvents = "auto";
      }
    }, 1000);
  }
});

// 处理注册表单
document
  .querySelector("form[name='registerForm']")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const FORM = e.target;
    const formData = new FormData(FORM);

    const firstPassword = formData.get("password");
    const secondPassword = formData.get("confirmPassword");

    if (firstPassword !== secondPassword) {
      showAlert("两次输入的密码不一致");
      return;
    }

    fetch(FORM.action, {
      method: FORM.method,
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          location.reload();
        } else if (data.status === "already") {
          showAlert("该邮箱已被注册");
        } else if(data.status==="timeout"){
          showAlert("验证码超时，请重新获取验证码");
        }
        else {
          showAlert("验证码错误");
        }
      })
      .catch((err) => {
        console.error(err);
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

function showVerCode(message) {
  const VerCodeBox = document.createElement("div");
  const CloseBtn = document.createElement("div");
  const VerCode = document.createElement("div");
  VerCodeBox.classList.add("vercode-box");
  CloseBtn.classList.add("close-box");
  VerCode.classList.add("vercode-message");
  CloseBtn.innerHTML = `<i class='bx bx-x'></i>`;
  VerCode.innerText = "验证码已发送: " + message;

  CloseBtn.addEventListener("click", () => {
    VerCodeBox.classList.add("close");
    setTimeout(() => {
      document.body.removeChild(VerCodeBox);
    }, 200);
  });
  CloseBtn.addEventListener("mouseover", () => {
    CloseBtn.children[0].classList.add("bx-tada");
  });
  CloseBtn.addEventListener("mouseout", () => {
    CloseBtn.children[0].classList.remove("bx-tada");
  });

  VerCodeBox.appendChild(CloseBtn);
  VerCodeBox.appendChild(VerCode);

  document.body.appendChild(VerCodeBox);

  setTimeout(() => {
    VerCodeBox.classList.add("active");
  }, 100);
}
