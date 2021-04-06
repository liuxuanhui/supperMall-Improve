<template>
<div class="wrapper" ref="wrap">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    data() {
      return {
        scroll: null    
      }
    },
    props: {
      probeType: {    //由功能决定是否需要监听
        type:Number,
        default:0
      },
      pullUpLoad: {
        type:Boolean,
        default:false,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrap,{    
      //不宜通过new BScroll(document.querySelector('.wrapper')拿 怕其它元素也设置了wrapper属性
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.probeType,
      })

      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)   //发出去 谁想用谁用
    })
      this.scroll.on('pullingUp',() => {
        this.$emit('pullUpLoad')   
    })
  
    },
    methods:{
      refresh() {
        this.scroll && this.scroll.refresh() 
      }
    }
  }
</script>

<style scoped>

</style>