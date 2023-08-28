<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get } from '../../API/service';
const BaseUrl = 'http://127.0.0.1:7001'
const data = ref('')
const imgList = ref([])
const route = useRoute()
onMounted(() => {
  const id = route.query.id
  get('/h5/api/getProject?id=' + id).then(res => {
    data.value = res.data
    if(res.data.project_imgs===''){
      imgList.value = []
    }else if(res.data.project_imgs!==''){
      imgList.value = res.data.project_imgs.split(',')
    }
  })
})
const router = useRouter();
const toContact = ()=>{
  router.push({
    path: '/contact',
  })
}
</script>
<template>
  <div class="header"></div>
  <div class="infoBox">
    <div class="infoTitle">
      <img :src="BaseUrl + data.icon_img" alt="">
      <span>{{ data.name }}</span>
    </div>
    <div class="infoBoxList">
      <div class="infoBoxListItem Introduction">
        {{data.Introduction}}
      </div>
    </div>
  </div>
  <div class="infoBoxList_1">
    <h3>我们能做什么？</h3>
    <div class="infoBoxListItem">
      {{data.we_do}}
    </div>
  </div>
  <div class="infoBoxList_1">
    <h3>案例图片</h3>
    <div class="noneImg" v-show="imgList.length===0">暂无案例图片</div>
    <div class="infoBoxListItem" v-show="imgList.length!==0">
      <img :src="BaseUrl + item" v-for="item in imgList">
    </div>
  </div>
  <div class="btnBox">
    <t-button size="large" theme="primary" block @click="toContact">联系我们</t-button>
  </div>
</template>

<style scoped>
.noneImg{
  padding: 0 30px;
  color: #999999;
  font-size: 25px;
}
.Introduction{
  height: 300px;
}
.infoBoxListItem {
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  /* 滚动条  */
  overflow-x: auto;
}

.infoBoxListItem>img {
  width: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.t-button {
  padding: 50px 0;
  font-size: 30px;

}

.btnBox {
  width: 700px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
}

.infoBoxList_1>.infoBoxListItem {
  color: #666666;
  line-height: 2em;
}

.infoBoxList_1>h3 {
  padding: 0 30px;
  margin-bottom: 20px;
  color: #333;
}

.infoBoxList_1 {
  margin-top: 50px;
}

.infoBoxListItem {
  padding: 0 30px;
  color: #666;
  font-size: 28px;
  line-height: 1.7em;
}

.infoBoxListTitle {
  padding: 0 30px;
  font-size: 35px;
  margin-bottom: 15px;
}

.infoTitle>img {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.infoTitle {
  padding: 30px 30px;
  font-size: 40px;
  display: flex;
  color: #333;
  align-items: center;
}

.infoBox {
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  background: white;
  margin-top: -300px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  padding-bottom: 30px;
}

.header {
  height: 400px;
  background: #4285f4;
}

.header>img {
  width: 100%;
}
</style>