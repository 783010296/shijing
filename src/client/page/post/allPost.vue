<template>
	<div>
		<head-Top></head-Top>
		<el-table :data="tableData" id="allPost" show-header="false" :row-class-name="setClassName" @row-click="rowClick" stripe border>
			<el-table-column type="index" width="50">
    	</el-table-column>
      <el-table-column prop="title" label="标题" width="400">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="180">
      </el-table-column>
      <el-table-column prop="time" label="时间"  width="180">
      </el-table-column>
      <el-table-column prop="pv" label="访问量">
      </el-table-column>
    </el-table>
	</div>
</template>


<script>
	import headTop from '../../components/head'
	import { postFindAll } from '../../service/getData'
	export default {
		data(){
			return {
				tableData: []
			}
		},
		components:{
			headTop
		},
		methods:{
			setClassName(){
				return ''
			},
			rowClick(row, event, column){
				this.$router.push({name:'onePost', params: { code:row.code}})
			}
		},
		mounted(){
			let _this = this
			postFindAll().then(post=>{
				_this.tableData = post.posts;
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
	margin:0 auto;
}
#allPost tableRow:hover{
	cursor:pointer
}

</style>