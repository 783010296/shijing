import fetch from '../config/fetch'

/**
 * 获取session中用户信息
 */
export const getUserFromSession = () => fetch('/api/user/getUserInfo')

/**
 * 删除session中用户信息
 */
export const delUserFromSession = () => fetch('/api/user/delUserInfo')

/**
 * 搜索
 */
export const search = (keyword) => fetch('/api/search',{
	keyword:keyword
},'POST')

/**
 * 登录
 */
export const login = (userObj) => fetch('/api/user/login',{
	username:userObj.username,
	password:userObj.password
},'POST')

/**
 * 注册
 */
export const reg = (userObj) => fetch('/api/user/reg',{
	username:userObj.username,
	password:userObj.password
},'POST')

/**
 *发文章
 */
export const addPost = (postObj) => fetch('/api/post/add',{
	title:postObj.title,
	post:postObj.post
},'POST')

/**
 *查看文章
 */
export const find = (code) => fetch('/api/post/find',{
	code:code
})


/**
 *
 */


/**
 *
 */

/**
 *
 */

/**
 *
 */

/**
 *
 */