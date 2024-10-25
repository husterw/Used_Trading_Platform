function deleterow(button) {
  const ans = confirm("确认要删除？");
  if (ans === false) {
    return false;
  } else {
    let row = button.parentNode.parentNode;
    console.log(row);
    //通过其父节点删除
    row.parentNode.removeChild(row);
    showAlert("删除成功");
    return true;
  }
}

//初始化购物车
window.onload = function() {  
  loadCartItems();  
};  

function loadCartItems() {  
  const userId = localStorage.getItem('userid');
  if (!userId) {
      console.error('用户未登录，无法加载购物车');
      return; // 如果没有用户名，退出函数
  }
  fetch('http://localhost:3000/shopcart', {  
      method: 'POST',  
      headers: {  
          'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({ userId }) // 用户ID，如果查询是针对特定用户的  
  })  
  .then(response => response.json())  
  .then(products => {  
      const goodsListDiv = document.getElementById("scrollable-div");  
      goodsListDiv.innerHTML = ""; // 清空已有内容  
      products.forEach(product => {  
          const productDiv = document.createElement("div");  
          productDiv.className = "tbody";  
          productDiv.innerHTML = `  
              <div class="goods-img"><img src="${product.imgurl}" alt=""></div>  
              <div class="goods-name">${product.sname}</div>  
              <div>${product.price}元</div>  
              <div><a href="news.html?contactName=${product.uname}">${product.uname}</a></div>  
              <div><button onclick="delet(this,${product.sid})">移出购物车</button></div>  
          `;  
          goodsListDiv.appendChild(productDiv);  
      });  
  })  
  .catch(error => console.error('Error fetching cart:', error));  
}  

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

//删除购物车中信息
function delet(button, itemId) {  
  const row = button.parentElement.parentElement;  
  const ans = confirm("确认要删除？");
  if (ans===false) {
     return false;
  }else{
      const userId = localStorage.getItem('userid'); // 获取用户名 
      console.log(userId);
      if (!userId) {  
      console.error('用户未登录，无法删除购物车商品');  
      return; // 如果没有用户名，退出函数 
      } 
      // 发送DELETE请求到服务器  
      fetch(`http://localhost:3000/shopcart/${itemId}`, {  
       method: 'DELETE' ,
       headers: {  
        'Content-Type': 'application/json'  
        },  
        body: JSON.stringify({ userId }) 
      })  
      .then(response => {  
        if (response.ok) {  
              row.remove(); // 删除行  
              showAlert("删除成功"); 
          } else {  
              console.error('Failed to delete item:', response.statusText); 
          }  
      })  
      .catch(error => console.error('Error deleting item:', error));  
      }
  
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

function test(){
  if(!window.localStorage){
    alert("浏览器不支持localstorage");
 }else{
     //主逻辑业务
     console.log('Hello world!');
 }
 //localStorage.setItem('username', 'Alice');
 const username = localStorage.getItem('userid');
 console.log(username);  // 输出：Alice
  alert("极度愤怒");

}
