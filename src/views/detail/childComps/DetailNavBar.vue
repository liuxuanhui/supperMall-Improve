<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">   <!--在div监听点击 能增大面积-->
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail-nav">
        <div v-for="(item,index) in titles" class="detail-item" 
        @click="detailClick(index)" :class="{activ:currentIndex===index}">
          {{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default{
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0,
      }
    },
    methods:{
      detailClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index);
      },
      backClick(){
        this.$router.back()   
      }
    },
  }
</script>

<style scoped>
.detail-nav{
  display: flex;
  font-size: 13px;
}
.detail-item{
  flex: 1;
}
.activ{
  color:var(--color-high-text);
}
.back img{
  vertical-align: middle;
  width: 12px;
  height: 12px;
}
</style>