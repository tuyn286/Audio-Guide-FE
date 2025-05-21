import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'
import VN from './locale/VN.json'
import EN from './locale/EN.json'

const app = createApp(App)

const i18n = createI18n({
  locale: localStorage.getItem('language') || 'VN',
  messages: {
    VN: VN,
    EN: EN,
  }
})

app.use(i18n)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
