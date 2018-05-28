<template>
    <yd-flexbox class="success">
        <div v-title="'订单提交成功'">
            <yd-icon size="1.6rem" color="#44c125" name="checkoff"></yd-icon>
            <h3>订单提交成功</h3>
            <p>您的点菜已经发送给餐厅服务员确认</p>
            <p class="tips">{{time}}s后进去订单页</p>
        </div>
    </yd-flexbox>
</template>
<script>
export default {
  data () {
    return {
      time: 3
    }
  },
  created () {
    setInterval(() => {
      this.time--
      if (this.time === 0) {
        // this.$router.push({path: '/'})
      }
    }, 1000)
  }
}
</script>
<style scoped>
.success {
    width: 100%;
    justify-content: center
}
.success .tips {
    color: #808080;
    padding-top: .24rem;
}
.success h3 {
    font-size: .4rem;
    padding-bottom: .2rem;
}
</style>
