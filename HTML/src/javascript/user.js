//初始化个人信息页面

// 加载用户信息的函数  
function loadUserInfo() {  
  const userId = localStorage.getItem('userid');

  fetch(`http://localhost:3000/user/info/${userId}`)  
    .then(response => response.json())  
    .then(userInfo => {  
      // 更新用户信息显示  
      document.getElementById("userName").innerText = userInfo.uname;  
      document.getElementById("userPhone").innerText = userInfo.phone; 
      document.getElementById("userAddress").innerText = userInfo.dormitory; 
      document.getElementById("userIntroduction").innerText = userInfo.remark;
    })  
    .catch(error => console.error('Error fetching user info:', error));  
}  

// 页面加载时获取用户信息  
document.addEventListener('DOMContentLoaded', (event) => {  
  loadUserInfo(); // 初始化用户信息  
});  
/*
window.onload = function() {  
  initUserInfo();  
};  */





//页面跳转逻辑
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
