<script setup>
import { NButton, NInput } from 'naive-ui'
import { onMounted, ref } from 'vue'
import api from '../../API/api'
import config from "../config.js"
const BaseUrl = config.BASE_URL
const projectList = ref([])

onMounted(() => {
  api.getProjectList().then(res => {
    projectList.value = res.data
  })
})
/**
 * 数据
 */
const name = ref('')
const Introduction = ref('')
const we_do = ref('')
const icon_img = ref(null)
const project_imgs = ref('')
// 打开抽屉
const visible = ref(false)
const showDrawer = () => {
  isEdit.value = false
  visible.value = true
  // 打开抽屉时候初始化数据
  name.value = ''
  Introduction.value = ''
  we_do.value = ''
  icon_img.value = null
  project_imgs.value = null
  projectImgList.value = []
}
// 确认抽屉
const onConfirm = () => {
  if (isEdit.value) {
    editProject()
    return
  }
  addProject()
}
// 关闭抽屉
const onClose = () => {
  visible.value = false
}
const addProject = async () => {
  project_imgs.value = projectImgList.value.join(',')
  try {
    api.addProject({
      name: name.value,
      Introduction: Introduction.value,
      we_do: we_do.value,
      icon_img: icon_img.value,
      project_imgs: project_imgs.value
    }).then(res => {
      // 获取最新的数据
      api.getProjectList().then(res => {
        projectList.value = res.data
      })
      visible.value = false
    })
  } catch (error) {
    console.log(error)
  }
}
// 上传图片的方法
const uploadImg = (file) => {
  return api.upload(file).then(res => {
    return res.data.url
  })
}
// 循环上传图片
const uploadProjectImg = () => {
  const promiseList = []
  fileList.value.forEach(item => {
    promiseList.push(api.upload(item).then(res => {
      return res.data.url
    }))
  })
  return Promise.all(promiseList)
}
// 取消抽屉
const onCancle = () => {
  console.log('cancel')
  visible.value = false
}
// 上传icon图片的方法
const updataIcon = () => {
  document.getElementById('iconInput').click()
  iconInput.addEventListener('change', handleChange)
}
const handleChange = async () => {
  const iconInput = document.getElementById('iconInput');
  icon_img.value = await uploadImg(iconInput.files)
}

// 上传project图片的方法
const updataProjectImg = () => {
  document.getElementById('projectImgs').click()
  projectImgs.addEventListener('change', handleChangeProjectImg)
}
const projectImgList = ref([])
const handleChangeProjectImg = async () => {
  const projectImgs = document.getElementById('projectImgs');
  let res = await uploadImg(projectImgs.files)
  projectImgList.value.push(res)
}
// 删除图片
const deleteImg = (index) => {
  projectImgList.value.splice(index, 1)
}

// 删除项目
const deleteProject = (id) => {
  api.deleteProject({id}).then(res => {
    // 获取最新的数据
    api.getProjectList().then(res => {
      projectList.value = res.data
    })
  })
}
// 编辑项目
const id = ref(null)
const isEdit = ref(false)
const editProjectBtn = (item) => {
  visible.value = true
  isEdit.value = true
  // 点击编辑时,把item数据赋值给表单
  id.value = item.id
  name.value = item.name
  Introduction.value = item.Introduction
  we_do.value = item.we_do
  icon_img.value = item.icon_img
  if(item.project_imgs===''){
    projectImgList.value = []
  }else {
    projectImgList.value = item.project_imgs.split(',')
  }
}
// 更新项目的方法
const editProject = () => {
  project_imgs.value = projectImgList.value.join(',')
  const data = {
    id: id.value,
    name: name.value,
    Introduction: Introduction.value,
    we_do: we_do.value,
    project_imgs: project_imgs.value,
    icon_img: icon_img.value
  }
  api.editProject(data).then(res => {
    api.getProjectList().then(res => {
      projectList.value = res.data
      visible.value = false
    })
  })
}
</script>
<template>
  <div class="container">
    <t-drawer destroyOnClose header v-model:visible="visible" @confirm="onConfirm" @cancel="onCancle" size="800px">
      <p class="drawerTitle">添加项目</p>
      <p class="drawerItemTitle">项目名</p>
      <n-input v-model:value="name" type="text" placeholder="项目名称" />
      <p class="drawerItemTitle">项目图标</p>
      <div class="iconImgBox" @click="updataIcon">
        <input type="file" id="iconInput" style="opacity: 0; position: absolute;">
        <div class="addIconImg" v-show="icon_img === null">
          <img src="../assets/imgs/addImgIcon.png" alt="">
        </div>
        <img :src="BaseUrl + icon_img"  v-show="icon_img !== null">
      </div>
      <p class="drawerItemTitle">项目介绍</p>
      <n-input v-model:value="Introduction" type="textarea" placeholder="请输入项目介绍" class="textarea" autosize />
      <p class="drawerItemTitle">我们能做什么</p>
      <n-input v-model:value="we_do" type="textarea" placeholder="我们能做什么？" class="textarea" autosize />
      <p class="drawerItemTitle">项目案例</p>
      <div class="projectImg">
        <input type="file" name="" id="projectImgs">
        <div v-show="projectImgList.length===0" style="margin-bottom: 20px">暂无案例图片</div>
        <div class="projectImgBox" v-show="projectImgList.length!==0">
          <div class="projectImgBoxItem" v-for="(item, index) in projectImgList" :key="index">
            <img :src="BaseUrl + item">
            <img src="../assets/imgs/delete_fill.png" alt="" class="_delImgIcon" @click="deleteImg(index)">
          </div>
        </div>
        <n-button type="primary" @click="updataProjectImg">上传图片</n-button>
      </div>
    </t-drawer>
    <div class="infoBox">
      <div class="listBox">
        <ul class="listBoxTitle">
          <li>ID</li>
          <li>ICON</li>
          <li>项目名</li>
          <li>操作</li>
        </ul>
        <ul class="listItem" v-for="( item, index ) in  projectList " :key="item.id">
          <li>{{ item.id }}</li>
          <li>
            <img :src="BaseUrl + item.icon_img" alt="">
          </li>
          <li>{{ item.name }}</li>
          <li>
            <t-button theme="primary" style="margin-right: 20px;" @click="editProjectBtn(item)">编辑</t-button>
            <t-button theme="danger" @click="deleteProject(item.id)">删除</t-button>
          </li>
        </ul>
        <div class="add">
          <img src="../assets/imgs/addIcon.png" alt="" @click="showDrawer">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#projectImgs {
  opacity: 0;
  position: absolute;
}

.projectImgBox {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.projectImgBoxItem>img {
  width: 150px;
  height: 150px;

}

.projectImgBoxItem {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

._delImgIcon {
  width: 25px !important;
  height: 25px !important;
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: pointer;
  box-shadow: none !important;
}

.textarea {
  height: 200px;
}

.addIconImg>img {
  width: 30px;
  height: 30px;
}

.addIconImg {
  width: 100px;
  height: 100px;
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.iconImgBox>img {
  width: 100px;
  height: 100px;

}

.iconImgBox {
  display: flex;
  width: 100px;
  height: 100px;
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
  width: 50px;
  height: 50px;
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