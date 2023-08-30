<script setup>
import {onMounted, ref} from "vue";
import {NButton} from "naive-ui";
import api from "../../API/api.js";
import {editorStore} from '../../store/index.js'

const editorstore = editorStore()
import config from '../config.js'

const BaseUrl = config.BASE_URL
/**
 * 抽屉组件
 */
const visible = ref(false);
const drawerShow = () => {
  visible.value = true;
  title.value = "";
  temUrl.value = "";
  imgs.value = "";
  editorstore.setVal("")
  isEdit.value = false
};
// 储存上传成功后的 图片地址
const imgs = ref('');
const onConfirm = async () => {
  if (isEdit.value) {
    if (file.value === '') {
      updataArticle();
    } else {
      const res = await api.upload({
        file: file.value,
      })
      imgs.value = res.data.url;
      updataArticle();
    }
  } else {
    const res = await api.upload({
      file: file.value,
    })
    imgs.value = res.data.url;
    addArticle()
  }
};
/**
 * 获取文章列表
 */
const getArticleList = () => {
  api.getArticleList().then(res => {
    articleList.value = res.data;
    temUrl.value = '';
    articleList.value.forEach(element => {
      element.createtime = element.createtime.split('T')[0];
      element.disabled = false;
      if (element.title === '关于我们' || element.isbanner === 1) {
        element.disabled = true;
      }
    });
  })
}

/**
 * 新增文章
 * temUrl 临时图片地址
 * updata 上传文件 选择文件模拟点击input
 * handleChange 上传文件改变
 * editor组件实例子
 */
const temUrl = ref('');
const file = ref('');
const title = ref('');
// 上传图片
const updata = () => {
  const inputfile = document.getElementById('inputfile');
  inputfile.click();
  inputfile.addEventListener('change', handleChange)
}
const handleChange = () => {
  const inputfile = document.getElementById('inputfile');
  file.value = inputfile.files
  // 临时图片地址
  const temporaryURL = URL.createObjectURL(inputfile.files[0]);
  temUrl.value = temporaryURL;
}
const addArticle = () => {
  api.addArticle({
    title: title.value,
    imgs: imgs.value,
    content: editorstore.val,
  }).then(res => {
    getArticleList();
    editorstore.setVal('')
    visible.value = false;
  })
}
//加载页面时候 获取文章列表
const articleList = ref([]);
onMounted(() => {
  getArticleList();
})
// 删除文章
const deleteArticle = id => {
  api.deleteArticle({
    id,
  }).then(res => {
    getArticleList();
  })
}
// 编辑文章
const isEdit = ref(false);
const article_id = ref(0);
const editArticle = id => {
  isEdit.value = true;
  article_id.value = id;
  // 获取到文章详情
  api.getArticleList(id)
      .then(res => {
        title.value = res.data.title;
        temUrl.value = BaseUrl + res.data.imgs;
        imgs.value = res.data.imgs;
        editorstore.setVal(res.data.content)
        visible.value = true
      })
}
// 上传文章更新数据
const updataArticle = () => {
  api.editArticle({
    id: article_id.value,
    title: title.value,
    imgs: imgs.value,
    content: editorstore.val,
  }).then(res => {
    getArticleList();
    editorstore.setVal('')
    imgs.value = ''
    file.value = ''
    visible.value = false;
  })
}
</script>

<template>
  <div class="container">
    <div>
      <t-drawer destroyOnClose header v-model:visible="visible" @confirm="onConfirm" size="800px">
        <p style="color: #333; font-size: 20px">新增文章</p>
        <div class="inputBox">
          <div class="inputTitle">标题</div>
          <t-input clearable placeholder="请输入文字标题" v-model="title"/>
        </div>
        <div class="inputBox">
          <div class="inputTitle">上传文件封面</div>
          <div class="updataBox">
            <img :src="temUrl" alt="" v-show="temUrl !== ''">
            <input type="file" name="" accept="image/*" id="inputfile" style="opacity:0; position: absolute;">
            <n-button type="primary" @click="updata">选择封面</n-button>
          </div>
        </div>
        <div class="inputBox">
          <div class="inputTitle">文章内容</div>
          <Editor/>
        </div>
      </t-drawer>
    </div>
    <div class="infoBox">
      <div class="listBox">
        <div class="add">
          <img src="../assets/imgs/addIcon.png" alt="" @click="drawerShow"/>
        </div>
        <ul class="listBoxTitle">
          <li>ID</li>
          <li>文章名称</li>
          <li>文章封面</li>
          <li>浏览量</li>
          <li>发布日期</li>
          <li>操作</li>
        </ul>
        <ul class="listItem" v-for="item in articleList" :key="item.id">
          <li>{{ item.id }}</li>
          <li>{{ item.title }}</li>
          <li>
            <img :src="BaseUrl + item.imgs" alt=""/>
          </li>
          <li>{{ item.likes }}</li>
          <li>{{ item.createtime }}</li>
          <li>
            <t-button theme="primary" style="margin-right: 20px" @click="editArticle(item.id)">编辑</t-button>
            <t-button theme="danger" @click="deleteArticle(item.id)" :disabled="item.disabled">删除</t-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.updataBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.updataBox > .n-button {
  width: 100px;
}

.updataBox > img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.inputTitle {
  margin-bottom: 10px;
  font-size: 18px;
}

.inputBox {
  margin-top: 20px;
}

.add > img {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 10px;
}

.add {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0px;
  align-items: center;
}

.listItem > li:nth-child(3) > img {
  width: 50px;
  height: 50px;
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
