<<<<<<< HEAD
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
});
=======
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

  // 用户的搜索逻辑
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

  // 消息的发送逻辑，按 Enter发送和点击发送按钮发送
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const messageValue = messageInput.value.trim();
      if (messageValue) {
        createMessageBlock(messageValue, "send");
        scrollToBottom();
      }
    }
  });
  sendButton.addEventListener("click", function () {
    const messageValue = messageInput.value.trim();
    if (messageValue) {
      createMessageBlock(messageValue, "send");
      scrollToBottom();
    }
  });

  // 跳转到其他页面的逻辑
  const gotoMessagePage = document.querySelector(".bx-comment-dots");
  gotoMessagePage.addEventListener("click", function () {
    window.location.reload();
  });

  const gotoLoginPage = document.querySelector(".bx-log-out");
  gotoLoginPage.addEventListener("click", function () {
    window.location.href = "login.html";
  });

  let count = 0;
  const replyMessageList = ["Hello", "eaasg"];

  // 每隔2s检测是否发送了信息，如果有则回应
  setInterval(function () {
    const messageBlockList = document.querySelectorAll(".message-block");
    const sendMessageBlock = messageBlockList[messageBlockList.length - 1];
    if (sendMessageBlock && sendMessageBlock.classList.contains("send")) {
      createMessageBlock(replyMessageList[count], "rece");
      count++;
      count = count === replyMessageList.length ? 0 : count;
      scrollToBottom();
    }
  }, 2000);

  // 生成聊天框中的表情
  const emojiButton = document.querySelector(".bx-wink-tongue");
  const emojiList = document.querySelector(".emoji-list");
  const emojiListItems = document.querySelectorAll(".emoji");

  emojiButton.addEventListener("click", function () {
    if (emojiList.classList.contains("show")) {
      emojiList.classList.remove("show");
    } else {
      emojiList.classList.add("show");
    }
  });

  emojiList.addEventListener("mouseover", function () {
    emojiList.classList.add("show");
  });

  emojiList.addEventListener("mouseout", function () {
    emojiList.classList.remove("show");
  });

  emojiListItems.forEach((emoji) => {
    emoji.addEventListener("click", function () {
      const emojiValue = emoji.innerHTML;
      messageInput.value += emojiValue;
    });
  });

  // 传输文件
  document.querySelector(".bx-file").addEventListener("click", function () {
    document.querySelector("#file-input").click();
  });

  document
    .querySelector("#file-input")
    .addEventListener("change", function (event) {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        console.log(file.name);
        //TODO: 上传文件的逻辑
      }
    });
});

// 生成聊天框中的文字块
function createMessageBlock(content, type) {
  const messageBlock = document.createElement("div");
  messageBlock.textContent = content;
  messageBlock.classList.add("message-block");
  messageBlock.classList.add(type);
  document.querySelector(".message-show").appendChild(messageBlock);
  document.getElementById("message-input").value = "";
}

// 将消息页面的消息滚动到底部
function scrollToBottom() {
  const messageShowBlock = document.querySelector(".message-show");
  messageShowBlock.scrollTop = messageShowBlock.scrollHeight;
}
>>>>>>> f6221e1420fcd583e2d958df67e38241a6d7a5cd
