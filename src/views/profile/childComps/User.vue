<template>
  <div id="user">
    <span class="iconfont consumer">&#xe643;</span>
    <div class="user-name">
      <div class="sign">登录/注册</div>
      <div class="phone">
        <span class="iconfont user-phone">&#xe90f;</span>
        <span class="bind">暂无绑定手机号</span>
      </div>
    </div>
    <span class="iconfont arrow right">&#xe60f;</span>
  </div>
</template>

<script>
	export default {
		
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
#user{
   background-color: var(--color-tint);
   padding: 15px;
   position: relative;
}
.consumer{
  font-size: 60px;
  background-color: #fff;
  border-radius:50% ;
}
.user-name{
  color: #fff;
}
.sign{
  position: absolute;
  top:30px;
  left: 80px;
}
.phone{
  position: absolute;
  top:60px;
  left: 75px;
  font-size: 16px;
}
.arrow{
  font-size: 30px;
  margin-top: -50px;
  color: #fff;
}

</style>
