/**
 * @name: uuid_token
 * @author: GOLU
 * @date: 2023/5/27 20:55
 * @description：uuid_token
 * @update: 2023/5/27 20:55
 */
import {v4 as uuidv4} from "uuid";
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = ()=>{
//	先从本地存储获取UUID（看看本地存储里面是否有）
	let uuid_token = localStorage.getItem("UUIDTOKEN");
//	如果没有，则生成随机UUID并存储在本地
	if (!uuid_token){
	//	生成游客临时身份
		uuid_token = uuidv4();
	//	本地存储一次
		localStorage.setItem("UUIDTOKEN", uuid_token);
	}
//	切记要有返回值，不然调用此函数返回值是undefined
	return uuid_token;
}
