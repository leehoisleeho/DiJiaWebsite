<template>
  <!-- 轮播图 -->
  <div class="header">
    <div style="padding: 0 16px">
      <t-swiper :navigation="{ type: 'dots' }" :autoplay="true">
        <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px"
          @touchstart="swiperClick(index)">
          <img :src="item" class="img" />
        </t-swiper-item>
      </t-swiper>
    </div>
  </div>
  <!-- 金刚区 -->
  <div class="navBox">
    <ul class="navBox_item">
      <li v-for="{ item, index } in 7">
        <img src="../../public/imgs/douyin.png" alt="">
        <span>抖音拍摄</span>
      </li>
    </ul>
  </div>
  <!-- 新闻列表 -->
  <div class="newsBox">
    <div class="newsBoxTitle">
      新闻专区
    </div>
    <ul class="newsBoxList">
      <li>
        <div class="newsBoxListImg">
          <img src="../../public/imgs/newsImg.png" alt="">
        </div>
        <div class="newsListInfo">
          <div>这是一个新闻的标题</div>
          <div>2023-08-23</div>
          <div>这是这篇新闻的概要，大概的讲一下新闻的内容,这是这篇新闻的概要，大概的讲一下新闻的内容,这是这篇新闻的概要，大概的讲一下新闻的内容</div>
        </div>
      </li>
      <li>
        <div class="newsBoxListImg">
          <img src="../../public/imgs/newsImg.png" alt="">
        </div>
        <div class="newsListInfo">
          <div>这是一个新闻的标题</div>
          <div>2023-08-23</div>
          <div>这是这篇新闻的概要，大概的讲一下新闻的内容,这是这篇新闻的概要，大概的讲一下新闻的内容,这是这篇新闻的概要，大概的讲一下新闻的内容</div>
        </div>
      </li>
    </ul>
    <div class="newsBoxFoot">查看更多</div>
  </div>
  <!-- 关于我们 -->
  <div class="about">
    <div class="newsBoxTitle">
      关于我们
    </div>
    <div class="aboutImg">
      <img src="../../public/imgs/about.png" alt="">
    </div>
  </div>
  <!-- 底部 -->
  <t-footer text="Copyright © 2020-2023 迪迦文化传媒公司" />
</template>

<script setup>
const swiperList = [
  "../../public/imgs/封面1.jpg",
  "../../public/imgs/封面2.jpg"
];

const swiperClick = (e) => {
  console.log(e)
};
</script>

<style scoped>
.newsListInfo>div:nth-child(3){
  font-size: 23px;
  color: #999;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* 控制显示的行数 */
}
.newsListInfo>div:nth-child(2){
  font-size: 26px;
  color: #999;
}
.newsBoxList>li{
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 200px;
  margin-bottom: 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
}
.newsBoxListImg{
  width: 300px;
  margin-right: 30px;
}
.aboutImg{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.aboutImg>img{
 width: 290px;
}
.t-footer{
  padding: 30px 0;
}
.about{
  width: 690px;
  border-radius: 10px;
  margin: 30px auto;
  margin-bottom: 50px;
}
.newsBoxFoot{
  font-size: 20px;
  color: #999;
  text-align: center;
}

.newsBoxTitle {
  color: #333;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
}

.newsBox {
  padding: 0 30px;
}

.navBox_item>li>img {
  width: 80px;
}

.navBox_item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.navBox_item>li {
  width: 170px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
/* 如果最后一行是3个元素 */
.navBox_item>li:last-child:nth-child(4n - 1) {
  margin-right: calc(24% + 4% / 3);
}
/* 如果最后一行是3个元素 */
.navBox_item>li:last-child:nth-child(4n - 2) {
  margin-right: calc(48% + 8% / 3);
}
/* 如果最后一行是3个元素 */
.navBox_item>li:last-child:nth-child(4n - 3) {
  margin-right: calc(72% + 12% / 3);
}

.navBox_item>li>span {
  color: #666;
  font-size: 24px;
  text-align: center;
}

img {
  display: block;
  width: 100%;
}

.header {
  padding: 30px 0;
}

.navBox {
  padding: 0px;
}</style>