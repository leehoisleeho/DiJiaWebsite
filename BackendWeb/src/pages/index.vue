<script setup></script>

<template>
  <div class="container">
    <div class="sidebarBox">
      <div class="sidebarHeader">
        <img src="../assets/imgs/logo_1.png" alt="">
        <h1>后台管理系统</h1>
      </div>
      <div>
        <t-menu>
          <t-menu-item value="0">
            仪表盘
          </t-menu-item>
          <t-menu-item value="1">
            轮播图
          </t-menu-item>
          <t-menu-item value="2">
            金刚区
          </t-menu-item>
          <t-menu-item value="3">
            文章
          </t-menu-item>
          <t-menu-item value="4">
            关于我们
          </t-menu-item>
        </t-menu>
      </div>
      <div class="foot">
       Copyright © 2020 - 2023 迪迦文化传媒公司版权所有
      </div>
    </div>
    <div class="main">
      内容
    </div>
  </div>
</template>

<style scoped>
.foot{
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
}
</style>
