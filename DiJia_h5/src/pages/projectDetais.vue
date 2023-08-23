<script setup></script>
<template>
  <div class="header"></div>
  <div class="infoBox">
    <div class="infoTitle">
      <img src="../../public/imgs/miniProgram.png" alt="">
      <span>微信小程序开发</span>
    </div>
    <div class="infoBoxList">
      <div class="infoBoxListItem">
        这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述
        这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述
        这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述
        这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述这是一段微信小程序介绍的描述
      </div>
    </div>
  </div>
  <div class="infoBoxList_1">
      <h3>我们能做什么？</h3>
      <div class="infoBoxListItem">
        1. 根据客户需求，进行小程序的开发<br/>
        2. 根据客户需求，进行小程序的开发<br/>
        3. 根据客户需求，进行小程序的开发<br/>
        4. 根据客户需求，进行小程序的开发<br/>
        5. 根据客户需求，进行小程序的开发<br/>
      </div>
  </div>
  <div class="infoBoxList_1">
      <h3>案例图片</h3>
      <div class="infoBoxListItem">
        <img src="../../public/imgs/miniProgram.png" alt="">
        <img src="../../public/imgs/miniProgram.png" alt="">
        <img src="../../public/imgs/miniProgram.png" alt="">
        <img src="../../public/imgs/miniProgram.png" alt="">
      </div>
  </div>
  <div class="btnBox">
    <t-button size="large" theme="primary" block>联系我们</t-button>
  </div>
</template>

<style scoped>
.infoBoxListItem{
  display: flex;
  justify-content: space-between;
}
.infoBoxListItem>img{
  width: 20%;
}
.t-button{
  padding: 50px 0;
  font-size: 30px;
  
}
.btnBox{
  width: 700px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
}
.infoBoxList_1>.infoBoxListItem{
  color: #333;
}
.infoBoxList_1>h3{
  padding: 0 30px;
  margin-bottom: 20px;
  color: #333;
}
.infoBoxList_1{
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