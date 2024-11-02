//添加购物车：
function addshop(button, productId) {  
    const userId = localStorage.getItem('userid'); 
    if (!userId) {
      console.error('用户未登录，无法添加商品到购物车');
      return; // 如果没有用户 ID，退出函数
    }
    fetch('http://localhost:3000/add-to-cart', {  
      method: 'POST',  
      headers: {  
      'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({ userId, productId })  
    })  
    .then(response => response.json())  
    .then(data => {  
    if (data.success) {  
      alert('商品添加成功！');  
    } else {  
      alert('添加失败：' + data.message);  
    }  
    })  
    .catch(error => {  
      console.error('Error:', error);  
      alert('发生错误，请重试。');  
    });  
    }


//商品详情跳转
function getProductId() {  
    const urlParams = new URLSearchParams(window.location.search);  
    return urlParams.get('id');  
}  
   
// 从服务器获取商品详情 
function fetchProductDetails() {  
    const itemId = getProductId();  
   
    if (itemId) {  
    fetch(`http://localhost:3000/products/${itemId}`)  
    .then(response => {  
    if (!response.ok) {  
    throw new Error('网络响应有误');  
    }  
    return response.json();  
    })  
    .then(data => {  
    // 填充商品详细信息到页面 
    document.getElementById('product-title').innerText = data.sname;  
    document.getElementById('product-price').innerHTML = `价格: <span>¥${data.price.toFixed(2)}</span>`;  
    document.getElementById('product-description').innerText = data.remark;  
    //document.getElementById('product-image').src = data.imgurl; 
    document.querySelector('#product-image img').src = data.imgurl;
    const addToCartButton = document.querySelector('.add-to-cart');
    addToCartButton.onclick = () => addshop(addToCartButton, itemId);
    const goToSellerButton = document.querySelector('.go-to-seller');
    goToSellerButton.onclick = () => gotoseller(data.uid);
    // 卖家头像  
    document.getElementById("seller-avatar").src = data.txurl;  
    // 卖家详情跳转按钮  
    document.getElementById("go-to-seller-button").innerText = data.uname;  
    })   
    .catch(error => console.error('获取商品详情时出错:', error));  
    } else {  
    console.error('未提供商品ID');  
    }  
}  
   
window.onload = fetchProductDetails;

//跳转商家主页
function gotoseller(userId) {  
  window.location.href = `seller.html?uid=${userId}`;  
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
