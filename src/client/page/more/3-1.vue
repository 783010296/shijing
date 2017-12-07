<template>
  <div>
  <head-top></head-top>
	<el-table :data="tableData" border id="Thirty-one" height="500" :row-class-name="setClassName" @row-click="moreTableRowClick">
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
import axios from 'axios'
import headTop from '../../components/head'
import { fetchNews } from '../../service/getData'
export default {
  data(){
  	return{
	  	tableData: []
  	}
  },
  components:{
    headTop
  },
  methods:{
    getDataFromCNode(){
      axios.get('/api/more/getNews').then(data=>{
        this.tableData.push(...data.data.news)
      }).catch(err=>{
        console.log(err)
      })
    },
    setClassName(){
      return 'more31Table'
    },
    moreTableRowClick(row, event, column){
      console.log(row);
      window.location.href = "https://cnodejs.org"+row.url
    }
  },
  mounted(){
    fetchNews().then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    this.getDataFromCNode()
  }
}
</script>

<style>
#Thirty-one{
	width:1000px;
	margin:0 auto;
}
#Thirty-one .more31Table:hover{
  cursor:pointer
}

</style>