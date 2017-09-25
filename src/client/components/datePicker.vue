<template>
	<div id='myDatePicker'>
		<div>
			<span v-for="item in initedItem" :class="{currentItem:item.key===currentKey}" @click="changeCurrent(item)">{{item.word}}</span>
		</div>
		<div v-if="currentKey === 6">
		<mt-button size="large" @click="startDate">{{customStartPicker.show}}</mt-button>
		<mt-button size="large" @click="endDate">{{customEndPicker.show}}</mt-button>
		<mt-datetime-picker ref="startPicker" type="date" year-format="{value} 年" month-format="{value} 月"
			 @confirm="getCustomStartDate" :endDate="customStartPicker.endDate" :startDate="customStartPicker.startDate" v-model="customStartPicker.value">
		</mt-datetime-picker>
		<mt-datetime-picker ref="endPicker" type="date" year-format="{value} 年" month-format="{value} 月"
			 @confirm="getCustomEndDate" :endDate="customEndPicker.endDate" :startDate="customEndPicker.startDate" v-model="customEndPicker.value">
		</mt-datetime-picker>
		</div>
		<div v-else>
			<span @click="pre">上一{{currentWord}}</span>
			<span>{{current}}</span>
			<span @click="next">下一{{currentWord}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		name:"datePicker",
		data(){
			return {
				wordArr:['日','周','月','季','年','自定义'],
				currentKey:1,//标志数
				currentWord:"自定义",//标志字
				current:"",//显示字段
				currentMS:(new Date()).getTime(),//当前毫秒数
				initedItem:[],//处理过后的items,
				customStartPicker:{
					value:new Date((new Date()).getFullYear(),0,1),
					show:"开始年月",
					startDate:new Date(2010,0,1),
					endDate:new Date(),
					result:null
				},
				customEndPicker:{
					value:new Date(),
					show:"结束年月",
					startDate:new Date(2010,0,1),
					endDate:new Date(),
					result:null
				}
			}
		},
		props:['items','custom','default'],//items传过来的标志数,custom有没有自定义，true有false没有
		computed:{
		},
		methods:{
			initDate(){//初始化时间格式
				if(this.custom){
					this.items.push('自定义')
				}
				for(let item of this.items){
					let obj = {};
					obj.word = item;
					switch(item){
						case '日':
							obj.key = 1;
							break;
						case '周':
							obj.key = 2;
							break;
						case '月':
							obj.key = 3;
							break;
						case '季':
							obj.key = 4;
							break;
						case '年':
							obj.key = 5;
							break;
						case '自定义':
							obj.key = 6;
							break;
					}
					if(obj.key && obj.word){
						this.initedItem.push(obj);
					}
				}
				this.currentKey = this.default;
				this.currentWord = this.wordArr[this.default-1];
			},
			initTime(){//转化成所需要显示的格式
				let currentDate = this.getCurrentDate();
				switch(this.currentKey){
					case 1:
						this.current = currentDate.year+'年'+currentDate.month+'月'+currentDate.date+'日';
						break;
					case 2:
						this.current = currentDate.year+'年第'+currentDate.week+'周';
						break;
					case 3:
						this.current = currentDate.year+'年'+currentDate.month+'月';
						break;
					case 4:
						this.current = currentDate.year+'年第'+currentDate.season+'季度'
						break;
					case 5:
						this.current = currentDate.year+'年';
						break;
				}
			},
			changeCurrent(a){//点击更换时间
				this.currentKey = a.key;
				this.currentWord = a.word;
				this.currentMS = (new Date()).getTime();
				this.initTime();
				this.$emit("getResult",[this.getResult().startMS,this.getResult().endMS]);
			},
			getWeek(){//获得当前或指定时间周数
				let date = new Date(this.currentMS);
				date.setHours(0, 0, 0, 0);
				date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
				const week1 = new Date(date.getFullYear(), 0, 4);
				return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
			},
			getSeason(){
				let date = new Date(this.currentMS);
				let season = "";
				switch(Math.floor(date.getMonth()/3)){
					case 0:
						season = "一";
						break;
					case 1:
						season = "二";
						break;
					case 2:
						season = "三";
						break;
					case 3:
						season = "四";
						break;
				}
				return season;
			},
			getCurrentDate(){//获得当前或指定时间周数
				let date = new Date(this.currentMS);
				return {
					date:date.getDate(),
					week:this.getWeek(),
					month:date.getMonth()+1,
					season:this.getSeason(),
					year:date.getFullYear()
				}
			},
			pre(){//上一
				let m = this.getCurrentDate();
				switch(this.currentKey){
					case 1:
						this.currentMS -= 1000*60*60*24
						break;
					case 2:
						this.currentMS -= 1000*60*60*24*7
						break;
					case 3:
						if(m.month === 1){
							this.currentMS = (new Date(m.year-1,11,1)).getTime();
						}else{
							this.currentMS = (new Date(m.year,m.month-2,1)).getTime();
						}
						break;
					case 4:
						if(m.month>=1&&m.month<=3){
							this.currentMS = (new Date(m.year-1,m.month+8,1)).getTime();
						}else{
							this.currentMS = (new Date(m.year,m.month-4,1)).getTime();
						}
						break;
					case 5:
						this.currentMS = (new Date(m.year-1,0,1)).getTime();
						break;
				}
				this.initTime();
				this.$emit("getResult",[this.getResult().startMS,this.getResult().endMS]);
			},
			next(){//下一
				if(((new Date()).getTime()-1000*60*60)>this.currentMS){//防误差
					let m = this.getCurrentDate();
					switch(this.currentKey){
						case 1:
							this.currentMS += 1000*60*60*24
							break;
						case 2:
							this.currentMS += 1000*60*60*24*7
							break;
						case 3:
							if((m.year!==(new Date()).getFullYear())||(m.month!==(new Date()).getMonth()+1)){
								if(m.month === 12){
									this.currentMS = (new Date(m.year+1,0,1)).getTime();
								}else{
									this.currentMS = (new Date(m.year,m.month,1)).getTime();
								}
							}
							break;
						case 4:
							if((m.year!==(new Date()).getFullYear())||(m.month!==(new Date()).getMonth()+1)){
								if(m.month>=10&&m.month<=12){
									this.currentMS = (new Date(m.year+1,m.month-10,1)).getTime();
								}else{
									this.currentMS = (new Date(m.year,m.month+2,1)).getTime();
								}
							}
							break;
						case 5:
							if(m.year<(new Date()).getFullYear()){
								this.currentMS = (new Date(m.year+1,0,1)).getTime();
							}
							break;
					}
					this.initTime();
				}
				this.$emit("getResult",[this.getResult().startMS,this.getResult().endMS]);
			},
			getResult(){
				let result = {
					startMS:0,
					endMS:0
				}
				let m = new Date(this.currentMS);
				switch(this.currentKey){
					case 1:
						result.startMS = m.setHours(0,0,0,0);
						result.endMS = m.setHours(23,59,59,999);
						break;
					case 2:
						result.startMS = m.setHours(0,0,0,0)-m.getDay()*1000*60*60*24;
						result.endMS = m.setHours(23,59,59,999)+(6-m.getDay())*1000*60*60*24;
						break;
					case 3:
						result.startMS = (new Date(m.getFullYear(),m.getMonth(),1,0,0,0,0)).getTime();
						result.endMS = (new Date(m.getFullYear(),m.getMonth()+1,1,0,0,0,0)).getTime()-1;
						break;
					case 4:
						result.startMS = (new Date(m.getFullYear(),3*Math.floor(m.getMonth()/3),1,0,0,0,0)).getTime();
						result.endMS = (new Date(m.getFullYear(),3*Math.floor(m.getMonth()/3)+3,1,0,0,0,0)).getTime()-1;
						break;
					case 5:
						result.startMS = (new Date(m.getFullYear(),0,1)).getTime();
						result.endMS = (new Date(m.getFullYear(),11,31)).getTime();
						break;
					case 6:
						result.startMS = this.customStartPicker.result;
						result.endMS = this.customEndPicker.result;
						break;
				}
				return result;
			},
			startDate(){
				this.$refs.startPicker.open()
			},
			endDate(){
				this.$refs.endPicker.open()
			},
			getCustomStartDate(value){
				value.setDate(1);
				this.customStartPicker.result = value.getTime();
				this.customStartPicker.show = value.getFullYear()+"年"+(value.getMonth()+1)+"月";
				this.customEndPicker.startDate = value;
				if(this.customStartPicker.result&&this.customEndPicker.result){
					this.$emit("getResult",[this.getResult().startMS,this.getResult().endMS]);
				}
			},
			getCustomEndDate(value){
				value.setMonth(value.getMonth()+1)
				value.setDate(1);
				value.setTime(value.getTime()-1);
				this.customEndPicker.result = value.getTime();
				this.customEndPicker.show = value.getFullYear()+"年"+(value.getMonth()+1)+"月";
				this.customStartPicker.endDate = value;
				if(this.customStartPicker.result&&this.customEndPicker.result){
					this.$emit("getResult",[this.getResult().startMS,this.getResult().endMS]);
				}
			}
		},
		mounted(){
			this.initDate();
			this.initTime();
		}
	}
</script>
<style>
#myDatePicker{
	text-align:center;
}
#myDatePicker>div:nth-child(1){
	background:#FFFFFF;
	display:flex;
	height:50px;
	line-height:50px;
}
#myDatePicker>div:nth-child(1)>span{
	flex:1
}
.currentItem{
	border-bottom:4px solid #716eed;
}
#myDatePicker>div:nth-child(2){
	display:flex;
	height:50px;
	line-height:50px;
}
#myDatePicker>div:nth-child(2)>span{
	flex:1
}
#myDatePicker>div:nth-child(2)>span:nth-child(2){
	flex:2
}
#myDatePicker .picker-items>.picker-slot-center:nth-child(3){
	display:none;
}
</style>