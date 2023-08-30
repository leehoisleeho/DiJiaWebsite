<script setup>
  import { onMounted, ref } from 'vue'
  import { get } from '../../API/service'
  const content = ref('')
  onMounted(() => {
    get('/h5/api/getArticle?id=22').then(res=>{
      content.value = res.data.content
    })
  })
</script>
<template>
  <div class="header">
    <img src="../../public/imgs/about.png" alt="">
  </div>
  <div class="info">
    <h2>我们是谁 / 我们奉行的理念</h2>
    <div class="info_1" v-html="content"></div>
  </div>
</template>
<style scoped>
.info_1{
  padding: 0 30px;
  color: #333;
  font-weight: 300;
  line-height: 1.8em;
}
.info>h2{
  font-size: 40px;
  color: #333;
  padding: 30px;
  font-weight: 300;
}
.header {
  display: flex;
  justify-content: center;
  padding: 30px 0;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.header>img {
  width: 460px;
}
</style>