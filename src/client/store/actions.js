import { getUserFromSession,delUserFromSession } from '../service/getData.js'

export default {
	async setUserInfo({commit,state}){
		let awaitObj = await getUserFromSession()
		commit('SET_USERINFO',awaitObj.userInfo)
	},
	async delUserInfo({commit,state}){
		let awaitObj = await delUserFromSession()
		if(awaitObj.key == 1){
			commit('DEL_USERINFO')
		}
	}
}