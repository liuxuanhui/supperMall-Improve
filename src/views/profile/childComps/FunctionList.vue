<template>
  <div class="list">
    <div>
      <span class="iconfont image special">&#xe667;</span>
      <span class="word">我的消息</span>
    </div>
    <div>
      <span class="iconfont image special2">&#xe620;</span>
      <span class="word">积分商城</span>
    </div>
    <div>
      <span class="iconfont image special3">&#xe683;</span>
      <span class="word">会员卡</span>
    </div>
    <div>
      <span class="iconfont image special4">&#xe604;</span>
      <span class="word">联系我们</span>
    </div>
    <div>
      <span class="iconfont image special5">&#xe611;</span>
      <span class="word">设置</span>
    </div>
  </div>
</template> 

<script>
  export default{
  
  }
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';
  src: url('~assets/font/iconfont.eot');
  src: url('~assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
      url('~assets/font/iconfont.woff2') format('woff2'),
      url('~assets/font/iconfont.woff') format('woff'),
      url('~assets/font/iconfont.ttf') format('truetype'),
      url('~assets/font/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.list{
  margin-top: 20px;
  background-color: #fff;
}
.list div{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #f2f2f2;
  color: #000;
}
div span.image{
  padding-left: 15px;
}
div span.word{
  padding-left:15px;
}
.special2{
  color:#fc7b53;
}
.special3{
  color:#ffc636;
}
.special4{
  color:darkred;
}
.special5{
  color:#ff8198;
}

</style>