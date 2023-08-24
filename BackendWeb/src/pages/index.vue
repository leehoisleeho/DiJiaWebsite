<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// 定义路由
const router = useRouter();
/**
 * 描述: 侧边栏切换
 * 加载首页时,默认选中第一个菜单 仪表盘
 * onChange 测边拦切换事件
 */
const index = ref(0)
const onChange = (e) => {
  index.value = e
}
onMounted(() => {
  // 加载首页时,默认选中第一个菜单 仪表盘
  router.push('/dashboard')
});

</script>

<template>
  <div class="container">
    <!-- 侧边栏 -->
    <div class="sidebarBox">
      <div class="sidebarHeader">
        <img src="../assets/imgs/logo_1.png" alt="">
        <h1>后台管理系统</h1>
      </div>
      <div>
        <t-menu @change="onChange" :value=index>
          <t-menu-item :value=0 to="/dashboard">
            仪表盘
          </t-menu-item>
          <t-menu-item :value=1 to="/banner">
            轮播图
          </t-menu-item>
          <t-menu-item :value=2 to="/projectList">
            金刚区
          </t-menu-item>
          <t-menu-item :value=3 to="/article">
            文章
          </t-menu-item>
          <t-menu-item :value=4 to="/about">
            关于我们
          </t-menu-item>
        </t-menu>
      </div>
      <div class="foot">
        Copyright © 2020 - 2023 迪迦文化传媒公司版权所有
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="mainbox">
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.mainbox {
  width: 100%;
}

.foot {
  color: #999;
  font-size: 12px;
  text-align: center;
  position: absolute;
  bottom: 20px;
  width: 232px;
  padding: 0 20px;
}

.sidebarHeader>h1 {
  font-size: 18px;
  color: #666;
  margin-top: 10px;
  font-weight: 400;
}

.sidebarHeader>img {
  width: 50px;
}

.sidebarHeader {
  text-align: center;
  padding-top: 20px;
}

.sidebarBox {
  width: 232px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
}

.container {
  min-width: 1200px;
  height: 100vh;
  display: flex;
}</style>
