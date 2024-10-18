function deleterow(button) {
  const ans = confirm("确认要删除？");
  if (ans === false) {
    return false;
  } else {
    let row = button.parentNode.parentNode;
    console.log(row);
    //通过其父节点删除
    row.parentNode.removeChild(row);
    alert("删除成功");
    return true;
  }
}
window.onload = function () {
  loadCartItems();
};

function loadCartItems() {
  fetch("http://localhost:3000/shopcart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: 777 }), // 用户ID，如果查询是针对特定用户的
  })
    .then((response) => response.json())
    .then((products) => {
      const goodsListDiv = document.getElementById("scrollable-div");
      goodsListDiv.innerHTML = ""; // 清空已有内容
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "tbody";
        productDiv.innerHTML = `  
                <div class="goods-img"><img src="${product.imgurl}" alt=""></div>  
                <div class="goods-name">${product.sname}</div>  
                <div>${product.price}元</div>  
                <div><a href="http:bilibili.com">${product.uid}</a></div>  
                <div><button onclick="deleterow(this)">移出购物车</button></div>  
            `;
        goodsListDiv.appendChild(productDiv);
      });
    })
    .catch((error) => console.error("Error fetching cart:", error));
}

// 跳转页面逻辑
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
