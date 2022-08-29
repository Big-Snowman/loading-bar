import { createApp } from 'vue'
import App from './App.vue'

// 引入自定义进度条
import loadingBarVnode from './util/loadingBar'

// 路由中间件
// 导航前置守卫
router.beforeEach((to, from, next) => {
  // 调用自定义进度条开始方法
  loadingBarVnode.component?.exposed?.startLoading()
})

// 导航后置守卫
router.afterEach((to, from) => {
  // 调用自定义进度条结束方法
  loadingBarVnode.component?.exposed?.endLoading()
})

createApp(App).mount('#app')
