// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import Search from '@/pages/Search'
import addCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

/**
 * @name: routes
 * @author: GOLU
 * @date: 2023/5/13 21:38
 * @description：routes
 * @update: 2023/5/13 21:38
 */
export default [
	{
		path: "/home",
		component: Home,
		meta: {show:true}
	},
	{
		path: "/login",
		component: Login,
		meta: {show:false}
	},
	{
		path: "/register",
		component: Register,
		meta: {show:false}
	},
	{
		path: "/detail/:skuid",
		component: Detail,
		meta: {show:true}
	},
	{
		path: "/addcartsuccess",
		name: "addcartsuccess",
		component: addCartSuccess,
		meta: {show:true}
	},
	{
		path: '/shopcart',
		component: ShopCart,
		meta: { show: true }
	},
	{
		path: "/search/:keyword?",
		component: Search,
		meta: {show:true},
		name: "search"
	},
	// 重定向
	{
		redirect: "/home",
		path: "*"
	}
]