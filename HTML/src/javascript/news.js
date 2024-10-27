document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("user-search-input");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.querySelector(".bx-send");
  const params = getQueryParams();
  const contactName = params["contactName"];

  // 生成联系人
  if (contactName) {
    createContactBlock(contactName, "../../image/picture1.jpg", "Hello");
    document.querySelector(".user-list").firstChild.classList.add("active");
    document.querySelector(".contact-message .message-header").textContent =
      contactName;
  }

  // 用户的搜索逻辑
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim();

    document.querySelectorAll(".user-block").forEach((userBlock) => {
      const userName = userBlock.querySelector(".user-name p").innerHTML;

      if (userName.includes(searchValue)) {
        userBlock.style.display = "";
      } else {
        userBlock.style.display = "none";
      }
    });
  });

  // 用户的点击逻辑和和删除逻辑
  document.querySelectorAll(".user-block").forEach((element) => {
    element.addEventListener("click", (event) => {
      const chatPage = document.querySelector(
        ".contact-message .message-header"
      );

      const deleteIconRect = element.getBoundingClientRect();
      const deleteIconLeft = deleteIconRect.left;
      const deleteIconTop = deleteIconRect.top + 25;
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

  // 消息的发送逻辑，按 Enter发送和点击发送按钮发送
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const messageValue = messageInput.value.trim();
      if (messageValue) {
        // createMessageBlock(messageValue, "send");
        sendMessage();
        scrollToBottom();
      }
    }
  });
  sendButton.addEventListener("click", function () {
    const messageValue = messageInput.value.trim();
    if (messageValue) {
      // createMessageBlock(messageValue, "send");
      sendMessage();
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

  const gotoShopCart = document.querySelector(".bx-cart");
  gotoShopCart.addEventListener("click", function () {
    window.location.href = "shopcart.html";
  });

  const gotoUserpage = document.querySelector(".user-img");
  gotoUserpage.addEventListener("click", function () {
    window.location.href = "user.html";
  });

  // let count = 0;
  // const replyMessageList = ["Hello", "eaasg"];

  // 每隔5s检测是否发送了信息，如果有则回应
  setInterval(receiveMessage, 5000);
  // setInterval(function () {
  //   const messageBlockList = document.querySelectorAll(".message-block");
  //   const sendMessageBlock = messageBlockList[messageBlockList.length - 1];
  //   if (sendMessageBlock && sendMessageBlock.classList.contains("send")) {
  //     createMessageBlock(replyMessageList[count], "rece");
  //     count++;
  //     count = count === replyMessageList.length ? 0 : count;
  //     scrollToBottom();
  //   }
  // }, 2000);

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
        uploadFile(file);
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

// 生成聊天中的图片块
function createImgaeBlock(imgUrl, type) {
  const imgBlock = document.createElement("img");
  const img = document.createElement("img");
  img.src = imgUrl;
  imgBlock.appendChild(img);
  imgBlock.classList.add("message-block");
  imgBlock.classList.add(type);
  imgBlock.classList.add("img");
  document.querySelector(".message-show").appendChild(imgBlock);
}

// 将消息页面的消息滚动到底部
function scrollToBottom() {
  const messageShowBlock = document.querySelector(".message-show");
  messageShowBlock.scrollTop = messageShowBlock.scrollHeight;
}

// 解析 URL 参数
function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const regex = /([^&=]+)=([^&]*)/g;
  let m;
  while ((m = regex.exec(queryString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params;
}

// 生成联系人
function createContactBlock(userName, userImg, userInfo) {
  const userList = document.querySelector(".user-list");

  // 判断是否已经存在该联系人
  const userBlockList = document.querySelectorAll(".user-block");
  userBlockList.forEach((userBlock) => {
    if (userBlock.querySelector(".user-name p").innerHTML === userName) {
      userList.insertBefore(userBlock, userList.firstChild);
      return;
    }
  });

  const userBlock = document.createElement("div");
  userBlock.classList.add("user-block");

  const userImgBlock = document.createElement("div");
  userImgBlock.classList.add("user-img");
  const Img = document.createElement("img");
  Img.src = userImg;
  Img.alt = "";
  userImgBlock.appendChild(Img);

  const userDetails = document.createElement("div");
  userDetails.classList.add("user-details");

  const userNameDiv = document.createElement("div");
  userNameDiv.classList.add("user-name");
  const userNameP = document.createElement("p");
  userNameP.textContent = userName;
  userNameDiv.appendChild(userNameP);

  const userTimeDiv = document.createElement("div");
  userTimeDiv.classList.add("user-time");
  const userTimeP = document.createElement("p");
  userTimeP.textContent = getCurrentTime();
  userTimeDiv.appendChild(userTimeP);

  const userIntroductionDiv = document.createElement("div");
  userIntroductionDiv.classList.add("user-introduction");
  const userIntroductionP = document.createElement("p");
  userIntroductionP.textContent = userInfo;
  userIntroductionDiv.appendChild(userIntroductionP);

  userDetails.appendChild(userNameDiv);
  userDetails.appendChild(userTimeDiv);
  userDetails.appendChild(userIntroductionDiv);

  userBlock.appendChild(userImgBlock);
  userBlock.appendChild(userDetails);

  document
    .querySelector(".user-list")
    .insertBefore(userBlock, userList.firstChild);
}

// 获取当前时间
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// 上传文件
function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:3000/images", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") createImgaeBlock(data.url, "send");
      scrollToBottom();
    })
    .catch((error) => {
      console.log("uploaded file error:", error);
    });
}

function sendMessage() {
  const messageValue = document.getElementById("message-input").value.trim();
  if (messageValue) {
    const senduser = localStorage.getItem("userid");
    const receiveuser = document.querySelector(
      ".contact-message .message-header"
    ).innerHTML;
    const messagetoServer = {
      senduser: senduser,
      receiveuser: receiveuser,
      message: messageValue,
    };
    fetch("http://localhost:3000/send-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagetoServer),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") createMessageBlock(messageValue, "send");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function receiveMessage() {
  const receiveuser = localStorage.getItem("userid");
  const senduser = document.querySelector(
    ".contact-message .message-header"
  ).innerHTML;

  fetch("http://localhost:3000/receive-messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ senduser: senduser, receiveuser: receiveuser }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        if (data.type === "text") createMessageBlock(data.message.mail, "rece");
        else if (data.type === "image")
          createImgaeBlock(data.message.mail, "rece");
        scrollToBottom();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
