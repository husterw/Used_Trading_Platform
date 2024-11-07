//卖家主页跳转
function getsellerid() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("uid");
}

function getsellername() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("uname");
}
//获取卖家信息
function fetchseller() {
  const userId = getsellerid();
  const username = getsellername();
  console.log(username);
  if(username==null){
    fetch(`http://localhost:3000/user/info/${userId}`)
    .then((response) => response.json())
    .then((userInfo) => {
      // 更新用户信息显示
      document.getElementById("seller-avatar").src = userInfo.txurl;
      document.getElementById("userName").innerText = userInfo.uname;
      document.getElementById("userPhone").innerText = userInfo.phone;
      document.getElementById("userAddress").innerText = userInfo.dormitory;
      document.getElementById("userIntroduction").innerText = userInfo.remark;
    })
    .catch((error) => console.error("Error fetching user info:", error));
  }
  
  else{
    fetch(`http://localhost:3000/user/infoname/${username}`)
    .then((response) => response.json())
    .then((userInfo) => {
      // 更新用户信息显示
      document.getElementById("seller-avatar").src = userInfo.txurl;
      document.getElementById("userName").innerText = userInfo.uname;
      document.getElementById("userPhone").innerText = userInfo.phone;
      document.getElementById("userAddress").innerText = userInfo.dormitory;
      document.getElementById("userIntroduction").innerText = userInfo.remark;
    })
    .catch((error) => console.error("Error fetching user info:", error));
  }
}

//初始化用户发布的商品信息
async function loadsellerProducts() {
  const userId = getsellerid();
  const username = getsellername();
  if (username==null) {
    try {
      const response = await fetch(
        `http://localhost:3000/goods?userId=${userId}`
      );
      const products = await response.json();
      const productsContainer = document.querySelector(".products");
      productsContainer.innerHTML = ""; // 清空当前内容后遍历商品数据并动态添加到页面
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `  
  <div class="product-img">
  <img src="${product.imgurl}" alt="商品2" /> 
  </div> 
  <h3>${product.sname}</h3>  
  <p>${product.remark}</p>  
  `;
        productDiv.addEventListener("click", () => {
          window.location.href = `detail.html?id=${product.sid}`;
        }),
          productsContainer.appendChild(productDiv);
      });
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  } 
  else {
    //console.warn("User ID is not provided in the URL.");
    try {
      const response = await fetch(
        `http://localhost:3000/goodss?uname=${username}`
      );
      const products = await response.json();
      const productsContainer = document.querySelector(".products");
      productsContainer.innerHTML = ""; // 清空当前内容后遍历商品数据并动态添加到页面
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `  
  <div class="product-img">
  <img src="${product.imgurl}" alt="商品2" /> 
  </div> 
  <h3>${product.sname}</h3>  
  <p>${product.remark}</p>  
  `;
        productDiv.addEventListener("click", () => {
          window.location.href = `detail.html?id=${product.sid}`;
        }),
          productsContainer.appendChild(productDiv);
      });
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  }
}
// 页面加载时获取用户信息
document.addEventListener("DOMContentLoaded", (event) => {
  fetchseller(); // 初始化用户信息
  loadsellerProducts(); //初始化发布商品信息
});

//商品详情跳转
function gotodetail(itemId) {
  window.location.href = `detail.html?id=${itemId}`;
}

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
