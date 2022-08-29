import server from './http.js' //导入axios

//首页轮播
// const carousel = () => {
// 	let data = server.post('/resources/carousel')
// 	return data
// }
const login = (msg) => {
	let data = server.post('/user/login', msg)
	return data
}

export{
    login
}