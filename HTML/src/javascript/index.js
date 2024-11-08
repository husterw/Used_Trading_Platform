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

document.querySelectorAll(".category-list li").forEach((type, index) => {
  type.addEventListener("click", function () {
    index = index + 1;
    window.location.href = "searchtype.html?type=" + index;
  });
});

// DOM
const masonry = document.querySelector(".masonry");
const divider1 = masonry.querySelector(".divider1");
const productNames = [
  "",
  "数据库系统概论",
  "C++程序设计",
  "C++Primer Plus",
  "C Primer Plus",
  "计算机网络",
  "做旧毛边牛仔半身裙",
  "美式学院风包臀裙",
  "iQOO 13",
  /*8*/ "iQOO 13",
  "华为nova 13 pro",
  "过膝风衣男外套",
  "良品铺子早餐面包",
  "针织运动裤",
  "honor/荣耀 Magic 6",
  "5个背包D型挂扣",
  "华为耳机有线TypeC" /*16 */,
  "零食大礼包",
  "良品铺子鱼豆腐" /*18 */,
  "漫步者GM260Plus",
  "额尔古纳河右岸",
  "OPPO Find X3（5G）",
  "电路与电子学（第6版）李晶皎",
  /*22*/ "笔记本",
  "vivo X60（5G）",
  "iPhone 8 Plus",
  "魅族lucky+08",
  "HUAWEI P40 Pro（5G）",
  "iPhone 11",
  "iPhone 13",
  "Redmi K60（5G）",
  "vivo S9（5G）",
  "荣耀 X50",
  "iQOO 11s",
  "iPhone 12",
  "HUAWEI nova 12 Pro",
  /*35*/ "高腰棕色a字半身裙",
  "休闲百褶裙",
  "伯克利百搭伞裙",
  "黑色毛呢半身裙",
  "小米15",
  "一加13",
  "羊毛开衫女秋冬针织毛衣",
  "V领羊毛开衫毛衣坎肩外套",
  "大码后开叉半身裙",
  "奶蓝色针织外套",
  "蝴蝶结刺绣针织外",
  "羊毛开衫",
  /*48*/ "iphone 13 pm",
  "冬季休闲西服",
  "宽松保暖御寒男外套",
  "加厚保暖夹克男外套",
  "派克服冬季男外套",
  "软壳夹克男外套",
  "单西装男外套",
  "水洗做旧牛仔夹克男",
  "牛仔夹克",
  "宽松阔腿裤",
  "HUAWEI P60" /*58*/,
  "抽绳松紧腰休闲长裤",
  "阔腿牛仔裤",
  "宽松直筒工装裤",
  "弹力修身牛仔裤",
  "束脚卫裤男",
  "男士休闲裤肌",
  "直筒卫裤男",
  "iPhone 14 Plus" /*66 */,
  "senhomtog耳机有线入耳式type-c",
  "OPPO Find N2 Flip",
  "OPPO原装有线耳机",
  "JBL Run2入耳式运动耳机",
  "DUNU达音科titans有线耳机入耳式",
  "Final E500 E3000C E2000 E1000 STUDY1 ASMR入耳式耳机",
  "漫步者GM380耳机有线入耳式",
  "HiFi有线耳机",
  "数字耳机有线半入耳式",
  "漫步者T1ULtra高音质有线耳机",
  "iQOO原装入耳式耳机",
  "智能手环",
  "SJCAM速影运动拇指相机",
  "旅游随身小型校园vlog卡片机",
  "智能电话手表",
  "漫步者W800BT Free蓝牙耳机",
  "猫耳朵头戴式蓝牙耳机",
  "华强北s9新款电子智能手表",
  "iLovbee b98复古机械键盘",
  "重力星球破茧75K1Pro机械键盘",
  "倍思拓展坞",
  "麦金塔13合一typec扩拓展坞",
  "开源宇宙OCulink显卡坞",
  "120W充电器",
  "绿联平板手机懒人支架床头床",
  "全金属旋转手机支架",
  "奋达HT-320电视音响",
  "惠普音响蓝牙音箱",
  "小米Xiaomi蓝牙音箱",
  "洗面奶",
  "阿姿美尔AMR男士散粉蜜粉",
  "眼唇卸妆液",
  "水杨酸",
  "氨基酸洗面奶",
  "润唇膏",
  "马毛修容阴影刷",
  "仁和水杨酸补水保湿面膜",
  "简男玻色因面霜",
  "一水间亮白莹润面膜",
  "便携式可调节折叠躺椅",
  "户外露营收纳包大容量帐篷",
  "HUAWEI nova 12 Pro" /*108 */,
  "户外便携折叠水袋",
  "户外打火石",
  "徒步折叠登山杖",
  "户外手摇发电",
  "一次性便携式雨鞋套",
  "嘉仕宁超轻折叠登山杖伸缩手杖",
  "柯曼泄压饭盒",
  "高纤饱腹威化饼",
  "散装零食整箱",
  "OPPO Find N3 Flip",
  /*118 */ "HUAWEI MATE 60",
  "肖三婆酸辣去骨鸡爪",
  "徐福记曲奇饼干",
  "蛋白棒能量燕麦棒",
  "肉多多便当自热米饭懒人方便",
  "OPPO Reno 12 Pro" /*124 */,
  "Dibai迪拜风味巧克力",
  "OPPO Find X6",
  "OPPO Reno 6（5G）",
  "高观点下的中学物理问题探讨",
  "x的奇幻之旅",
  "电子元器件与电路基础",
  "MATLAB高等数学分析 上册+下册 2册",
  "解析几何",
  "拓扑学教程",
  "图与网络",
  "重启人生 小说",
  "B5横线笔记本",
  "国潮a5定制笔记本",
  "晨光k35按动中性笔",
  "英语单词本",
  "日本kokuyo国誉活页本",
  "晨光笔记本",
  /*141*/ "三星 Galaxy S20（5G）",
  "订书机",
  "透明网纱文具袋",
  "文件板夹垫板",
  "多功能拆机清灰螺丝刀",
  "螺丝刀套装",
  "大衣柜门把手",
  "尖嘴钳6寸8寸",
  "联想笔记本清灰工具套装",
  "尖嘴钳钢丝钳",
  "防滑电动螺丝刀",
  "电动螺丝刀",
  "老虎钳",
  "螺丝刀",
  "沐浴露护发素",
  "法国LAMAOE极光乳液",
  "洗发皂",
  "SOLACE/素莲丝净化平肤精萃露",
  "贺本清洋甘菊小雏菊护手霜",
  "unny护手霜",
  "意大利东方宝石护手霜",
  "aarye安野屋精油",
  "RNW面霜补水",
  "洗发水",
  "训练服",
  "李宁运动护腕",
  "运动腰包",
  "引体向上助力钩健",
  "安踏护腕",
  "跑步腰包",
  "吊单杠助力钩引体",
  "特步运动护膝",
  "哑铃",
  "握力器",
];
// variables
let pageSize = 175;
let cardCount = 0;
let colHeights = [0, 0, 0, 0]; // each column's height
let observer; // intersection observer
let imgCount = 1;

