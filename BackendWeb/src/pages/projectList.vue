<script setup></script>

<template>
  <div class="container">
    <div class="infoBox">
      <div class="listBox">
        <ul class="listBoxTitle">
          <li>ID</li>
          <li>ICON</li>
          <li>项目名</li>
          <li>项目介绍</li>
          <li>我们能做什么</li>
          <li>操作</li>
        </ul>
        <ul class="listItem">
          <li>1</li>
          <li>
            <img src="../assets/imgs/loginImg.png" alt="">
          </li>
          <li>微信小程序开发</li>
          <li>一段介绍的文字很多</li>
          <li>一段介绍的文字很多</li>
          <li>
            <t-button theme="primary" style="margin-right: 20px;">编辑</t-button>
            <t-button theme="danger">删除</t-button>
          </li>
        </ul>
        <div class="add">
          <img src="../assets/imgs/addIcon.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.listItem>li:nth-child(2)>img {
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