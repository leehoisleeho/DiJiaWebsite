<script setup>
import config from "../config.js";
const { BASE_URL } = config
import { ref ,onMounted} from 'vue'
import { get } from  '../../API/service.js'
const projectList = ref([])
import { useRoute, useRouter } from 'vue-router';
import { post } from '../../API/service.js'
onMounted(()=>{
  get('/h5/api/getProject').then(res=>{
    projectList.value = res.data
  })
})
 /**
 * 提交数据
 */
const projectname = ref('')
const username = ref('')
const phone = ref('')
const industry =ref('')
const industryList = ref([
    '金融服务行业','医疗保健行业',"制造业",'传统零售',"娱乐行业","教育行业","酒店",'房地产','其他'
])
const router = useRouter();
const submit = ()=>{
  const data = {
    projectname:projectname.value,
    username:username.value,
    phone:phone.value,
    industry:industry.value
  }
  post('/api/addContact',data).then(res=>{
    router.push('/success')
  })
}

</script>

<template>
  <div class="container">
    <div class="header">
      <div class="headerTitle">
        <img src="../../public/imgs/contactbg.jpg">
      </div>
    </div>
    <div class="formBox">
      <div class="formItem">
        <div class="formItemTitle">
          姓名 <span>*</span>
        </div>
        <div class="formItemdes">
          请填写真实有效的姓名，方便我们联系到你
        </div>
        <van-field v-model="username"  placeholder="请输入用户名" />
      </div>
      <div class="formItem">
        <div class="formItemTitle">
          联系方式 <span>*</span>
        </div>
        <div class="formItemdes">
          请填写真实有效的号码，方便我们联系到你
        </div>
        <van-field v-model="phone"  placeholder="请输入手机号" />
      </div>
      <div class="formItem">
        <div class="formItemTitle">
          合作项目 <span>*</span>
        </div>
        <div class="formItemdes">
          请填选择合作项目
        </div>
        <van-radio-group v-model="projectname">
          <van-radio :name="item.name" v-for="(item,index) in projectList" :key="item.id">{{item.name}}</van-radio>
        </van-radio-group>
      </div>
      <div class="formItem">
        <div class="formItemTitle">
          行业 <span>*</span>
        </div>
        <div class="formItemdes">
          请选择你的行业
        </div>
        <van-radio-group v-model="industry">
          <van-radio :name="item" v-for="(item,index) in industryList" :key="item">{{item}}</van-radio>
        </van-radio-group>
      </div>
      <t-button  theme="primary" block @click="submit">提交</t-button>
    </div>
  </div>
</template>

<style scoped>
.van-icon{
  font-size: 50px;
}
.van-radio{
  height: 80px;
  font-size: 30px;
  display: flex;
  align-items: center;
}
.van-picker{
  font-size: 30px;
}
.container{
  font-size: 20px;
  padding-bottom: 50px;
}

.van-field{
  border: 1px solid #e3e3e3;
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 25px;
}
.t-button{
  padding: 40px;
  font-size: 30px;
}
.formItemdes{
  color: #666666;
  font-size: 20px;
  padding: 10px 0;
}
.formItem{
  margin-bottom: 50px;
}
.formItemTitle> span{
  color: red;
}
.formItemTitle{
  font-size: 30px;
}
.formBox{
  padding: 0 30px;
}
.headerTitle>img{
 width: 100vw;
}
.header{
  margin-bottom: 30px;
}

</style>