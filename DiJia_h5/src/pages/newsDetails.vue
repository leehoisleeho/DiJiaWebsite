<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { get, post } from "../../API/service";
// 拿到前面路由传过来的参数
const route = useRoute();
const data = ref('')
onMounted(() => {
  const id = route.query.id
  get('/h5/api/getArticle?id=' + id).then(res => {
    data.value = res.data
    data.value.createtime = data.value.createtime.split('T')[0]
    // 每次新闻页面加载 liks + 1
    let n = res.data.likes + 1
    post('/h5/api/updataArticle', {
      id: data.value.id,
      likes: n,
      content: data.value.content,
      imgs: data.value.imgs,
      title: data.value.title,
    })
  })
})
</script>

<template>
  <div class="newsBox">
    <div class="title">
      {{ data.title }}
    </div>
    <div class="time">
      发布日期 {{ data.createtime }} 浏览量 {{ data.likes }} 
    </div>
    <div class="info" v-html="data.content"></div>
  </div>
</template>

<style scoped>

.dianzanBox>span {
  color: #999;
  font-size: 25px;
  margin-top: 15px;
}

.dianzanBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
}

.dianzanBox>img {
  width: 60px;
}

.title {
  padding: 30px;
  padding-bottom: 0;
  font-size: 40px;
  font-weight: 600;
}

.time {
  padding: 0 30px;
  color: #999;
  font-size: 28px;
  margin-top: 10px;
}

.info {
  padding: 20px 30px;
  text-align: justify;
}
img{
  width: 100% !important;
}
.newsBox{
  height: 100vh;
}
</style>