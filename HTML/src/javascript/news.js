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
});
