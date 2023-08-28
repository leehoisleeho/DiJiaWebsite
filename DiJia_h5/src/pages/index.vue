<script setup>
import { onMounted ,ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
const BaseUrl = "http://127.0.0.1:7001"
const router = useRouter();
import { get } from "../../API/service";

onMounted(() => {
  pageData()
});
// 获取页面所属数据
const bannerList = ref([]);
const articleList = ref([]);
const projectList = ref([]);
const pageData = async ()=>{
  const dataList = await Promise.all([get('/h5/api/getArticle'),get('/h5/api/getProject'),get('/h5/api/getBanner')])
  bannerList.value = dataList[2].data
  articleList.value = dataList[0].data
  projectList.value = dataList[1].data
  swiperList.value = bannerList.value.map((item,index)=>{
    return {
      article_id:item.article_id,
      img:item.img,      
    }
  })
  
}
// 通过判断Touchstart和Touchendh滑动的距离 判断是点击事件 还是滑动事件
/**
 * 腾讯轮播组件有问题 无法触发点击事件
 * 1. 首先定义4个变量
 * 2. 在touchstart中获取开始的坐标
 * 3. 在touchmove中获取结束的坐标
 * 4. 在touchend中判断滑动的距离
 * 5. 如果滑动的距离大于5px 则是滑动事件
 * 6. 如果滑动的距离小于5px 则是点击事件
 * 7. 在touchend中将isClick重置为true
 */
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let distanceX = 0;
let distanceY = 0;
let isClick = true;
const handleTouchstart = (e) => {
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
}
const handleTouchmove = (e) => {
  endX = e.touches[0].pageX;
  endY = e.touches[0].pageY;
  distanceX = endX - startX;
  distanceY = endY - startY;
  if (Math.abs(distanceX) > 5 || Math.abs(distanceY) > 5) {
    isClick = false;
  }
}
const handleTouchend = (index) => {
  if (isClick) {
    // 点击时候处理的逻辑写这里
    // console.log('点击事件', index)
    router.push({
    path: '/newsDetails',
    query: {
      id: index
    }
  })
  }
  isClick = true;
}
const swiperList = ref([])
//金刚区图片被点击
const toProjectDetails = (e) => {
  router.push({
    path: '/projectDetais',
    query: {
      id: e
    }
  })
}

// 去文章详情页
const toNewsDetails = (id) => {
  router.push({
    path: '/newsDetails',
    query: {
      id: id
    }
  })
}

// 去关于我们
const toAbout = () => {
  router.push('/about');
}
</script>

<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="header">
      <div style="padding: 0 10px">
        <t-swiper :navigation="{ type: 'dots-bar' }">
          <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px"
            @touchstart="handleTouchstart" 
            @touchend="handleTouchend(item.article_id)" 
            @touchmove="handleTouchmove" 
            autoplay="false">
            <img :src="BaseUrl + item.img" />
          </t-swiper-item>
        </t-swiper>
      </div>
    </div>
    <!-- 金刚区 -->
    <div class="navBox">
      <ul class="navBox_item">
        <li v-for="(item,index) in projectList" :key="item.id"  @click="toProjectDetails(item.id)">
          <img :src="BaseUrl + item.icon_img" alt="">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 新闻列表 -->
    <div class="newsBox">
      <div class="newsBoxTitle">
        新闻专区
      </div>
      <ul class="newsBoxList" v-for="(item,index) in articleList" :key="item.id">
        <li @click="toNewsDetails(item.id)">
          <div class="newsBoxListImg">
            <img :src="BaseUrl + item.imgs" alt="">
          </div>
          <div class="newsListInfo">
            <div>{{item.title}}</div>
            <div>浏览量 {{item.likes}}</div>
            <div>{{item.createtime.split('T')[0]}}</div>
            <!-- <div v-html="item.content"></div> -->
          </div>
        </li>
      </ul>
      <div class="newsBoxFoot" style="font-size: 13px;">查看更多</div>
    </div>
    <!-- 关于我们 -->
    <div class="about">
      <div class="newsBoxTitle">
        关于我们
      </div>
      <div class="aboutImg" @click="toAbout">
        <img src="../../public/imgs/about.png" alt="">
      </div>
    </div>
    <!-- 底部 -->
    <t-footer style="font-size: 13px;" text="Copyright © 2020-2023 迪迦文化传媒公司" />
  </div>
</template>

<style scoped>
.newsListInfo>div:nth-child(3) {
  font-size: 23px;
  color: #999;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  /* 控制显示的行数 */
}

.newsListInfo>div:nth-child(2) {
  font-size: 20px;
  color: #999;
}
.newsListInfo>div:nth-child(1) {
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  width: 500px;
  color: #333333;
}
.newsListInfo{
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.newsBoxList>li {
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 180px;
  margin-bottom: 14px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
}

.newsBoxListImg {
  margin-right: 30px;
}
.newsBoxListImg> img{
  width: 120px;
  height: 120px;
}
.aboutImg {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.aboutImg>img {
  width: 290px;
}

.t-footer {
  padding: 30px 0;
}

.about {
  width: 690px;
  border-radius: 10px;
  margin: 30px auto;
  margin-bottom: 50px;
}

.newsBoxFoot {
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
.navBox_item>li>span{
  /* 溢出省略号显示 */
  overflow: hidden;
  white-space: nowrap;
  display: block;
  width: 120px;
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
  color: #333;
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
}
</style>