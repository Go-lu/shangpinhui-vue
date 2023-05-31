/**
 * @name: request
 * @author: GOLU
 * @date: 2023/3/27 23:30
 * @description：request
 * @update: 2023/3/27 23:30
 */
// 对axios 进行二次封装
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
// 映入进度条样式
import "nprogress/nprogress.css"

// 利用axios 对象的方法create 创建一个axios实例
// request是稍加配置的axios

const mockRequests = axios.create({
//	配置对象
//	基础路径，发请求的时候，路径中会出现/api
	baseURL: "/mock",
	timeout: 5000
});

// 请求拦截器，在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
mockRequests.interceptors.request.use((config)=>{
//	config： 配置对象，对象里面有一个属性很重要 -- 请求头
// 进度条开始
	nProgress.start();
	return config;
});

// 响应拦截器
mockRequests.interceptors.response.use((res)=>{
//	响应成功的 回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
// 进度条结束
	nProgress.done();
	return res.data;
},(error)=>{
//	响应失败的回调函数
	return Promise.reject(new Error(`failed:reason-->${error}`));
});

//对外暴露
export default mockRequests;