let express = require('express') //引入repress
let Mock = require('mockjs')     //引入mock

// 登录页面数据
const login = require('./common/login.json')
//登录操作日志数据
// const loginLog = require('./common/loginLog.json')

let app = express()             //实例化express

app.use('/user/login',function(req,res){
    res.json(
        Mock.mock({
            status:200,
            msg:'登录成功',
            login
        })
    )
})

// app.use('/home/loginsearch',function(req,res){
//     res.json(
//         Mock.mock({
//             status:200,
//             msg:'登录成功',
//             loginLog
//         })
//     )
// })



app.listen('8000',() => {
    console.log('监听端口 8000');
})