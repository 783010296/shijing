<template>
	<div>
		<head-top></head-top>
		<div id="more32Box">
			<div>
				<date-picker :items="items" :custom="false" :default="3" @getResult="getResult"></date-picker>
			</div>
			<h1>开始时间戳{{resultStartDate}}</h1>
			<h1>结束时间戳{{resultEndDate}}</h1>
			<p>时间选择控件，返回开始和结束时间戳，分为日，周，月，季，年。参数包括四个，items是传入的标志，custom是否包含自定义选项，default值为当前活跃项，点击上一或下一触发getResult事件，参数为一个数组，数组第一项是开始时间戳，数组第二项是结束时间戳。此组件用于手机，自定义选项基于mint-ui，记得引入</p>
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/head'
	import datePicker from '../../components/datePicker'
	export default{
		data(){
			return {
				items:['日','周','月','季','年'],
				resultStartDate:null,
				resultEndDate:null
			}
		},
		components:{
			datePicker,
			headTop
		},
		methods:{
			getResult([start,end]){
				this.resultStartDate = start;
				this.resultEndDate = end;
			}
		}
	}

</script>

<style>
#more32Box{
	width:1000px;
	margin:0 auto;
	border:1px solid black;
	text-align:center;
	padding:50px;
}
#more32Box>div:nth-child(1){
	width:375px;
	height:100px;
	border:1px solid black;
	margin:0 auto;
}
#more32Box>p{
	width:500px;
	margin:0 auto;
	margin-top:50px;
	font-size:30px;
}
</style>