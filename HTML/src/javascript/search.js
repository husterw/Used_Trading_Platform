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

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("value");

//document.addEventListener('DOMContentLoaded', function () {
const masonry = document.querySelector(".masonry");
const recommend = document.querySelector(".recommend");
const searchInput = document.getElementById("search-input");
// let resultcount = document.querySelector('.result-count');

// variables
let recommendProducts = [
	{ imgCount: 1, title: "数据库系统概论", description: "第五版，萨师煊著  华中科技大学计算机学院数据库课程用书", sid: 1 },
	{ imgCount: 2, title: "C++程序设计", description: "计算机学院大二c++课程用书，马光志编著", sid: 2 },
	{ imgCount: 3, title: "C++Primer Plus", description: "C++教辅书", sid: 3 },
	{ imgCount: 4, title: "C Primer Plus", description: "C语言教辅书", sid: 4 },
	{ imgCount: 5, title: "计算机网络", description: "计网黑皮书，计算机通信与网络课程用书，沁苑可送", sid: 5 },
	{ imgCount: 6, title: "做旧毛边牛仔半身裙", description: "大码重工做旧毛边牛仔半身裙女美式复古y2k设计感小众辣妹a字裙子", sid: 6 },
	{ imgCount: 7, title: "美式学院风包臀裙", description: "撞色格子半身裙大码美式学院风包臀裙秋冬胖mm显瘦遮肚长款直筒裙", sid: 7 },
	{ imgCount: 8, title: "iQOO 13", description: "iqoo13，赛道版，刚买，99新，12+256", sid: 8 },
	{ imgCount: 9, title: "iQOO 13", description: "iqoo13，传奇版，刚买，99新，12+256", sid: 9 },
	{ imgCount: 10, title: "华为nova 13 pro", description: "华为nova 13 pro,不想要了，12+256", sid: 10 },
	{ imgCount: 11, title: "过膝风衣男外套", description: "高级感毛呢大衣男中长款冬季新款韩版加厚羊绒呢子过膝风衣男外套", sid: 11 },
	{ imgCount: 12, title: "良品铺子早餐面包", description: "良品铺子早餐面包整箱营养学生早餐奶酪手撕面包新鲜营养夹心", sid: 12 },
	{ imgCount: 13, title: "针织运动裤", description: "秋冬休闲长裤针织运动裤男生裤子直筒裤宽松百搭男卫裤潮牌加绒", sid: 13 },
	{ imgCount: 14, title: "honor/荣耀 Magic 6", description: "荣耀Magic6 二手5G手机 单反级荣耀鹰眼相机 巨犀玻璃 第二代青海湖电池 绒黑色【Magic6】官方在保 25年2月8号 16GB+256GB【尖货 电池效率高】 99新 2799", sid: 14 },
	{ imgCount: 15, title: "5个背包D型挂扣", description: "5个背包D型挂扣快挂户外多功能登山扣装备挂钩钥匙扣水壶铝合金", sid: 15 },
	{ imgCount: 16, title: "华为耳机有线TypeC", description: "华为耳机有线TypeC原装正品Mate60pro/P70/Nova12/11/8/9手机原版", sid: 16 },
	{ imgCount: 17, title: "零食大礼包", description: "无穷肉类零食大礼包礼盒盐焗鸡翅鸡爪鸡腿肉整箱休闲零食小吃熟食", sid: 17 },
	{ imgCount: 18, title: "良品铺子鱼豆腐", description: "良品铺子鱼豆腐170gx4袋即食麻辣豆腐干香辣豆干烧烤味解馋小零食", sid: 18 },
	{ imgCount: 19, title: "漫步者GM260Plus", description: "HECATE漫步者GM260Plus有线耳机入耳式游戏type–c接口", sid: 19 },
	{ imgCount: 20, title: "额尔古纳河右岸", description: "额尔古纳河右岸", sid: 20 },
	{ imgCount: 21, title: "OPPO Find X3（5G）", description: "特价手机二手OPPO Find X3，8G+256G内存，外观成色95成以上，电池耐用，功能全好，屏幕一直有贴膜，一直用的手机壳，直面屏幕。换的屏幕无指纹解锁，用起来和原装一样丝滑，不卡顿，卡顿秒退", sid: 21 },
	{ imgCount: 22, title: "电路与电子学（第6版）", description: "电路与电子学（第6版）李晶皎", sid: 22 },
	{ imgCount: 23, title: "笔记本", description: "高颜值笔记本本子简约款超厚初中高中生专用b5简约冷色系课堂笔记考研白卡日记线圈本大学生记录a5办公记事本", sid: 23 },
	{ imgCount: 24, title: "vivo X60（5G）", description: "vivo x60 8+256 三星E1080处理器 功能全好 使用正常 处理器性能强悍，安兔兔跑分77万，33w快充，120hz高刷，电池容量4300mAh", sid: 24 },
	{ imgCount: 25, title: "iPhone 8 Plus", description: "苹果8p美版256 刚换了新电池 再用三年一点问题没有", sid: 25 },
	{ imgCount: 26, title: "魅族lucky+08", description: "魅族lucky+08幸运手机，领克魅族08手机，8+256/12+256版本，国行", sid: 26 },
	{ imgCount: 27, title: "HUAWEI P40 Pro（5G）", description: "华为p40pro，5G.8GB+256GB.麒麟990芯，屏幕显示正常，指纹解锁灵敏，屏幕表面及后盖无明显划痕，原装后盖很靓，中框四周有使用划痕。", sid: 27 },
	{ imgCount: 28, title: "iPhone 11", description: "九成新闲置苹果11 电池容量76% 128g 无维修", sid: 28 },
	{ imgCount: 29, title: "iPhone 13", description: "苹果13，国行128g双卡双待，纯原装无拆修，电池健康，爱思沙漏全绿，功能全部正常，屏幕没划痕，边框没磕碰，整体成色保护很不错，功能全部正常", sid: 29 },
	{ imgCount: 30, title: "Redmi K60（5G）", description: "红米k60ultra 16+256g 白色99新 特价1599", sid: 30 },
	{ imgCount: 31, title: "vivo S9（5G）", description: "vivoS19 12➕256G 外屏破，支架缺了一块。后壳完美，全原机。需要直接拍吧。换个外屏和中框嘎嘎香", sid: 31 },
	{ imgCount: 32, title: "荣耀 X50", description: "荣耀x50 内存12+512外观成色小划痕，屏幕有划痕，无磕碰，总体成色95新，有盒子，功能全部正常，无拆修", sid: 32 },
	{ imgCount: 33, title: "iQOO 11s", description: "iqoo11S 16+512 骁龙8gen2处理 换过屏幕不支持指纹无高刷 价格优惠 性价比高", sid: 33 },
	{ imgCount: 34, title: "iPhone 12", description: "iPhone 12 ，国行256G，功能全好，面容秒解，双卡双待 ，成色如图边框有点小花。¥2000元", sid: 34 },
	{ imgCount: 35, title: "HUAWEI nova 12 Pro", description: "华为 nova 12 Pro 12+512 好漂亮的粉色 机器99新 配件齐全 带保2025/3月 不刀价！！", sid: 35 },
	{ imgCount: 36, title: "高腰棕色a字半身裙", description: "美拉德穿搭高腰棕色a字半身裙女大码胖mm遮肚藏肉百褶显瘦长裙秋", sid: 36 },
	{ imgCount: 37, title: "休闲百褶裙", description: "秋季新款休闲百褶裙女大码胖mm显瘦半身裙梨形身材中长款a字裙子", sid: 37 },
	{ imgCount: 38, title: "伯克利百搭伞裙", description: "艺术高级感咖色伯克利百搭伞裙大码胖mm遮肚显瘦加长高个子半身裙", sid: 38 },
	{ imgCount: 39, title: "黑色毛呢半身裙", description: "梨形身材黑色毛呢半身裙女秋冬新款胖mm高腰显瘦遮胯a字裙中长款", sid: 39 },
	{ imgCount: 40, title: "小米15", description: "小米15，黑色，刚买，87新，12+256", sid: 40 },
	{ imgCount: 41, title: "一加13", description: "一加13，白露晨曦，刚买，99新", sid: 41 },
	{ imgCount: 42, title: "羊毛开衫女秋冬针织毛衣", description: "奥特莱斯专柜正品清仓尾货女装新中式盘扣羊毛开衫女秋冬针织毛衣", sid: 42 },
	{ imgCount: 43, title: "V领羊毛开衫毛衣坎肩外套", description: "复古扭花100%纯羊绒针织马甲背心女春秋V领羊毛开衫毛衣坎肩外套", sid: 43 },
	{ imgCount: 44, title: "大码后开叉半身裙", description: "微胖女生穿搭大码后开叉半身裙女胖妹妹高腰mm显瘦a字西装拖地裙", sid: 44 },
	{ imgCount: 45, title: "奶蓝色针织外套", description: "奶蓝色针织外套女秋冬新款浙江普苑毛衣桐乡高端嘉兴濮院羊毛开衫", sid: 45 },
	{ imgCount: 46, title: "蝴蝶结刺绣针织外", description: "高级灰蝴蝶结刺绣针织外套浙江普院毛衣桐乡高端嘉兴濮院羊毛开衫", sid: 46 },
	{ imgCount: 47, title: "羊毛开衫", description: "安可拉红长袖麻花针织外套浙江普院毛衣桐乡高端嘉兴濮院羊毛开衫", sid: 47 },
	{ imgCount: 48, title: "iphone 13 pm", description: "苹果13pm，美版卡贴128G，更换原装瑕疵屏幕，有面容，功能全好全正常，插卡配合卡贴使用，随意升级抹除还原，触摸灵敏，有高刷，电池：84，下单送壳膜充电器", sid: 48 },
	{ imgCount: 49, title: "冬季休闲西服", description: "皮尔卡丹双面呢大衣男外套短款羊毛呢子西装加绒加厚冬季休闲西服", sid: 49 },
	{ imgCount: 50, title: "宽松保暖御寒男外套", description: "贵人鸟时尚拼接可拆卸冲锋三合一秋冬季新款宽松保暖御寒男外套", sid: 50 },
	{ imgCount: 51, title: "加厚保暖夹克男外套", description: "ppge摇粒绒内胆秋冬重磅加厚保暖夹克男外套户外", sid: 51 },
	{ imgCount: 52, title: "派克服冬季男外套", description: "派克服冬季男外套2024中长款可拆卸内胆仿皮草貉子毛大码修身连帽", sid: 52 },
	{ imgCount: 53, title: "软壳夹克男外套", description: "岩云软壳夹克男外套春秋连帽防风防泼水大码户外运动山系机能", sid: 53 },
	{ imgCount: 54, title: "单西装男外套", description: "衬衫老罗男士修身西服免烫商务正装结婚礼服单西装男外套MX2206", sid: 54 },
	{ imgCount: 55, title: "水洗做旧牛仔夹克男", description: "查尔斯桃心美式重工水洗做旧牛仔夹克男春秋新款宽松可拆卸帽外套", sid: 55 },
	{ imgCount: 56, title: "牛仔夹克", description: "JCAESAR FROST DENIM JACKET 霜冻牛仔夹克 16oz重磅 脏染水洗", sid: 56 },
	{ imgCount: 57, title: "宽松阔腿裤", description: "港仔文艺男牛仔裤男秋季直筒男裤秋冬加绒男生裤子宽松阔腿裤男款", sid: 57 },
	{ imgCount: 58, title: "HUAWEI P60", description: "自用的p60 8+256 没有磕碰，屏幕没有老化透图，外观成色个人觉得不错。怕有什么情况就自认95新，过保不久，电池效率100，无修无进水，功能全部正常使用（镜头一丝小划痕）正常使用磨损中", sid: 58 },
	{ imgCount: 59, title: "抽绳松紧腰休闲长裤", description: "TRENDIANO抽绳松紧腰休闲长裤2024年夏季新款简约薄款男生裤子", sid: 59 },
	{ imgCount: 60, title: "阔腿牛仔裤", description: "NASA阔腿牛仔裤男款宽松直筒2024新款高街男生裤子春秋冬工装长裤", sid: 60 },
	{ imgCount: 61, title: "宽松直筒工装裤", description: "唐狮2024春秋季新款休闲裤宽松直筒工装裤男生裤子男黑色潮牌", sid: 61 },
	{ imgCount: 62, title: "弹力修身牛仔裤", description: "TRENDIANO弹力修身牛仔裤2024年春季新款简约百搭长裤男生裤子潮", sid: 62 },
	{ imgCount: 63, title: "束脚卫裤男", description: "束脚卫裤男秋冬款美式宽松加绒运动裤男生裤子青少年春秋季休闲裤", sid: 63 },
	{ imgCount: 64, title: "男士休闲裤肌", description: "Markless男士休闲裤肌理感长裤宽松新款男生裤子秋款冬季锥形裤", sid: 64 },
	{ imgCount: 65, title: "直筒卫裤男", description: "班尼路杏色直筒卫裤男秋季新款重磅华夫格高级感休闲阔腿男生裤子", sid: 65 },
	{ imgCount: 66, title: "iPhone 14 Plus", description: "iPhone14plus 256g含卡贴，系统18.0.1，目前电池电量还有87%，一直戴手机壳使用没有贴膜，不负责教设置卡贴，请自行搜索教程，不接受到收刀，谢谢，本地交易，外地信用分高的也可以闲鱼交易，屏幕有一个小划痕，换华为所以出了，", sid: 66 },
	{ imgCount: 67, title: "senhomtog耳机有线", description: "senhomtog耳机有线入耳式type-c接口适用于小米华为vivo红米荣耀", sid: 67 },
	{ imgCount: 68, title: "OPPO Find N2 Flip", description: "oppo Find N2 Flip 8➕256GB 个人一手新机 没怎么使用 因为好奇买的 用过一个星期左右 新机标准 无暗病 新机什么样 它什么样！", sid: 68 },
	{ imgCount: 69, title: "OPPO原装有线耳机", description: "OPPO原装有线耳机官方正品opporeno11/10/9/8/7圆孔typec手机耳机", sid: 69 },
	{ imgCount: 70, title: "JBL Run2入耳式运动耳机", description: "JBL Run2入耳式运动耳机 防水防汗 游戏音乐通用耳机耳麦", sid: 70 },
	{ imgCount: 71, title: "DUNU达音科titans有线耳机", description: "DUNU达音科titans有线耳机入耳式hifi发烧级typec带麦高解析泰坦s", sid: 71 },
	{ imgCount: 72, title: "Final E500 ASMR入耳式耳机", description: "正品现货Final E500 E3000C E2000 E1000 STUDY1 ASMR入耳式耳机", sid: 72 },
	{ imgCount: 73, title: "漫步者GM380耳机有线入耳式", description: "漫步者GM380耳机有线入耳式游戏电竞吃鸡电脑手机圆孔type-c接口", sid: 73 },
	{ imgCount: 74, title: "HiFi有线耳机", description: "竹林鸟夜莺Z1入耳睡眠HiFi有线耳机歌游戏电竞音乐超小耳塞2024款", sid: 74 },
	{ imgCount: 75, title: "数字耳机有线半入耳式", description: "数字耳机有线半入耳式type-c接口圆孔适用安卓15手机原装专用", sid: 75 },
	{ imgCount: 76, title: "漫步者T1ULtra高音质有线耳机", description: "漫步者T1ULtra高音质有线耳机typec接口半入耳式hifi游戏电竞专用", sid: 76 },
	{ imgCount: 77, title: "iQOO原装入耳式耳机", description: "iQOO原装入耳式耳机3.5mm/Type C接口官方原装正品", sid: 77 },
	{ imgCount: 78, title: "智能手环", description: "智能手环运动手表计步器监测心率血压血氧测量7彩屏通用6多功能蓝牙防水适用于苹果手机跑步男女款学生健康", sid: 78 },
	{ imgCount: 79, title: "SJCAM速影运动拇指相机", description: "SJCAM速影运动拇指相机C100摩托车骑行车记录仪360全景摄像机vlog", sid: 79 },
	{ imgCount: 80, title: "旅游随身小型校园vlog卡片机", description: "高清数码相机学生入门照相机复古ccd旅游随身小型校园vlog卡片机", sid: 80 },
	{ imgCount: 81, title: "智能电话手表", description: "HUA WEl 手机适用5G高清大屏智能电话手表官方旗舰正品", sid: 81 },
	{ imgCount: 82, title: "漫步者W800BT Free蓝牙耳机", description: "漫步者W800BT Free蓝牙耳机头戴式无线耳麦运动游戏电竞久戴不痛", sid: 82 },
	{ imgCount: 83, title: "猫耳朵头戴式蓝牙耳机", description: "柏林之声发光猫耳朵头戴式蓝牙耳机无线带麦游戏音乐耳麦女生电竞", sid: 83 },
	{ imgCount: 84, title: "华强北s9新款电子智能手表", description: "华强北s9新款电子智能手表电话心率监测防静电keep手环成人男女款无插卡扫码支付睡眠灵动岛运动适用苹果手机", sid: 84 },
	{ imgCount: 85, title: "iLovbee b98复古机械键盘", description: "iLovbee b98复古机械键盘无线三模 客制化胶坨坨电脑电竞游戏办公", sid: 85 },
	{ imgCount: 86, title: "重力星球破茧75K1Pro机械键盘", description: "重力星球破茧75K1Pro机械键盘赛博客制化铝合金无线游戏电竞鼠标", sid: 86 },
	{ imgCount: 87, title: "倍思拓展坞", description: "倍思拓展坞typec扩展usb分线器转接头hdmi投屏智能hub3.0集线器雷电4多接口网线转换器电脑iPad笔记本手机", sid: 87 },
	{ imgCount: 88, title: "麦金塔13合一typec扩拓展坞", description: "麦金塔13合一typec扩拓展坞hdmi投屏USB分集线器多功能hub接口转接头适用小米华为苹果macbook笔记本电脑延长", sid: 88 },
	{ imgCount: 89, title: "开源宇宙OCulink显卡坞", description: "开源宇宙OCulink显卡坞EG01H2适配ATX电源支持thinkbook热拔插tgx", sid: 89 },
	{ imgCount: 90, title: "120W充电器", description: "120W充电器超级闪充适用VIVOX90pro x100 x100spro手机充电头快充iqoo9 10 11 12pro/neo7 8 9充电器加长套装", sid: 90 },
	{ imgCount: 91, title: "绿联平板手机懒人支架床头床", description: "绿联平板手机懒人支架床头床上适用iPad电脑多功能通用支架2024新款桌面悬臂拍摄拍照追剧直播架子Switch架子", sid: 91 },
	{ imgCount: 92, title: "全金属旋转手机支架", description: "全金属旋转手机支架高档机械可折叠平板通用金属支架桌面追剧直播手机架支架懒人床头追剧支架720无极旋转", sid: 92 },
	{ imgCount: 93, title: "奋达HT-320电视音响", description: "奋达HT-320电视音响家用客厅长条回音壁蓝牙音箱2.1播放器3D环绕", sid: 93 },
	{ imgCount: 94, title: "惠普音响蓝牙音箱", description: "惠普音响蓝牙音箱高音质家用迷你无线音响低音炮音乐户外播放器", sid: 94 },
	{ imgCount: 95, title: "小米Xiaomi蓝牙音箱", description: "小米Xiaomi蓝牙音箱Mini音响家用防尘无线迷你", sid: 95 },
	{ imgCount: 96, title: "洗面奶", description: "人仁和药业匠心洗面奶官方旗舰店官网正品氨基酸男士专用控油清洁", sid: 96 },
	{ imgCount: 97, title: "阿姿美尔AMR男士散粉蜜粉", description: "阿姿美尔AMR男士散粉蜜粉控油防水修容粉饼哑光遮瑕", sid: 97 },
	{ imgCount: 98, title: "眼唇卸妆液", description: "Bioderma贝德玛卸妆水敏感肌温和面部深层清洁眼唇卸妆液500ml瓶", sid: 98 },
	{ imgCount: 99, title: "水杨酸", description: "大水滴3点祛痘精华2.0升级淡化痘印收缩毛孔面部水杨酸", sid: 99 },
	{ imgCount: 100, title: "氨基酸洗面奶", description: "法国LAMAOE氨基酸洗面奶深层清洁毛孔黑头保湿洁面乳男女士去控油", sid: 100 },
	{ imgCount: 101, title: "润唇膏", description: "屈臣士高档男士润唇膏保湿补水防干裂秋冬季滋润唇男生专用润唇膏", sid: 101 },
	{ imgCount: 102, title: "马毛修容阴影刷", description: "梦美琪镰刀鼻影刷山根晕染刷斜头马毛修容阴影刷一支装沧州化妆刷", sid: 102 },
	{ imgCount: 103, title: "仁和水杨酸补水保湿面膜", description: "仁和水杨酸补水保湿面膜淡化痘印坑深层清洁控油收缩毛孔男女嫩肤", sid: 103 },
	{ imgCount: 104, title: "简男玻色因面霜", description: "简男玻色因面霜深层补水保湿男士秋冬面霜高保湿面霜不油腻保湿霜", sid: 104 },
	{ imgCount: 105, title: "一水间亮白莹润面膜", description: "一水间亮白莹润面膜补水保湿烟酰胺美白淡斑去黄气", sid: 105 },
	{ imgCount: 106, title: "便携式可调节折叠躺椅", description: "牧高笛户外露营便携式可调节折叠躺椅办公室午休高背椅子乐享", sid: 106 },
	{ imgCount: 107, title: "户外露营收纳包大容量帐篷", description: "户外露营收纳包大容量帐篷装备杂物袋野餐折叠桌椅防水收纳袋驮包", sid: 107 },
	{ imgCount: 108, title: "HUAWEI nova 12 Pro", description: "华为Nova12 Pro 前置6000万人像追焦双摄 12+256GB物理可变光圈 鸿蒙智慧通信智能手机nova系列 高保修25.8.14成色新全套快充 价格2399", sid: 108 },
	{ imgCount: 109, title: "户外便携折叠水袋", description: "户外便携折叠水袋登山旅游露营塑料软体蓄水囊装水桶大容量储水袋", sid: 109 },
	{ imgCount: 110, title: "户外打火石", description: "户外打火石打火棒镁棒野外取火点火神器露营镁块镁条荒野生存装备", sid: 110 },
	{ imgCount: 111, title: "徒步折叠登山杖", description: "徒步折叠登山杖超轻行山手杖铝合金爬山拐棍捌扙户外男女专业装备", sid: 111 },
	{ imgCount: 112, title: "户外手摇发电", description: "户外手摇发电手电筒太阳能小手电充电多功能led家用应急防灾装备", sid: 112 },
	{ imgCount: 113, title: "一次性便携式雨鞋套", description: "旅行神器必备女式外出旅游必备用品差旅好物非一次性便携式雨鞋套", sid: 113 },
	{ imgCount: 114, title: "嘉仕宁超轻折叠登山杖伸缩手杖", description: "嘉仕宁超轻折叠登山杖伸缩手杖男女爬山装备无碳素拐杖户外多功能", sid: 114 },
	{ imgCount: 115, title: "柯曼泄压饭盒", description: "柯曼泄压饭盒加厚耐高温野营煮饭神器硬氧铝多功能旅行大号便当盒", sid: 115 },
	{ imgCount: 116, title: "高纤饱腹威化饼", description: "KUIBAOBAO乳清威化蛋白棒美食健身代餐全麦零食品高纤饱腹威化饼", sid: 116 },
	{ imgCount: 117, title: "散装零食整箱", description: "休闲农场压缩饼干花生芝麻早餐包装户外代餐饱腹干粮散装零食整箱", sid: 117 },
	{ imgCount: 118, title: "OPPO Find N3 Flip", description: "oppofindn3filp 国行12➕256 95新吧 有点使用痕迹 没用几个月 保修到25年5月 出售了 需要的来", sid: 118 },
	{ imgCount: 119, title: "HUAWEI nova 12 Pro", description: "华为Nova12 Pro 前置6000万人像追焦双摄 12+256GB物理可变光圈 鸿蒙智慧通信智能手机nova系列 高保修25.8.14成色新全套快充 价格2399", sid: 119 },
	{ imgCount: 120, title: "肖三婆酸辣去骨鸡爪", description: "肖三婆酸辣去骨鸡爪1000g/罐装红油脱骨爪泡椒零食宵夜追剧小吃", sid: 120 },
	{ imgCount: 121, title: "徐福记曲奇饼干", description: "徐福记曲奇饼干零食奶油早餐休闲小吃单独小包装代餐饱腹食品散装", sid: 121 },
	{ imgCount: 122, title: "蛋白棒能量燕麦棒", description: "蛋白棒能量燕麦棒抗饿能量饼干低脂代餐健身主零食无糖精饱腹谷物", sid: 122 },
	{ imgCount: 123, title: "肉多多便当自热米饭懒人方便", description: "一顿拌 肉多多便当自热米饭懒人方便即食煲仔饭盖浇饭大份量午餐", sid: 123 },
	{ imgCount: 124, title: "OPPO Reno 12 Pro", description: "oppo reno12pro 16+512 激活四个月 盒子配件全套 一处小磕碰", sid: 124 },
	{ imgCount: 125, title: "Dibai迪拜风味巧克力", description: "Dibai迪拜风味巧克力0蔗糖开心果酱夹心纯可可脂黑巧克力网红零食", sid: 125 },
	{ imgCount: 126, title: "OPPO Find X6", description: "oppofindx6，纯原16+512无拆无修无磕碰，未过保，，保修到2025年4月，电池百分之99，非诚无扰", sid: 126 },
	{ imgCount: 127, title: "OPPO Reno 6（5G）", description: "Reno6 12+256，屏幕有明显硬划痕，有老化。后盖破 功能正常，主板无修。", sid: 127 },
	{ imgCount: 128, title: "高观点下的中学物理问题探讨", description: "高观点下的中学物理问题探讨 二版2版 郑泰玉 王文涛 高等教育出版社", sid: 128 },
	{ imgCount: 129, title: "x的奇幻之旅", description: "x的奇幻之旅 从数学的角度看世界 史蒂夫斯托加茨著 微积分的力量作者 中信", sid: 129 },
	{ imgCount: 130, title: "电子元器件与电路基础", description: "电子元器件与电路基础 二版2版 崔陵 9787040578065 高等教育出版社", sid: 130 },
	{ imgCount: 131, title: "MATLAB高等数学分析 上下册", description: "MATLAB高等数学分析 上册+下册 2册 高等数学或高等数学实验课程参考书 高等数学教材的辅助实验教材书籍 清华大学出版社", sid: 131 },
	{ imgCount: 132, title: "解析几何", description: "解析几何 第三版 北京大学数学系解析几何课程教材 丘维声编 北京大学出版社 大学数学教材 解析几何丘维声几何学教材教程书", sid: 132 },
	{ imgCount: 133, title: "拓扑学教程", description: "拓扑学教程：拓扑空间和距离空间 数值函数 拓向量空间 第二版第2版 G.肖盖 史树中 王耀东 高等教育出版社", sid: 133 },
	{ imgCount: 134, title: "图与网络", description: "图与网络 颜谨 王光辉", sid: 134 },
	{ imgCount: 135, title: "重启人生 小说", description: "正版 重启人生 小说 全一册 三秋缒 网络校园青春文学小说轻文学作品集 原著漫画改编小说 动漫小说轻文学 天闻角川", sid: 135 },
	{ imgCount: 136, title: "B5横线笔记本", description: "得力不硌手活页本B5横线笔记本子A4活页方格本a5多规格可拆卸替芯加厚学生考研线圈错题本活页纸活页夹", sid: 136 },
	{ imgCount: 137, title: "国潮a5定制笔记本", description: "国潮a5定制笔记本本子礼盒套装定制可印logo加厚记事本故宫文创商务日记高档送老师办公会议本2024年新款", sid: 137 },
	{ imgCount: 138, title: "晨光k35按动中性笔", description: "晨光k35按动中性笔考试碳素笔黑色速干顺滑", sid: 138 },
	{ imgCount: 139, title: "英语单词本", description: "英语单词本记忆艾宾浩斯记忆曲线大学生考研默写记背神器生词纸笔记本子四级六级日语专升本词汇", sid: 139 },
	{ imgCount: 140, title: "日本kokuyo国誉活页本", description: "日本kokuyo国誉活页本一米新纯b5活页笔记本本子简约ins风可拆卸不硌手a5线圈记事记录本", sid: 140 },
	{ imgCount: 141, title: "晨光笔记本", description: "晨光笔记本子b5简约大学生牛皮纸记事本办公商务高中生加厚作业本a5工作软面软抄本", sid: 141 },
	{ imgCount: 142, title: "三星 Galaxy S20（5G）", description: "三星s20几乎完美屏128G.全网通5G手机 几乎全新外观，原装无修，2k屏幕，支持超声波屏幕指纹解锁，没有任何暗病，屏幕老化印实拍图，功能全部正常9.5成新！", sid: 142 },
	{ imgCount: 143, title: "订书机", description: "高颜值订书机办公用订书器学生大号加厚钉书机多功能省力迷你小号家用外卖打包专用手握式装订机便携式定书机", sid: 143 },
	{ imgCount: 144, title: "透明网纱文具袋", description: "晨光笔袋透明网纱文具袋铅笔盒考试专用男女孩高颜值ins铅笔袋", sid: 144 },
	{ imgCount: 145, title: "文件板夹垫板", description: "文具大赏锦宫板夹文件板夹垫板轻薄多功能写字板A4夹板写字板多功能书写会议垫板夹高颜值磁吸板夹固定黑色", sid: 145 },
	{ imgCount: 146, title: "多功能拆机清灰螺丝刀", description: "多功能拆机清灰螺丝刀套装强磁精密螺丝批万能家用小型智能维修刀", sid: 146 },
	{ imgCount: 147, title: "螺丝刀套装", description: "螺丝刀套装六角螺丝刀三角小型组合多功能工具笔记本电脑拆机", sid: 147 },
	{ imgCount: 148, title: "大衣柜门把手", description: "铝合金一米加长大衣柜门把手欧式现代简约美式黑色抽屉橱柜门拉手", sid: 148 },
	{ imgCount: 149, title: "尖嘴钳6寸8寸", description: "鹰之印 尖嘴钳6寸8寸多功能五金工具电工钳子尖头尖咀钳子针嘴钳", sid: 149 },
	{ imgCount: 150, title: "联想笔记本清灰工具套装", description: "联想笔记本清灰工具套装拯救者拆机螺丝刀电脑专用拆卸除尘换硅脂", sid: 150 },
	{ imgCount: 151, title: "尖嘴钳钢丝钳", description: "老虎钳尖嘴钳钢丝钳工业级电工专用斜口钳多功能万用五金工具钳子", sid: 151 },
	{ imgCount: 152, title: "防滑电动螺丝刀", description: "进口德系十字批头高硬度强磁圈双节防滑电动螺丝刀D1风批钻小头", sid: 152 },
	{ imgCount: 153, title: "电动螺丝刀", description: "绿林米字批头电动螺丝刀手电钻风批起子强磁梅花披十字特级内六角", sid: 153 },
	{ imgCount: 154, title: "老虎钳", description: "老虎钳钳子钢丝钳多功能万用老虎大全电工尖嘴工业级斜口特种手钳", sid: 154 },
	{ imgCount: 155, title: "螺丝刀", description: "京选迷你两用螺丝刀十字一字双头平口带磁性小起子改锥维修螺丝批", sid: 155 },
	{ imgCount: 156, title: "沐浴露护发素", description: "三个魔发匠黑裙香水滋润洗发水沐浴露护发素持久留香去屑止痒控油", sid: 156 },
	{ imgCount: 157, title: "法国LAMAOE极光乳液", description: "法国LAMAOE极光乳液抗皱紧致衰老补水保湿滋润提亮修护秋冬男女士", sid: 157 },
	{ imgCount: 158, title: "洗发皂", description: "人参首乌侧柏叶洗头洗发皂侧植物天然草本重要纯手工控油养发个护", sid: 158 },
	{ imgCount: 159, title: "SOLACE/素莲丝净化平肤精萃露", description: "SOLACE/素莲丝净化平肤精萃露100ml净肤控油实体正品", sid: 159 },
	{ imgCount: 160, title: "贺本清洋甘菊小雏菊护手霜", description: "贺本清洋甘菊小雏菊护手霜女男士长效滋润保湿补水预防干裂秋冬季", sid: 160 },
	{ imgCount: 161, title: "unny护手霜", description: "unny护手霜女滋润补水长效保湿秋冬嫩白去手纹防干裂干燥不油腻", sid: 161 },
	{ imgCount: 162, title: "意大利东方宝石护手霜", description: "意大利东方宝石护手霜女75ml水莲花香氛补水保湿滋润持久留香正品", sid: 162 },
	{ imgCount: 163, title: "aarye安野屋精油", description: "aarye安野屋精油香氛马卡龙护手霜保湿京都苍兰", sid: 163 },
	{ imgCount: 164, title: "RNW面霜补水", description: "RNW面霜补水保湿滋润秋冬修护舒缓润肤乳液男女士", sid: 164 },
	{ imgCount: 165, title: "洗发水", description: "三个魔发匠生姜洗发水防脱生发何首乌人参修护滋养毛囊洗头膏", sid: 165 },
	{ imgCount: 166, title: "训练服", description: "361健身衣服男速干运动套装加绒保暖跑步装备晨跑骑行秋冬训练服", sid: 166 },
	{ imgCount: 167, title: "李宁运动护腕", description: "李宁运动护腕男扭伤手腕护套腱鞘女羽毛球篮球排球透气健身擦汗巾", sid: 167 },
	{ imgCount: 168, title: "运动腰包", description: "运动腰包男款高端户外健身装备女多功能水壶包跑步防水腰带手机包", sid: 168 },
	{ imgCount: 169, title: "引体向上助力钩健", description: "引体向上助力钩健身护腕握力钩手套辅助带硬拉吊腰椎单杠防脱手", sid: 169 },
	{ imgCount: 170, title: "安踏护腕", description: "安踏护腕男款扭伤手腕腱鞘护套专用女运动健身固定羽毛球网球薄款", sid: 170 },
	{ imgCount: 171, title: "跑步腰包", description: "跑步腰包多功能男款女运动手机腰带大容量马拉松装备多层加厚防水", sid: 171 },
	{ imgCount: 172, title: "吊单杠助力钩引体", description: "吊单杠助力钩引体加棉护腕健身辅助带杠铃硬拉室内钩腕带单双杠", sid: 172 },
	{ imgCount: 173, title: "特步运动护膝", description: "特步运动护膝跑步专用篮球男专业女士关节登山排球跳绳护膝盖护具", sid: 173 },
	{ imgCount: 174, title: "哑铃", description: "哑铃男士家用快速可调节重量健身训练纯钢器材女套装组合一对亚铃", sid: 174 },
	{ imgCount: 175, title: "握力器", description: "握力器机械计数锻炼手劲臂力康复训练健身器材专业中考学生腕力器", sid: 175 },
	{ imgCount: 176, title: "计算机组成原理", description: "计科大二下必修课组原用书，谭志虎著", sid: 176 },
	{ imgCount: 177, title: "计算机图形学基础", description: "计院大三上专选课计算机图形学用书，边角有些折痕，不影响基本使用", sid: 177 },
	{ imgCount: 178, title: "计算机操作系统", description: "计院大三上必修课操作系统用书，老师会布置书上的作业，用的比较少，很新", sid: 178 },
	{ imgCount: 179, title: "计算机系统基础", description: "计科大二必修课教材，第二版袁春风著", sid: 179 },
];
// 模拟产品数据
let products = [];
fetch("http://localhost:3000/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ goodsname: searchTerm }),
})
  .then((response) => response.json())
  .then((products) => {
    if (products.status === "success") {
      // console.log("auc");
      products.goods.forEach((product) => {
        // if (searchTerm) {
        // if(product.sname.toLowerCase().includes(searchTerm.toLowerCase())){
        updateproducts(
          product.imgurl,
          product.sname,
          product.remark,
          product.sid
        );
        //total++;
        // }
        //  }
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

function updateproducts(img, title, description, sid) {
  let newproduct = { img, title, description, sid };
  products.push(newproduct);
  // console.log(products);
  createProduct(newproduct);
}

// 创建产品项
function createProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product-card";
  productDiv.innerHTML = `
            <img src="${product.img}" alt="" />
            <h3>${product.title}</h3>
            <p>${product.description}</p>
        `;
  productDiv.addEventListener("click", function () {
    window.location.href = `detail.html?id=${product.sid}`;
  });
  masonry.appendChild(productDiv);
}

function createRecommend(product) {
  const recommendDiv = document.createElement("div");
  recommendDiv.className = "product-card";
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
    const randomProduct =
      recommendProducts[Math.floor(Math.random() * recommendProducts.length)];
    createRecommend(randomProduct);
  }
}
loadProducts();
window.addEventListener("scroll", function () {
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
