const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

//连接数据库
const mysql = require('mysql');  

const con = mysql.createConnection({  
  host: 'localhost',  
  user: 'root',  
  password: '123456',  
  database: 'test'  
});  

con.connect((err) => {  
  if (err) {  
    console.error('Error connecting to the database: ' + err.stack);  
    return;  
  }  
  console.log('Connected to the database!');  
});  
// 使用 cors 中间件来解决跨域问题
app.use(cors());

// 使用 express 中间件来解析 application/x-www-form-urlencoded 格式的数据
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});
let verifyCode_cmp = "";
app.post("/submit", (req, res) => {
  // 解析后的表单数据在 req.body 中
  const way=req.body.type;
 
  //通过账号密码登录
  if(way==='password'){
    const userId = req.body.userId;
    const password = req.body.password;
    let sql='select * from account_infor where uid=?';
    let s=userId;
    con.query(sql,[s],function(err,result){
    if(err){
      console.error(err);
      return;
    }         
    if(result.length){
      if(result[0].State===0){
          res.json({
          status: "fail",
          message: "账户被封禁",
        });
      }
      else if(password===result[0].Password){
          res.json({
          status: "success",
          message: "Login successful",
        });
      }
      else{
          res.json({
          status: "fail",
          message: "password is wrong",
         });
      }
     }
     else{
        res.json({
         status: "fail",
          message: "id is wrong",
        });
     }
    })
  }
  //通过邮箱登录
  else{
    const verC=req.body.verCode;
    const email=req.body.email;
    const account=email.substring(0,10);
    let sql='select * from account_infor where uid=?';
    con.query(sql,[account],function(err,result){
      if(err){
          console.error(err);
          return;
      } 
      if(result.length){
        if(result[0].State===0){
          res.json({
            status: "fail",
            message: "账户被封禁",
         });
        }
        else if(verC===verifyCode_cmp){
          res.json({
            status: "success",
           message: "Login successful",
         });
        }
        else{
          res.json({
            status: "fail",
             message: "验证码错误",
           });
        }
      }
      else{
        res.json({
          status: "fail",
           message: "账户不存在",
         });
      }
    });

  }
  return;
});

app.post("/get-ver-code", (req, res) => {
  const email = req.body.email;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verifyCode = "";
  for (let i = 0; i < 6; i++) {
    verifyCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  verifyCode_cmp=verifyCode;
  if (email) {
    res.json({
      status: "success",
      message: verifyCode,
    });
  } else {
    res.json({
      status: "fail",
    });
  }
});

app.post("/register", (req, res)=>{
  const email=req.body.email;
  const password=req.body.password;
  const verCode=req.body.verCode;
  const account=email.substring(0,10);

  if(verCode!==verifyCode_cmp){
    res.json({
      status: "fail",
      memssage:"verifyCode is wrong",
    });
  }

  let sql='select * from account_infor where uid=?';
  con.query(sql,account,function(err,result){
    if(err){
        console.error(err);
        return;
    }         
    if(result.length){
      res.json({
        status: "already",
        memssage:"账号已经存在",
      });
      return ;
    }
  })
  sql="Insert into account_infor(uid,Password) Values(?, ?)";
  con.query(sql,[account,password],function(err,result){
    if(err){
        console.error(err);
        return;
    }         
    res.json({
      status: "success",
       memssage:"注册成功",
     });
    return ;
  })
})


app.use(express.json());  

app.post('/shopcart', (req, res) => {  
    const userId = req.body.userId; // 从请求体中获取用户ID  
    const query = 'select imgurl,uid,sname,price from goods where sid in(select sid from cart where uid=?)';

    con.query(query, [userId], (error, results) => {  
        if (error) return res.status(500).send(error); // 处理查询错误  
        res.json(results); // 返回查询结果  
    });  
});  
//
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//添加











/*
function renderCart() {  
  const goodsListDiv = document.getElementById("scrollable-div");   
  let sq='select imgurl,uid,sname,price from goods where sid in(select sid from cart where uid=?)';
  let w='5555';
  con.query(sq,[w],function(err,result){
  if(err){
    console.error(err);
    return;
  } 
  if(result.length){
    const products=[];
    let sp={ name: "微积分", price: 25.0, img: "../image/wlq.gif", seller: "http://bilibili.com" }
    for(let i=0;i<result.length;i++){
      sp.name=result[i].sname;
      sp.price=result[i].price;
      sp.img=result[i].imgurl;
      sp.seller=result[i].uid;
      products.push(sp);
    }
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

  })
}
*/ 