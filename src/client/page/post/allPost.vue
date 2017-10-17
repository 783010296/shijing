<template>
	<div>
		<head-Top></head-Top>
		<el-table :data="tableData" border id="allPost" height="500" :row-class-name="setClassName" @row-click="moreTableRowClick">
	    <el-table-column type="index" width="80">
	    </el-table-column>
	    <el-table-column prop="author" label="作者" width="150">
	    </el-table-column>
	    <el-table-column prop="title" label="标题" width="380">
	    </el-table-column>
	    <el-table-column prop="url" label="链接">
	    </el-table-column>
	  </el-table>
	</div>
</template>


<script>
	import headTop from '../../components/head'
	export default {
		data(){

		},
		components:{
			headTop
		}
	}
</script>