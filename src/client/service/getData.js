import fetch from '../config/fetch'

/**
 * 获取用户信息++
 */
export const getUser = () => fetch('GET', '../../static/data.json')