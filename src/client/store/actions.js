import { getUserFromSession } from '../service/getData.js'

export default {
	async setUserInfo({commit,state}){
		let awaitObj = await getUserFromSession()
		commit('SET_USERINFO',awaitObj.userInfo)
	}
}