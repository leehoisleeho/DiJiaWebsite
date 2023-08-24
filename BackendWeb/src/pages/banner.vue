<script setup>
import { ref } from 'vue'
/**
 * 抽屉组件
 */
const visible = ref(false)
const drawerShow = () => {
  console.log('show')
  visible.value = true
}
const onConfirm = () => {
  console.log('confirm')
  visible.value = false
}
</script>

<template>
  <div class="container">
    <div>
      <t-drawer destroyOnClose header v-model:visible="visible" @confirm="onConfirm"  size="800px">
        <p>添加录播图</p>
      </t-drawer>
    </div>
    <div class="infoBox">
      <div class="listBox">
        <ul class="listBoxTitle">
          <li>ID</li>
          <li>articleID</li>
          <li>文章名称</li>
          <li>背景图片</li>
          <li>操作</li>
        </ul>
        <ul class="listItem">
          <li>1</li>
          <li>2</li>
          <li>新闻01</li>
          <li>
            <img src="../assets/imgs/backendLogin.png" alt="">
          </li>
          <li>
            <t-button theme="primary" style="margin-right: 20px;">编辑</t-button>
            <t-button theme="danger">删除</t-button>
          </li>
        </ul>
        <div class="add">
          <img src="../assets/imgs/addIcon.png" alt="" @click="drawerShow">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-drawer{
  width: 1000px;
}
.add>img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.add {
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}

.listItem>li:nth-child(4)>img {
  width: 15%;
}

.listItem>li {
  flex: 1;
  text-align: center;
  color: #333;
  font-size: 15px;
}

.listItem {
  display: flex;
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 20px 0;
  align-items: center;
  height: 80px;
}

.listBoxTitle>li {
  flex: 1;
  text-align: center;
  color: #333;
  font-weight: 600;
  font-size: 15px;
}

.listBoxTitle {
  display: flex;
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 20px 0;
}

.listBox {
  padding: 0 20px;
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
