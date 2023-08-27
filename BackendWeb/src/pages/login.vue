<script setup>
import { ref } from 'vue';
// 引入router
import { useRouter } from 'vue-router';
const router = useRouter();
import api from '../../API/api.js';
/**
 * 登录
 * @param {*} account 账号
 * @param {*} password 密码
 * @param {*} login 登录
 * @param {*} token token
 * @param {*} code 状态码 
 * @param {*} res 返回的数据
 * @param {*} sessionStorage 存储token
 * @param {*} router 路由
 */
const account = ref('');
const password = ref('');
const login = () => {
  console.log(account.value, password.value)
  api.login({
    username: account.value,
    password: password.value
  }).then(res => {
    const token = res.token;
    let code = res.code;
    if (code === 0) {
      sessionStorage.setItem('token', token);
      router.push('/');
    } else if (code === 1) {
      console.log('登录失败')
    }
  })
}
</script>

<template>
  <div class="container">
    <div class="loginBox">
      <div>
        <div class="loginBox_itme">
          <img src="../assets/imgs/loginImg.png" alt="">
          <h3>登录 Login</h3>
          <div class="loginBox_itme_1">
            <t-input type="text" placeholder="请输入账号" style="margin-bottom: 20px;" v-model="account" />
            <t-input type="password" placeholder="请输入密码" v-model="password" />
            <t-button @click="login">登录</t-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-input {
  margin-top: 30px !important;
}

.loginBox_itme_1 {
  width: 300px;
  margin-top: 30px;
}

.loginBox_itme>h3 {
  margin-top: 20px;
  color: #585858;
  font-weight: 400;
  font-size: 30px;
}

.t-button {
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  font-size: 16px;
}

.loginBox_itme>img {
  width: 240px;
}

.loginBox_itme {
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
}

.loginBox>div:nth-child(1) {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(66, 133, 244, 0.5); */
}

.loginBox>div:nth-child(1)>img {
  width: 220px;
}

.loginBox>div:nth-child(2) {
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginBox>div {
  flex: 1;
}

.loginBox {
  width: 1000px;
  height: 600px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
}

.container {
  min-width: 1200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}</style>