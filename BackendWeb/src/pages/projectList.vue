<script setup>
import { NButton, NInput } from 'naive-ui'
import { onMounted, ref } from 'vue'
import api from '../../API/api'
const BaseUrl = 'http://127.0.0.1:7001'
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
const icon_img = ref('')
const project_imgs = ref('')

// 打开抽屉
const visible = ref(false)
const showDrawer = () => {
  visible.value = true
}
// 确认抽屉
const onConfirm = async () => {
  addProject()
}
// 新增项目的方法
const addProject = async () => {
  icon_img.value = await uploadImg(file.value)
  const list = await uploadProjectImg()
  project_imgs.value = list.join(',')
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
const tempUrl = ref(null)
const file = ref(''); // 上传的文件
const updataIcon = () => {
  document.getElementById('iconInput').click()
  iconInput.addEventListener('change', handleChange)
}
const handleChange = () => {
  const iconInput = document.getElementById('iconInput');
  file.value = iconInput.files
  // 临时图片地址
  const temporaryURL = URL.createObjectURL(iconInput.files[0]);
  tempUrl.value = temporaryURL;
}

// 上传project图片的方法
const tempUrlList = ref([]) // 临时图片地址
const fileList = ref([]); // 上传的文件
const updataProjectImg = () => {
  document.getElementById('projectImgs').click()
  projectImgs.addEventListener('change', handleChangeProjectImg)
}
const handleChangeProjectImg = () => {
  const projectImgs = document.getElementById('projectImgs');
  fileList.value.push(projectImgs.files)
  // 临时图片地址
  const temporaryURL = URL.createObjectURL(projectImgs.files[0]);
  tempUrlList.value.push(temporaryURL);
}
// 删除项目
const deleteProject = (id) => {
  console.log(id)
  api.deleteProject(id).then(res => {
    // 获取最新的数据
    api.getProjectList().then(res => {
      projectList.value = res.data
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
        <div class="addIconImg" v-show="tempUrl === null">
          <img src="../assets/imgs/addImgIcon.png" alt="">
        </div>
        <img :src=tempUrl alt="" v-show="tempUrl !== null">
      </div>
      <p class="drawerItemTitle">项目介绍</p>
      <n-input v-model:value="Introduction" type="textarea" placeholder="请输入项目介绍" class="textarea" autosize />
      <p class="drawerItemTitle">我们能做什么</p>
      <n-input v-model:value="we_do" type="textarea" placeholder="我们能做什么？" class="textarea" autosize />
      <p class="drawerItemTitle">项目案例</p>
      <div class="projectImg">
        <input type="file" name="" id="projectImgs">
        <div class="projectImgBox">
          <div class="projectImgBoxItem" v-for="(item, index) in tempUrlList">
            <img :src="item" alt="">
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
        <ul class="listItem" v-for="(item, index) in projectList" :key="item.id">
          <li>{{ item.id }}</li>
          <li>
            <img :src="BaseUrl + item.icon_img" alt="">
          </li>
          <li>{{ item.name }}</li>
          <li>
            <t-button theme="primary" style="margin-right: 20px;">编辑</t-button>
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
  width: 100%;
  height: 100%;
}

.projectImgBoxItem {
  padding: 10px;
  width: 120px;
  height: 120px;
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