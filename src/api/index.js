// 当前这个模块：api进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

// 三级联动接口 
// /api/product/getBaseCategoryList   请求方法：get  请求参数：无
// 发请求：axios发请求返回结果 promise对象
export const reqCategoryList = () => requests({url: "/product/getBaseCategoryList",method: "GET"});
// 发请求：获取 Mock BannerList 数据
export const reqBannerList = () => mockRequests({url: "/banners", method: "GET"});
// 发请求：获取 Mock FloorList 数据
export const reqFloorList = () => mockRequests({url: "floors", method: "GET"});
// 获取搜索模块数据 接口 /api/list   请求方法：post
// 请求参数：
/*
	{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}

* */
// 发请求：获取搜索模块数据   需要传递一个默认参数 【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({url: "/list", data: params, method: "POST"});

// 获取产品详细信息的接口：URL: /api/item/{skuId}     请求方式 GET
export const reqGoodsInfo = (skuId) => requests({url: `/item/${skuId}`, method: "GET"});

// 将产品添加到购物车中  （获取更新某一个产品的个数）
// URL: /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST'});

// 获取购物车列表数据接口
//URL:/api/cart/cartList   method:get
export const reqCartList = () => requests({url:'/cart/cartList ',method:'get'});