// functions
function loadData() {
  for (let i = 0; i < pageSize; i++) {
    createCard(i);
  }
}

loadData();

async function createCard(i) {
  const card = document.createElement("div");
  card.classList.add("card");
  // hide at first
  card.style.position = "fixed";
  card.style.top = 0;
  card.style.left = 0;
  card.style.visibility = "hidden";

  const img = await loadImage((i % 175) + 1);

  if (img) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("card-con");
    imgContainer.append(img);
    const title = document.createElement("div");
    const idturn = (i % 175) + 1;
    title.classList.add("product-name");
    title.textContent = productNames[idturn];
    imgContainer.append(title);
    card.append(imgContainer);
    document.body.appendChild(card);
    const cardIndex = cardCount;
    const colIndex = (cardIndex + 1) % 4;
    const cardHeight = card.clientHeight;
    colHeights[colIndex] += cardHeight;
    setMasonryHeight();
    masonry.insertBefore(card, divider1);

    // show card
    card.style.position = "";
    card.style.visibility = "";
    card.classList.add("show");
    card.addEventListener("click", function () {
      window.location.href = `detail.html?id=${idturn}`;
    });
    cardCount++;

    // load more when last card shows
    if (i === pageSize - 1) {
      observe(card);
    }
  }
}

function observe(card) {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      if (entries.length === 1 && entries[0].isIntersecting) {
        loadData();
        observer.unobserve(entries[0].target);
      }
    });
  }
  observer.observe(card);
}

async function loadImage(imgId) {
  const img = document.createElement("img");
  const src = "../../image/" + imgId + ".png";
  // imgCount = imgCount == 175 ? 1 : imgCount + 1;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function setMasonryHeight() {
  masonry.style.height = Math.max(...colHeights) + 10 + "px";
}

// handle window resize
function resetMasonryHeight() {
  colHeights = [0, 0, 0, 0];
  document.querySelectorAll(".card").forEach((card, index) => {
    const cardHeight = card.clientHeight;
    const colIndex = (index + 1) % 175;
    colHeights[colIndex] += cardHeight;
  });
  setMasonryHeight();
}

window.addEventListener("resize", resetMasonryHeight);

document
  .querySelector(".search input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.target.value;
      window.location.href = "search.html?value=" + value;
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const userid = localStorage.getItem("userid");
  fetch("http://localhost:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: userid }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("header .user img").src = data.avatar;
    });
});
