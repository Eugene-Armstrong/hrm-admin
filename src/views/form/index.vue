<template>
  <div class="app-container">
    <div class="dashboard-text">To Be Continue ...</div>
    <div><img src="@/assets/happyboy.gif" class="emptyGif" alt=""></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
       margin: 30px;
     }
    &-text {
      text-align: center;
       font-size: 30px;
       line-height: 46px;
     }
    &-sub-text {
       color: #999;
       font-size: 16px;
       line-height: 46px;
    }
  }
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }
</style>

