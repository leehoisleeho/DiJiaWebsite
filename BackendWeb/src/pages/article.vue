<script setup>
import { ref } from 'vue'
import Editor from '../components/Editor.vue';
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
      <t-drawer destroyOnClose header v-model:visible="visible" @confirm="onConfirm" size="800px">
        <p style="color: #333;font-size: 20px;">添加录播图</p>
        <div class="inputBox">
          <div class="inputTitle">标题</div>
          <t-input clearable placeholder="请输入文字标题" />
        </div>
        <div class="inputBox">
          <div class="inputTitle">上传文件封面</div>
          <t-upload action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
            allowUploadDuplicateFile draggable />
        </div>
        <div class="inputBox">
          <div class="inputTitle">文章内容</div>
          <Editor />
        </div>
      </t-drawer>
    </div>
    <div class="infoBox">
      <div class="listBox">
        <div class="add">
          <img src="../assets/imgs/addIcon.png" alt="" @click="drawerShow">
        </div>
        <ul class="listBoxTitle">
          <li>ID</li>
          <li>文章名称</li>
          <li>文章封面</li>
          <li>文章内容</li>
          <li>点赞数</li>
          <li>发布日期</li>
          <li>操作</li>
        </ul>
        <ul class="listItem">
          <li>1</li>
          <li>这是一个文章的标题</li>
          <li>
            <img src="../assets/imgs/backendLogin.png" alt="">
          </li>
          <li>
            <t-link underline theme="success"> 查看内容 </t-link>
          </li>
          <li>23</li>
          <li>2023-08-24</li>
          <li>
            <t-button theme="primary" style="margin-right: 20px;">编辑</t-button>
            <t-button theme="danger">删除</t-button>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<style scoped>
.inputTitle {
  margin-bottom: 10px;
  font-size: 18px;
}

.inputBox {
  margin-top: 20px;
}

.add>img {
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

.listItem>li:nth-child(3)>img {
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
