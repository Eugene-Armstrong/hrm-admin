<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登录人力资源管理系统</div>
    <div class="dashboard-sub-text">Hi hi，今天又是元气满满的一天呢 (づ￣ 3￣)づ mua~</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
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
    font-size: 14px;
    line-height: 46px;
  }
}
</style>
