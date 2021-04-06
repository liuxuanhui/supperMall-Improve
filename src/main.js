import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast/index.js'

import FastClick from 'fastclick'        //解决300ms延迟  详见通过项目我学习到了什么中的小细节
import VueLazyLoad from 'vue-lazyload'  //图片懒加载      详见通过项目我学习到了什么中的小细节

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()  //添加事件总线对象

Vue.use(toast)      //安装toast插件(自己手写的)  use本质上会去调用toast的install  所以我们搞一个obj.install函数

FastClick.attach(document.body)    

Vue.use(VueLazyLoad,{     
  loading:require('./assets/img/common/placeholder.png')
  //该项目中我在components/conent/goods/GoodsListItem 用了图片懒加载
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
