/**
 * @name: index
 * @author: GOLU
 * @date: 2023/5/29 17:05
 * @description：index
 * @update: 2023/5/29 17:05
 */
// 购物车小仓库
import {reqCartList} from '@/api'

let state = {
	shopCartInfo:[]
};
const mutations = {
	GETSHOPCART(state, payload){
		state.shopCartInfo = payload;
	}
};
const actions = {
	//获取用户购物车的数据
	async getShopCart({commit}){
		let result = await reqCartList();
		if (result['code']===200){
			commit("GETSHOPCART", result.data);
		}
	}
};
const getters = {
	//计算数组里面第一个元素：对象
	CartInfo(state){
		return state.shopCartInfo[0] || {};
	}
}

// 对外暴露
export default {
	state,
	mutations,
	actions,
	getters
}