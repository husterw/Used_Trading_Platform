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
            window.location.href = "../html/news.html";
          } else {
            alert(data.message);
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
        alert("请输入学校邮箱地址：学号@hust.edu.cn");
        return;
      }
      fetch("http://localhost:3000/get-ver-code", {
        method: "POST",
        body: new URLSearchParams({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            alert("yanzhengma: " + data.message);
          } else {
            alert("验证码发送失败");
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
      alert("两次输入的密码不一致");
      return;
    }

    fetch(FORM.action, {
      method: FORM.method,
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("注册成功");
          location.reload();
        } else if (data.status === "already") {
          alert("该邮箱已被注册");
        } else {
          alert("注册失败");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
