document.querySelectorAll(".user-block").forEach((element) => {
  element.addEventListener("click", (event) => {
    const chatPage = document.querySelector(".contact-message .message-header");

    const deleteIconRect = element.getBoundingClientRect();
    const deleteIconLeft = deleteIconRect.left;
    const deleteIconTop = deleteIconRect.top + 10;
    const deleteIconWidth = 30;
    const deleteIconHeight = 30;
    // 判断点击的是否为删除按钮
    if (
      event.clientX >= deleteIconLeft &&
      event.clientX <= deleteIconLeft + deleteIconWidth &&
      event.clientY >= deleteIconTop &&
      event.clientY <= deleteIconTop + deleteIconHeight
    ) {
      event.stopPropagation();
      if (element.classList.contains("active")) {
        chatPage.innerHTML = "";
      }
      element.remove();
      return;
    }
    // 切换选中状态
    document.querySelectorAll(".user-block").forEach((el) => {
      el.classList.remove("active");
    });
    element.classList.add("active");
    chatPage.innerHTML = element.querySelector(".user-name p").innerHTML;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("user-search-input");
  const userBlocks = document.querySelectorAll(".user-block");
  const messageInput = document.getElementById("message-input");
  const messageShowBlock = document.querySelector(".message-show");
  const sendButton = document.querySelector(".bx-send");

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim();

    userBlocks.forEach((userBlock) => {
      const userName = userBlock.querySelector(".user-name p").innerHTML;

      if (userName.includes(searchValue)) {
        userBlock.style.display = "";
      } else {
        userBlock.style.display = "none";
      }
    });
  });

  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const messageValue = messageInput.value.trim();
      if (messageValue) {
        const messageBlock = document.createElement("div");
        messageBlock.textContent = messageValue;
        messageBlock.classList.add("message-block");
        messageBlock.classList.add("send");
        messageShowBlock.appendChild(messageBlock);
        messageInput.value = "";
      }
    }
  });

  sendButton.addEventListener("click", function () {
    const messageValue = messageInput.value.trim();
    if (messageValue) {
      const messageBlock = document.createElement("div");
      messageBlock.textContent = messageValue;
      messageBlock.classList.add("message-block");
      messageBlock.classList.add("send");
      messageShowBlock.appendChild(messageBlock);
      messageInput.value = "";
    }
  });

  const gotoMessagePage = document.querySelector(".bx-comment-dots");
  gotoMessagePage.addEventListener("click", function () {
    window.location.reload();
  });

  const gotoLoginPage = document.querySelector(".bx-log-out");
  gotoLoginPage.addEventListener("click", function () {
    window.location.href = "login.html";
  });
});
