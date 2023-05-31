/**
 * @name: index
 * @author: GOLU
 * @date: 2023/3/28 23:28
 * @description：index
 * @update: 2023/3/28 23:28
 */
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";
// home 模块的小仓库
const state = {
	// home 仓库中存储三级菜单的数据
	categoryList: [],
	// 轮番图的数据
	bannerList: [],
	// floor的数据
	FloorList: []
};
const mutations = {
	// 对仓库中categorylist参数进行操作
	CATEGORYLIST(state, categoryList){
		state.categoryList = categoryList;
	},

	// 对仓库中bannerlist参数进行操作
	GETBANNERLIST(state, bannerList){
		state.bannerList = bannerList;
	},

	// 对仓库中floorList参数进行操作
	GETFLOORLIST(state, FloorList){
		state.FloorList = FloorList;
	}
};
const actions = {
	// 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
	// 获取三联动导航数据
	async categoryList({commit}){
		let result = await reqCategoryList();
		if (result.code === 200){
			commit("CATEGORYLIST", result.data.slice(0, 16));
		}
		
		// console.log(result);
	},

	// 获取mockBannerList数据
	async getBannerList({commit}){
		let result = await reqBannerList();
		if (result.code === 200){
			commit("GETBANNERLIST", result.data);
		}
	},

	// 获取mockFloorList 数据
	async getFloorList({commit}){
		let result = await reqFloorList();
		if(result.code === 200){
			commit("GETFLOORLIST", result.data);
		}
	}
};

//计算属性
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
}