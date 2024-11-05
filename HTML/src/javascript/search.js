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
const searchTerm = urlParams.get('value');

//document.addEventListener('DOMContentLoaded', function () {
const masonry = document.querySelector(".masonry");
const recommend = document.querySelector(".recommend");
const searchInput = document.getElementById('search-input');
// let resultcount = document.querySelector('.result-count');
let recommendProducts = [
    { imgCount: 1, title: "shu uemura", description: "shu uemura", sid: 1 },
    { imgCount: 2, title: "asdghwqer", description: "asdghwqer", sid: 2 },
    { imgCount: 3, title: "zxcvuiot", description: "zxcvuiot", sid: 3 },
    { imgCount: 4, title: "aobuitnna", description: "aobuitnna", sid: 4 },
    { imgCount: 5, title: "shu uemura", description: "shu uemura", sid: 5 },
];
// 模拟产品数据
let products = [];
// fetch("http://localhost:3000/search", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ goodsname: searchTerm }),
// })
//     .then((response) => response.json())
//     .then((products) => {
//         if (products.status === "success") {
//             // console.log("auc");
//             products.goods.forEach((product) => {
//                 // if (searchTerm) {
//                 // if(product.sname.toLowerCase().includes(searchTerm.toLowerCase())){
//                 updateproducts(product.imgurl, product.sname, product.remark, product.sid);
//                 //total++;
//                 // }
//                 //  }
//             }
//             );
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// function updateproducts(img, title, description, sid) {
//     let newproduct = { img, title, description, sid };
//     products.push(newproduct);
//     // console.log(products);
//     createProduct(newproduct);
// }

// // 创建产品项
// function createProduct(product) {
//     const productDiv = document.createElement('div');
//     productDiv.className = 'product-card';
//     productDiv.innerHTML = `
//             <div class="product-img">
//             <img src="${product.img}" alt="" />
//             </div>
//             <h3>${product.title}</h3>
//             <p>${product.description}</p>
//         `;
//     productDiv.addEventListener("click", function () {
//         window.location.href = `detail.html?id=${product.sid}`;
//     });
//     masonry.appendChild(productDiv);
// }

function createRecommend(product) {
    const recommendDiv = document.createElement('div');
    recommendDiv.className = 'product-card';
    recommendDiv.classList.add("show");
    recommendDiv.innerHTML = `
            <img src=${"../../image/" + product.imgCount + ".png"} alt="" />
            <h3>${product.title}</h3>
            <p>${product.description}</p>
        `;
    recommendDiv.addEventListener("click", function () {
        window.location.href = `detail.html?id=${product.sid}`;
    });
    recommend.appendChild(recommendDiv);
}


// 加载推荐商品
function loadProducts() {
    for (let i = 0; i < 8; i++) {
        const randomProduct = recommendProducts[Math.floor(Math.random() * recommendProducts.length)];
        createRecommend(randomProduct);
    }
}
loadProducts();
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadProducts();
    }
});

document
    .querySelector(".search-input")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const value = event.target.value;
            window.location.href = "search.html?value=" + value;
        }
    });