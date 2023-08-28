<script setup>
import {ref,onMounted} from "vue";
import api from '../../API/api.js'
const list = ref([])
onMounted(()=>{
  api.getContact().then(res=>{
    list.value = res.data
  })
})
const del = (id)=>{
  api.delContact({
    id
  }).then(res=>{
    api.getContact().then(res=>{
      list.value = res.data
    })
  })
}
</script>
<template>
  <div class="container">
    <div class="infoBox">
      <ul class="tableTitle">
        <li>ID</li>
        <li>合作项目</li>
        <li>联系人</li>
        <li>联系方式</li>
        <li>联系人行业</li>
        <li>操作</li>
      </ul>
      <ul class="tableinfo" v-for="item in list" :key="item.id">
        <li>{{item.id}}</li>
        <li>{{item.projectname}}</li>
        <li>{{item.username}}</li>
        <li>{{item.phone}}</li>
        <li>{{item.industry}}</li>
        <li>
          <t-button theme="danger" @click="del(item.id)">删除</t-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.tableinfo{
  display: flex;
  height: 60px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #efefef;
}
.tableTitle{
  display: flex;
  height: 70px;
  align-items: center;
  font-weight: 600;
}
.tableinfo>li{
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: #333;
}
.tableTitle>li{
  flex: 1;
  text-align: center;
  font-size: 15px;
  color: #333;
}
.infoBox {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.container {
  padding: 30px;
}
</style>