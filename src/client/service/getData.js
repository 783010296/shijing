import fetch from '../config/fetch'

/**
 * 获取session中用户信息
 */
const getUserFromSession = () => fetch('GET', '/api/user/getUserInfo')
const delUserFromSession = () => fetch('GET', '/api/user/delUserInfo')
const search = (keyword) => fetch('POST','/api/search',{
	keyword:keyword
})

export { getUserFromSession,delUserFromSession,search }