const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");  
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
app.use(bodyParser.json()); 
// 使用 express 中间件来解析 application/x-www-form-urlencoded 格式的数据
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});
let verifyCode_cmp = "";
// 存储验证码和生成时间  
let verifyCodeData = {  
  code: '',  
  timestamp: 0   
};  
const CAPTCHA_TIMEOUT = 60000; // 设置验证码有效时间为1分钟

//导入bcrypt，实现对用户密码的加密
const bcrypt = require('bcrypt');  
const saltRounds = 10; // 盐的轮数  

app.post("/submit", (req, res) => {
  // 解析后的表单数据在 req.body 中
  const way=req.body.type;
 
// 通过账号密码登录  
if (way === 'password') {  
  const userId = req.body.userId;  
  const password = req.body.password; // 用户输入的明文密码  
  let sql = 'SELECT * FROM account_infor WHERE uid = ?';  
  
  con.query(sql, [userId], function(err, result) {  
    if (err) {  
      console.error(err);  
      res.json({  
        status: "error",  
        message: "数据库查询错误",  
      });  
      return;  
    }         
    
    if (result.length) {  
      // 检查账户状态  
      if (result[0].State === 0) {  
        res.json({  
          status: "fail",  
          message: "账户被封禁",  
        });  
      } else {  
        // 使用 bcrypt.compare 验证密码  
        console.log(result);
        console.log(result[0].password);
        bcrypt.compare(password, result[0].password, function(err, match) {  
          if (err) {  
            console.error(err);  
            res.json({  
              status: "error",  
              message: "密码比对错误",  
            });  
            return;  
          }  
          
          if (match) {  
            // 密码匹配，登录成功  
            res.json({  
              status: "success",  
              message: "登录成功",  
              userid: userId,  
            });  
          } else {  
            // 密码不匹配  
            res.json({  
              status: "fail",  
              message: "密码错误！",  
            });  
          }  
        });  
      }  
    } else {  
      // 账号不存在  
      res.json({  
        status: "fail",  
        message: "账号不存在！",  
      });  
    }  
  });  
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
           userid:account,
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

//验证码
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
  // 更新验证码和当前时间戳  
  verifyCodeData.code = verifyCode;  
  verifyCodeData.timestamp = Date.now();
  //verifyCode_cmp=verifyCode;
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


//注册，通过bcrypt库对密码加密
app.post("/register", (req, res) => {  
  const email = req.body.email;  
  const password = req.body.password;  
  const verCode = req.body.verCode;  
  const account = email.substring(0, 10);  

  // 检查验证码是否过期  
  const currentTime = Date.now();  
  if (currentTime - verifyCodeData.timestamp > CAPTCHA_TIMEOUT) {  
    res.json({  
      status: "timeout",  
      message: "验证码已过期，请重新获取验证码。",  
    });  
    return;  
  }  

  // 验证码校验  
  if (verCode !== verifyCodeData.code) {  
    res.json({  
      status: "fail",  
      message: "验证码错误。",  
    });  
    return;  
  }  

  let sql = 'SELECT * FROM account_infor WHERE uid = ?';  
  con.query(sql, account, function(err, result) {  
    if (err) {  
      console.error(err);  
      return;  
    }         
    if (result.length) {  
      res.json({  
        status: "already",  
        message: "账号已经存在",  
      });  
      return;  
    }  

    // 对密码进行加密  
    bcrypt.hash(password, saltRounds, function(err, hash) {  
      if (err) {  
        console.error('[HASH ERROR] - ', err.message);  
        return;  
      }  

      // 插入用户信息  
      sql = "INSERT INTO account_infor(uid, Password) VALUES(?, ?)";  
      const sqlstring = "INSERT INTO user_infor(Uid) VALUES(?)";  

      con.query(sqlstring, [account], function(err, result) {  
        if (err) {  
          console.log('[INSERT ERROR] - ', err.message);  
          return;  
        }             
      });  

      con.query(sql, [account, hash], function(err, result) {  
        if (err) {  
          console.error(err);  
          return;  
        }         
        res.json({  
          status: "success",  
          message: "注册成功",  
        });  
        return;  
      });  
    });  
  });  
});  


app.use(express.json());  

//根据用户收藏表初始化购物车
app.post('/shopcart', (req, res) => {  
    const userId = req.body.userId; // 从请求体中获取用户ID  
    const query = 'select sid,imgurl,uid,uname,sname,price from goods where sid in(select sid from cart where uid=?)';

    con.query(query, [userId], (error, results) => {  
        if (error) return res.status(500).send(error); // 处理查询错误  
        res.json(results); // 返回查询结果  
    });  
});



//执行删除操作，删除对应购物车信息

app.delete('/shopcart/:id', (req, res) => {  
  const itemId = req.params.id; // 从URL参数中获取商品ID  
  //console.log(itemId);
  const username = req.body.userId;
  const query = 'DELETE FROM cart WHERE Uid=? and sid = ?'; // SQL删除语句  

  con.query(query, [username,itemId], (error, results) => {  
      if (error) {  
          console.error('Error deleting from the database: ' + error);  
          return res.status(500).json({ error: 'Database delete error' });  
      }  
      res.json({ message: 'Item deleted successfully' });  
  });  
});  

//执行添加购物车操作
app.post('/add-to-cart', (req, res) => {  
  const { userId, productId } = req.body;  
 
  const sql = 'INSERT INTO cart (uid, sid) VALUES (?, ?)';  
  con.query(sql, [userId, productId], (error, results) => {  
  if (error) {  
    console.error('插入购物车时出错:', error);  
    return res.status(500).json({ success: false, message: '数据库错误' });  
  }  
 
  // 返回成功的响应 
  res.status(200).json({ success: true, message: '商品成功添加到购物车' });  
  });  
 });  



//初始化个人信息页面
app.get('/user/info/:id', (req, res) => {  
  const userId = req.params.id; // 从请求参数中获取用户ID  
  const query = 'SELECT uname, phone, dormitory, remark,txurl FROM user_infor WHERE Uid = ?'; 

  con.query(query, [userId], (err, results) => {  
    if (err) {  
      return res.status(500).send(err);  
    }  
    if (results.length > 0) {  
      res.json(results[0]); // 返回用户信息  
    } else {  
      res.status(404).send('User not found');  
    }  
  });  
});  

app.get('/user/infoname/:name', (req, res) => {  
  const username = req.params.name; // 从请求参数中获取用户ID  
  const query = 'SELECT uname, phone, dormitory, remark,txurl FROM user_infor WHERE Uname = ?'; 

  con.query(query, [username], (err, results) => {  
    if (err) {  
      return res.status(500).send(err);  
    }  
    if (results.length > 0) {  
      res.json(results[0]); // 返回用户信息  
    } else {  
      res.status(404).send('User not found');  
    }  
  });  
});  

//初始化发布商品页面
app.get('/goods', (req, res) => {
  const userId = req.query.userId; // 从查询参数中获取userId 
  if (!userId) {
  return res.status(400).json({ error: 'User ID is required' });
  }
  
  // 查询数据库获取商品信息 
  const sql = 'SELECT sid,imgurl,sname,remark FROM goods WHERE uid = ?';
  con.query(sql, [userId], (err, results) => {
  if (err) return res.status(500).json({ error: 'Database query error' });
  // 如果没有找到商品 
  if (results.length ===0) {
  return res.status(404).json({ message: 'No products found for this user' });
  }
  
  // 返回用户的商品信息 
  res.json(results);
  });
  });


  app.get('/goodss', (req, res) => {
    const username = req.query.uname; // 从查询参数中获取userId 
    if (!username) {
    return res.status(400).json({ error: 'User ID is required' });
    }
    
    // 查询数据库获取商品信息 
    const sql = 'SELECT sid,imgurl,sname,remark FROM goods WHERE uname = ?';
    con.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query error' });
    // 如果没有找到商品 
    if (results.length ===0) {
    return res.status(404).json({ message: 'No products found for this user' });
    }
    
    // 返回用户的商品信息 
    res.json(results);
    });
    });


//保存用户信息修改

app.post('/modify',(req, res)=>{
  const uname=req.body.username;
  const phone=req.body.userphone;
  const dormitory=req.body.useraddress;
  const remark=req.body.userintroduction;
  const userId=req.body.userid;

  let sql='update user_infor set uname=?, phone=?, dormitory=?, remark=? where uid=?';
  con.query(sql,[uname,phone,dormitory,remark,userId],function(err,result){
    if(err){
        console.error(err);
        return;
    }         
    else{
      res.json({
        status: "success",
      });
      return ;
    }
  })
})


//商品详情跳转
app.get('/products/:id', (req, res) => {  
  const itemId = req.params.id;  
  const query = 'SELECT uid,sname, price, remark, imgurl,txurl,uname FROM goods WHERE sid = ?';  
 
  con.query(query, [itemId], (error, results) => {  
  if (error) {  
  console.error('Error querying the database:', error);  
  return res.status(500).json({ error: 'Database query error' });  
  }  
 
  if (results.length >0) {  
  res.json(results[0]); // 返回查询结果 
  } else {  
  res.status(404).json({ message: 'Product not found' });  
  }  
  });  
 });  

 //消息页面初始化
 app.post('/get-users',(req, res)=>{
  const userid=req.body.userid;
  let sql='select uname,remark,txurl from user_infor where uid in (select uid_from from message where uid_to=? union select uid_to from message where uid_from=?);';
  con.query(sql,[userid,userid],function(err,result){
    if(err){
        console.error(err);
        return;
    }    
    res.json({
      status: "success",
      users:result,
    });
  })
})

//单独联系人
app.post('/get-userinfo',(req, res)=>{
  const username=req.body.uname;
  if(username===""){
    res.json({
      status: "fail",
    });
    return ;
  }
  let sql='select uname,remark,txurl from user_infor where uname=?';
  con.query(sql,[username],function(err,result){
    if(err){
        console.error(err);
        return;
    }    
    if(result.length>0){
      res.json({
        status: "success",
        users:result[0],
      });
      //console.log(result[0]);
      return ;
    }
    else{
      res.json({
        status: "fail",
      });
    }
  })
})

//消息收发
/*
app.post('/send-messages',(req, res)=>{
  const sendid=req.body.senduser;
  const recname=req.body.receiveuser;
  const message=req.body.message;
  if(message.length==0){
  const sendname=req.body.senduser;//别人发送给我的信息，name
  const recid=req.body.receiveuser;//我的id
  console.log("接收消息");
  console.log(sendname);
  console.log(recid);
  let sql='select * from message where Uid_from=(SELECT Uid FROM User_Infor WHERE Uname = ?) and Uid_to=?';
  con.query(sql,[sendname,recid],function(err,result){
    if(err){
        console.error(err);
        return;
    }         
    if(result.length>0&&!result[result.length-1].issend){
      if(result[result.length-1].mail.substring(result[result.length-1].mail.length-3)==='png'){
        res.json({
          status: "success",
          type:"image",
          message:result[result.length-1],
        });
      }
      else{
        res.json({
          status: "success",
          type:"text",
          message:result[result.length-1],
        });
      }
      return ;
    }
  })
  
  let sqlstring='update message set issend=1 where uid_from=(SELECT Uid FROM User_Infor WHERE Uname = ?) and uid_to=?';;
  con.query(sqlstring,[sendname,recid], function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }             
  })
  }
  else{
  console.log("\n插入消息");
  console.log(sendid);
  console.log(recname);
  console.log(recname);
  let sql='INSERT INTO message (Uid_from, Uid_to, mail) VALUES (?, (SELECT Uid FROM User_Infor WHERE Uname =?), ?)';
  con.query(sql,[sendid,recname,message],function(err,result){
    if(err){
        console.log("cuos");
        console.log(recname);
        console.error(err);
        return;
    }    
    if(message.substring(message.length-3)==='png'){
      res.json({
        status: "success",
        type:"image",
      });
    }     
    else{
      console.log("_____________-----");
      res.json({
        status: "success",
        type:"text",
       });
      return ;
    }
  })
  }
})
*/

//发送消息
app.post('/send-messages',(req, res)=>{
  const sendid=req.body.senduser;
  const recname=req.body.receiveuser;
  const message=req.body.message;
  if(recname==""){
    res.json({
      status: "fail",
    });
    return ;
  }
  else{
    let sql='INSERT INTO message (Uid_from, Uid_to, mail) VALUES (?, (SELECT Uid FROM User_Infor WHERE Uname =?), ?)';
  con.query(sql,[sendid,recname,message],function(err,result){
    if(err){
        console.error(err);
        return;
    }    
    if(message.substring(message.length-3)==='png'){
      res.json({
        status: "success",
        type:"image",
      });
      return ;
    }     
    else{
      res.json({
        status: "success",
        type:"text",
       });
      return ;
    }
  })
  }
})

//消息接受
app.post('/receive-messages',(req, res)=>{
  const sendname=req.body.senduser;//别人发送给我的信息，name
  const recid=req.body.receiveuser;//我的id
  let sql='select * from message where Uid_from in (SELECT Uid FROM User_Infor WHERE Uname = ?) and Uid_to=?';
  con.query(sql,[sendname,recid],function(err,result){
    if(err){
        console.error(err);
        return;
    }         
    if(result.length>0&&!result[result.length-1].issend){
      if(result[result.length-1].mail.substring(result[result.length-1].mail.length-3)==='png'){
        res.json({
          status: "success",
          type:"image",
          message:result[result.length-1],
        });
        return ;
      }
      else{
        res.json({
          status: "success",
          type:"text",
          message:result[result.length-1],
        });
        return ;
      }
    }
    else {
      res.json({
        status: "fail",
        type: "text",
        message: "none",
      })
      return ;
    }
  })
  
  let sqlstring='update message set issend=1 where uid_from=(SELECT Uid FROM User_Infor WHERE Uname = ?) and uid_to=?';;
  con.query(sqlstring,[sendname,recid], function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }             
  })
})


