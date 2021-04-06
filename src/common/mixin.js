import BackTop from 'components/content/backTop/BackTop.vue'
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  methods: {
    topClick() {  //点击返回顶部功能函数
      this.$refs.scroll.scroll.scrollTo(0,0,500) && this.$refs.scroll.scroll 
     /*第一个scroll是从ref拿的 第二个scroll是从Scroll组件中return过来的 
       scrollTo是第二个scroll自带的一个方法(该方法作用:返回到顶部 延时0.5s) 
       this.$refs.scroll.scroll  怕Scroll.vue中的scroll对象在mounted中还没初始化
      */ 
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000  //是否显示back-top按钮
    }
  }
}