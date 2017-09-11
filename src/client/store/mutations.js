const LOGIN = "LOGIN";
const ADD_COUNT = "ADD_COUNT"
import { getUser } from '../service/getData'

export default {
	[LOGIN](state){
		getUser().then(function(data){
			console.log(data);
		})
	}
}