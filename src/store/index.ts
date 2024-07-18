import { createPinia } from 'pinia'
import useLoginStore from './login/login'
const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'
pinia.use(piniaPluginPersistedstate)
function registerStore(app: App<Element>) {
  // 1.use的pinia
  app.use(pinia)

  // 2.加载本地的数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
