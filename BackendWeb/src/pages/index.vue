<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import config from '../config.js'
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
      <h1>{{config.systemName}}</h1>
      <div class="sidebarHeader">
        <img src="../assets/imgs/logo_1.png" alt="">
      </div>
      <div>
        <t-menu @change="onChange" :value=index>
          <t-menu-item :value=0 to="/dashboard">
            首页
          </t-menu-item>
          <t-menu-item :value=1 to="/banner">
            轮播图
          </t-menu-item>
          <t-menu-item :value=2 to="/projectList">
            项目列表
          </t-menu-item>
          <t-menu-item :value=3 to="/article">
            文章
          </t-menu-item>
          <t-menu-item :value=4 to="/contact">
            联系我们
          </t-menu-item>
<!--          <t-submenu value="5" title="模板">-->
<!--            <t-menu-item value="5-1" to="/basicTemplate">页面-1</t-menu-item>-->
<!--            <t-menu-item value="5-2" to="/dataTemplate">页面-2</t-menu-item>-->
<!--          </t-submenu>-->
        </t-menu>
      </div>
      <div class="foot">
        {{config.copyright}}
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

.sidebarBox>h1 {
  font-size: 15px;
  color: #2a2a2a;
  font-weight: 440;
  text-align: center;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.sidebarHeader>img {
  width: 45px;
}

.sidebarHeader {
  text-align: center;
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
