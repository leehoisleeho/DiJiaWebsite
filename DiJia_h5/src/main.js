import { createApp } from 'vue'
import './style.css'
import router from '/router/index'; // 根据实际文件路径来导入路由
import App from './App.vue'

import 'vant/lib/index.css';
// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css';

createApp(App).use(router).mount('#app')
