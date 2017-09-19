import fetch from '../config/fetch'

/**
 * 获取session中用户信息
 */
const getUserFromSession = () => fetch('GET', '/api/user/userInfo')

export { getUserFromSession }