import { createApp } from 'vue'
import './style.css'
import TDesign from 'tdesign-vue-next';
import router from '../router/index.js'; // 导入你的路由配置
import { createPinia } from 'pinia'
import App from './App.vue'

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
const app = createApp(App);
const pinia = createPinia()
app.use(TDesign);
app.use(router);
app.use(pinia)
app.mount('#app');