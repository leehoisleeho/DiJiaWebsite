<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const backIndex = ()=>{
  router.push({path:'/'})
}
</script>
<template>
  <div class="imgBox">
    <img src="../../public/imgs/success.png">
    <h3>提交成功</h3>
  </div>
  <div class="btnBox">
    <t-button  theme="primary" variant="outline" block @click="backIndex">返回首页</t-button>
  </div>

</template>
<style scoped>
.imgBox>h3{
  color: #666666;
  font-weight: 320;
}
.t-button{
  padding: 50px 0;
  font-size: 25px;
}
.btnBox{
  padding: 0px 30px;

}
.imgBox{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 300px 0;
}
.imgBox>img{
  width: 400px;
}
</style>