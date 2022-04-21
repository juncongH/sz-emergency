import { createApp } from 'vue'
import App from './App.vue'
import mitt from "mitt"
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app=createApp(App);
app.config.globalProperties.$bus=new mitt()
app.use(ElementPlus)
app.mount('#app')
