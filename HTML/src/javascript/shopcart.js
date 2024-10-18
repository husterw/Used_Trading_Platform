
function deleterow(button){
	const ans = confirm("确认要删除？");
	if (ans===false) {
       return false;
    }else{
        let row =button.parentNode.parentNode;
        console.log(row);
        //通过其父节点删除
        row.parentNode.removeChild(row);
    	alert("删除成功")
    	return true
    }
}
//初始化购物车
/*
function renderCart() {  
    const products = [  
      { name: "微积分", price: 25.0, img: "../image/wlq.gif", seller: "http://bilibili.com" },  
      { name: "大学物理", price: 350.0, img: "../image/wlq.gif", seller: "http://bilibili.com" }, 
      { name: "电路理论", price: 55.0, img: "../image/wlq.gif", seller: "http://bilibili.com" },  
      { name: "22", price: 20.0, img: "../image/wlq.gif", seller: "http://bilibili.com" },  
      { name: "33", price: 255.0, img: "../image/wlq.gif", seller: "http://bilibili.com" },  
      { name: "44", price: 2550.0, img: "../image/wlq.gif", seller: "http://bilibili.com" },   
    ];
    const goodsListDiv = document.getElementById("scrollable-div");  
    goodsListDiv.innerHTML = ""; // 清空已有内容  
    products.forEach(product => {  
        const productDiv = document.createElement("div");  
        productDiv.className = "tbody";  
        productDiv.innerHTML = `  
            <div class="goods-img"><img src="${product.img}" alt=""></div>  
            <div class="goods-name">${product.name}</div>  
            <div>￥${product.price}元</div>  
            <div><a href="${product.seller}">商家</a></div>  
            <div><button onclick="deleterow(this)">移出购物车</button></div>  
        `;  
        goodsListDiv.appendChild(productDiv);  
    });  
  }  
*/
document.getElementById("myCartBtn").onclick = function() {  
    fetch('http://localhost:3000/shopcart', {  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/json'  
        },  
        body: JSON.stringify({ userId: 5555 }) // 用户ID，如果查询是针对特定用户的  
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
                <div><a href="http:bilibili.com">${product.uid}</a></div>  
                <div><button onclick="deleterow(this)">移出购物车</button></div>  
            `;  
            goodsListDiv.appendChild(productDiv);  
        });  
    })  
    .catch(error => console.error('Error fetching cart:', error));  
}  

