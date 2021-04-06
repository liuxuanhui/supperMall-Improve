<template>
  <div id="profile">
    <ProfileBar class="bar"><div slot="center">我的</div></ProfileBar>

    <!--1.单独封装一个组件: 利用slot知识点-->
    <User></User>

    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <div class="account">
      <div class="account-item">
        <span>0.00</span>元
        <p>我的余额</p>
      </div>
      <div class="account-item">
        <span>0</span>个
        <p>我的优惠</p>
      </div>
      <div class="account-item">
        <span>0</span>分
        <p>我的积分</p>
      </div>
    </div>

    <!--3.封装成一个整体-->
    <FunctionList></FunctionList>
  </div>
</template>

<script>
  import ProfileBar from 'components/common/navbar/NavBar.vue'

  import User from './childComps/User.vue'
  import FunctionList from './childComps/FunctionList.vue'

  export default {
    components:{
      ProfileBar,
      User,
      FunctionList
    },
  }
</script>

<style scoped>
#profile{
  background-color:#f2f2f2;
  height: 100vh;
}
.bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.account{
  display: flex;
}
.account-item{
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 18px;
  padding: 25px;
  margin-right: 1px;
  background-color: #fff;
}
.account-item span{
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
</style>