//搜索页面初始化
app.post('/search', (req, res) => {  
  const goodname = req.body.goodsname; 
  //console.log(goodname); 
  let sql = 'SELECT sid, sname, remark, imgurl FROM goods WHERE sname LIKE ?';  
  const values = [`%${goodname}%`];   
  con.query(sql, values, function(err, result) {  
    if (err) {  
      console.error(err);  
      res.status(500).json({ 
        status: "error", 
      });  
      return;  
    }  
    res.json({  
      status: "success",  
      goods: result,  
    });  
    //console.log(result);  
  });  
});


//商品种类搜索页面初始化
app.post('/searchtype', (req, res) => {  
  const goodtype = req.body.goodstype;  
  let sql = 'SELECT sid, sname, remark, imgurl FROM goods WHERE stype=?';   
  con.query(sql,[goodtype], function(err, result) {  
    if (err) {  
      console.error(err);  
      res.status(500).json({ 
        status: "error", 
      });  
      return;  
    }  
    res.json({  
      status: "success",  
      goods: result,  
    });  
    //console.log(result);  
  });  
});

app.post('/usertx', (res, req) => {
  const userId = req.body.userid;
  const query = 'SELECT txurl FROM user_infor WHERE Uid = ?'; 

  con.query(query, [userId], (err, results) => {  
    if (err) {  
      return res.status(500).send(err);  
    }  
    if (results.length > 0) {  
      res.json(results[0]); // 返回用户信息  
    } else {  
      res.status(404).send('User not found');  
    }  
  });

})

app.get('/user/txinfo/:id', (req, res) => {  
  const userId = req.params.id; 
  const query = 'SELECT txurl FROM user_infor WHERE Uid = ?'; 

  con.query(query, [userId], (err, results) => {  
    if (err) {  
      return res.status(500).send(err);  
    }  
    if (results.length > 0) {  
      res.json(results[0]); // 返回用户信息  
    } else {  
      res.status(404).send('User not found');  
    }  
  });  
}); 

//监听端口

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//添加









