/**
 * @name: index
 * @author: GOLU
 * @date: 2023/3/28 23:28
 * @description：index
 * @update: 2023/3/28 23:28
 */
import {reqGetSearchInfo} from '@/api'
// search 模块的小仓库
const state = {
	searchList: {}
};
const mutations = {
	GETSEARCHLIST(state, SearchList){
		state.searchList = SearchList;
	}
};
const actions = {
//	获取search模块数据
	async getSearchList({commit}, params={}){
	//	当前这个reqGetSearchInfo函数在调用获取服务器数据的时候至少传递一个空对象参数
	//	第二个形参params是用户派发action时，第二个参数传递过来的，至少是一个空对象
		let result = await reqGetSearchInfo(params);
		if (result['code'] === 200){
			commit("GETSEARCHLIST", result.data);
		}

	}
};

// 项目当中的getters 主要作用是：简化仓库中的数据（简化数据而生）
// 可以把我们将来在组建中需要用到的数据进行简化一下  （将来在组建中使用数据就方便了）
const getters = {
	//	当前形参为 本仓库中的state  不是大仓库的state
	goodsList(state){
		return state.searchList['goodsList'];
	},
	attrsList(state){
		return state.searchList['attrsList'];
	},
	trademarkList(state){
		return state.searchList['trademarkList'];
	}
};

export default {
	state,
	mutations,
	actions,
	getters
}