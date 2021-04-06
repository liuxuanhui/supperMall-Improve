import Toast from './Toast.vue'
const obj = {}

obj.install = function(Vue) {    //install在执行的时候 默认传一个参数Vue
  const toastContrustor = Vue.extend(Toast) //创建组件构造器
  const toast = new toastContrustor()  //new的方式  根据组件构造器 可以创建出来一个组件对象
  toast.$mount(document.createElement('div')) //将组件对象，手动挂载到某一元素上
  document.body.appendChild(toast.$el)  //toast.$el对应的就是div
  Vue.prototype.$toast = toast; 
}

export default obj