<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登录人力资源管理系统</div>
    <div class="dashboard-sub-text">Hi hi，今天又是元气满满的一天呢！&nbsp;&nbsp;(づ￣ 3￣)づ</div>
    <div><img src="@/assets/toBeContinue.gif" class="gif" alt=""></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
    &-sub-text {
      color: #999;
      font-size: 16px;
      line-height: 46px;
    }
  }
  .gif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }
</style>
