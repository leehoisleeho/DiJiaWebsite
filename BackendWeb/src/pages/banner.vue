<script setup>
import {onMounted, ref, watch} from 'vue'
import api from '../../API/api'
import {NButton, NSelect} from 'naive-ui'
import config from "../config.js";

const BaseUrl = config.BASE_URL

onMounted(() => {
  getBannerList()
})
// 获取banner列表
let bannerList = ref([])
const getBannerList = () => {
  api.getBanner().then(res => {
    bannerList.value = res.data
  })
}
/**
 * 抽屉组件
 * drawerShow 打开
 * onConfirm 确认
 * onCancle 取消
 */
const visible = ref(false)
const drawerShow = () => {
  visible.value = true
  isEdit.value = false
  article_id.value = ''
  article_title.value = ''
  tempUrl.value = ''
  file.value = ''
  value.value = ''
}
const img = ref(null)
const onConfirm = async () => {
  if (isEdit.value) {
    console.log('edit')
    if (file.value === '') {
      editBanner()
    } else {
      img.value = await uploadImg()
      try {
        editBanner()
      } catch (error) {
        console.log(error)
      }
    }
    return
  }
  img.value = await uploadImg()
  try {
    addBanner()
  } catch (error) {
    console.log(error)
  }
}
const onCancle = () => {
  console.log('cancel')
  visible.value = false
}
/**
 * 文章选择器
 */
const value = ref()
const options = ref([])
const article_id = ref(Number)
const article_title = ref(String)

// 选择后的回调
const selected = (e, option) => {
  article_id.value = Number(option.value)
  article_title.value = option.label
  value.value = option.value
}
// 打开选择器
const openSelect = () => {
  if (isEdit.value) {
    api.getArticleList().then(res => {
      console.log(res)
      options.value = res.data.map(item => {
        if (item.title === value.value || item.isbanner === 1) {
          return {
            label: item.title,
            value: item.id,
            disabled: true
          }
        }
        return {
          label: item.title,
          value: item.id
        }
      })
    })
  } else {
    api.getArticleList().then(res => {
      console.log(res)
      options.value = res.data.map(item => {
        if (item.title === value.value || item.isbanner === 1) {
          return {
            label: item.title,
            value: item.id,
            disabled: true
          }
        }
        return {
          label: item.title,
          value: item.id
        }
      })
    })
  }
}
/**
 * 上传图片
 */
const tempUrl = ref(null)
const file = ref('');
const uploadImgBtn = () => {
  document.getElementById('inputFile').click()
  inputFile.addEventListener('change', handleChange)
}
const handleChange = () => {
  const inputFile = document.getElementById('inputFile');
  file.value = inputFile.files
  // 临时图片地址
  const temporaryURL = URL.createObjectURL(inputFile.files[0]);
  tempUrl.value = temporaryURL;
}

const uploadImg = () => {
  return api.upload(file.value).then(res => {
    return res.data.url
  })
}
/**
 * Banner
 */
const addBanner = () => {
  api.addBanner({
    article_id: article_id.value,
    img: img.value,
    article_title: article_title.value
  }).then(res => {
    api.editArticle({
      id: article_id.value,
      isbanner: 1
    }).then(res => {
      visible.value = false
      getBannerList()
    })
  })
}
const delBanner = (item) => {
  api.deleteBanner({
    id: item.id
  }).then(res => {
    api.editArticle({
      id: item.article_id,
      isbanner: 0
    }).then(res => {
      console.log(res)
      visible.value = false
      getBannerList()
    })
  })
}
const isEdit = ref(false);
const banner_id = ref(0)
const editBannerBtn = (id) => {
  isEdit.value = true
  banner_id.value = id
  api.getBanner(id).then(res => {
    visible.value = true
    tempUrl.value = BaseUrl + res.data.img
    img.value = res.data.img
    value.value = res.data.article_title
    article_id.value = res.data.article_id
    article_title.value = res.data.article_title
  })
}
// 编辑banner
const editBanner = () => {
  api.editBanner({
    id: banner_id.value,
    article_id: article_id.value,
    img: img.value,
    article_title: article_title.value
  }).then(res => {
    api.editArticle({
      id: article_id.value,
      isbanner: 1
    }).then(res => {
      console.log(res)
      visible.value = false
      isEdit.value = false
      article_id.value = ''
      article_title.value = ''
      tempUrl.value = ''
      file.value = ''
      getBannerList()
    })
  })
}
</script>

<template>
  <div class="container">
    <div>
      <t-drawer destroyOnClose header v-model:visible="visible" @confirm="onConfirm" @cancel="onCancle" size="800px">
        <p class="drawerTitle">添加录播图</p>
        <p class="drawerItemTitle">选择文章</p>
        <n-select :options="options" placeholder="请选择文章" @focus="openSelect" @update:value="selected"
                  v-model:value="value"/>
        <p class="drawerItemTitle">上传图片</p>
        <div class="imgBox">
          <img :src="tempUrl" alt="" v-show="tempUrl !== ''">
          <div class="imgNone" v-show="tempUrl === ''">
            <img src="../assets/imgs/addImgIcon.png" alt="">
          </div>
          <input type="file" id="inputFile">
          <n-button type="primary" @click="uploadImgBtn">上传封面</n-button>
        </div>
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
        <ul class="listItem" v-for="item in bannerList" :key="item.id">
          <li>{{ item.id }}</li>
          <li>{{ item.article_id }}</li>
          <li>{{ item.article_title }}</li>
          <li>
            <img :src="BaseUrl + item.img" alt="">
          </li>
          <li>
<!--            <t-button theme="primary" style="margin-right: 20px;" @click="editBannerBtn(item.id)">编辑</t-button>-->
            <t-button theme="danger" @click="delBanner(item)">删除</t-button>
          </li>
        </ul>
        <div class="add">
          <img src="../assets/imgs/addIcon.png" alt="" @click="drawerShow" v-show="bannerList.length < 4">
          <img src="../assets/imgs/addIcon.png" style="opacity: 0.3;" alt="" v-show="bannerList.length >= 4">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#inputFile {
  position: absolute;
  opacity: 0;
}

.imgNone > img {
  width: 50px;
  height: 50px;
}

.imgNone {
  width: 100%;
  height: 350px;
  border: 1px solid rgb(233, 233, 233);
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgBox {
  display: flex;
  flex-direction: column;
  position: relative;
}

.imgBox > img {
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
}

.drawerItemTitle {
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 15px;
}

.drawerTitle {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.t-drawer {
  width: 1000px;
}

.add > img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.add {
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}

.listItem > li:nth-child(4) > img {
  width: 100px;
  height: 60px;
}

.listItem > li {
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

.listBoxTitle > li {
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
