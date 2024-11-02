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

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('type');

//document.addEventListener('DOMContentLoaded', function () {
const masonry = document.querySelector(".masonry");
const searchInput = document.getElementById('search-input');
let resultcount = document.querySelector('.result-count');
let SearchedProducts = [];
// 模拟产品数据
let products = [];
//let total=0;
fetch("http://localhost:3000/searchtype", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ goodstype:searchTerm }),
})
    .then((response) => response.json())
    .then((products) => {
        if (products.status === "success") {
            console.log("auc");
            products.goods.forEach((product) => {
               // if (searchTerm) {
                   // if(product.sname.toLowerCase().includes(searchTerm.toLowerCase())){
                        updateproducts(product.imgurl, product.sname, product.remark,product.sid);
                        //total++;
                   // }
              //  }
            }
            );
        }
    })
    .catch((err) => {
        console.log(err);
    });

function updateproducts(img, title, description,sid) {
    let newproduct = { img, title, description ,sid};
    products.push(newproduct);
    console.log(products);
    createProduct(newproduct);
}
// if (searchTerm) {
//     searchInput.value = searchTerm;
//     SearchedProducts = products.filter(product =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
// } else {
//     SearchedProducts = products;
// }
//resultcount.textContent = `"${searchTerm}" 共找到 ${SearchedProducts.length} 个商品`;
// loadProducts();

// 创建产品项
function createProduct(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-card';
    productDiv.innerHTML = `
            <img src="${product.img}" alt="" />
            <h3>${product.title}</h3>
            <p>${product.description}</p>
        `;
    // return productDiv;
    // loadProducts();
    productDiv.addEventListener("click", function () {
            window.location.href = `detail.html?id=${product.sid}`;
        });
    masonry.appendChild(productDiv);
}

// 加载更多产品
// function loadProducts() {
//     // for (let i = 0; i < 50; i++) {
//     //     const randomProduct = SearchedProducts[Math.floor(Math.random() * SearchedProducts.length)];
//     //     const productElement = createProduct(randomProduct);
//     //     masonry.appendChild(productElement);
//     // }
    
//         // masonry.appendChild();
//     document.querySelectorAll(".product-card").forEach((card, index) => {
//         card.addEventListener("click", function () {
//             window.location.href = "details.html";
//         });
//     });
// }

document
    .querySelector(".search-input")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const value = event.target.value;
            window.location.href = "search.html?value=" + value;
        }
    });