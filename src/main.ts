import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import './assets/css/index.less'
import router from './router'
import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

window.addEventListener('storage', function (e) {
  if (e.key && e.oldValue) localStorage.setItem(e.key, e.oldValue)
})
// app.use(ElementPlus)
app.use(pinia).use(router)
app.mount('#app')
