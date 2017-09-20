const LOGIN = "LOGIN";
const ADD_COUNT = "ADD_COUNT"

const SET_USERINFO = "SET_USERINFO"
const DEL_USERINFO = "DEL_USERINFO"

export default {
	[SET_USERINFO](state,info){
		state.userInfo = info
	},
	[DEL_USERINFO](state){
		state.userInfo = null
	}
}