<template>
	<div>
		<head-Top></head-Top>
		<el-table :data="tableData" border id="allPost" height="500" :row-class-name="setClassName" @row-click="moreTableRowClick" show-header="false">
	    <el-table-column type="index" width="80">
	    </el-table-column>
	    <el-table-column prop="title"  width="150">
	    </el-table-column>
	    <el-table-column prop="author"  width="380">
	    </el-table-columntableData>
	    <el-table-column prop="time">
	    </el-table-column>
	  </el-table>
	</div>
</template>


<script>
	import headTop from '../../components/head'
	import { find } from '../../service/getData'
	export default {
		data(){
			tableData:[]
		},
		components:{
			headTop
		},
		mounted(){
			find().then(post=>{
				console.log(post)
			}).catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style>
#allPost{
	width:1000px;
	margin:0 auth;
}

</style>