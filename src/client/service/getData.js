import fetch from '../config/fetch'

/**
 * 获取session中用户信息
 */
export const getUserFromSession = () => fetch('GET', '/api/user/getUserInfo')

/**
 * 删除session中用户信息
 */
export const delUserFromSession = () => fetch('GET', '/api/user/delUserInfo')

/**
 * 搜索
 */
export const search = (keyword) => fetch('POST','/api/search',{
	keyword:keyword
})

/**
 * 登录
 */
export const login = (userObj) => fetch('POST','/api/user/login',{
	username:userObj.username,
	password:userObj.password
})

/**
 * 注册
 */
export const reg = (userObj) => fetch('POST','/api/user/reg',{
	username:userObj.username,
	password:userObj.password
})

/**
 *发文章
 */
export const addPost = (postObj) => fetch("POST",'/api/post/add',{
	title:postObj.title,
	post:postObj.post
})

/**
 *查看文章
 */
export const find = (code) => fetch("GET",'api/post/find',{
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