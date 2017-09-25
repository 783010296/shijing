<template>
	<div id="more32Box">
		<div>
			<date-picker :items="items" :custom="false" :default="3" @getResult="getResult"></date-picker>
		</div>
		<h1>{{resultStartDate}}</h1>
		<h1>{{resultEndDate}}</h1>
	</div>
</template>

<script>
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
			datePicker
		},
		methods:{
			getResult([start,end]){
				this.resultStartDate = start;
				this.resultEndDate = end;
			},
		}
	}

</script>

<style>
#more32Box{
	width:1000px;
	margin:0 auto;
}
#more32Box>div:nth-child(1){
	width:400px;
	height:200px;
	padding:10px;
	border:2px solid black;
	margin:0 auto;
}
</style>