<template>
  <div class="view-box">
    <div v-title="'排队详情'">
      <div class="order">
        <div style="padding-bottom: .2rem; border-bottom: 1px solid #f0f0f0;">
          <yd-icon size='.5rem' color='#16aa6b' name="checkoff"></yd-icon>
          <strong style="font-size: medium;text-align: center;">已取号</strong>
        </div>
        <div style="padding-top: .3rem">
          <h1 style="font-size: x-large">{{mapping[data.tableType]}}{{data.queueId}}</h1>
          <br/>
          <p class="time-info">排队开始时间: {{startTime}}</p>
          <p class="time-info">前面还有: {{data.waitNumber}}位</p>
        </div>
      </div>
      <div class="button">
        <yd-button @click.native="cancelQueue" size="large" type="primary">取消排号</yd-button>
      </div>
    </div>
  </div>
</template>
<script>
import {queueStatusApi, cancelQueueApi} from '@/api'
import moment from 'moment'

export default {
  data () {
    return {
      data: {},
      mapping: ['A', 'B', 'C', 'D'],
      startTime: ''
    }
  },
  created () {
    queueStatusApi().then(({data}) => {
      // 如果没有则进入排队界面
      if (data.code !== 0) this.$router.push({path: '/queue'})
      this.data = data.data
      this.startTime = moment(data.data.startTime).format('HH:MM')
    })
  },
  methods: {
    cancelQueue () {
      cancelQueueApi().then(({data}) => {
        this.$dialog.toast({
          mes: data.msg,
          timeout: 1500,
          icon: 'success'
        })
        this.$router.push({path: '/queue'})
      })
    }
  }
}
</script>
<style scoped>
  .view-box {
    width: 100%;
  }

  .order {
    width: 70%;
    margin: 1rem auto auto;
    padding: .3rem 0 .4rem 0;
    background-color: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 6px;
  }

  .order h1 {
    font-size: .4rem;
  }

  .button {
    padding: .6rem .4rem;
  }

  .view-box {
    text-align: center;
    padding: .6rem .4rem .6rem .4rem;
    background-color: #f5f5f5;
    border-bottom: 0 solid #f0f0f0;
    margin-bottom: 0;
  }

  .time-info {
    font-size: 13px;
    text-align: left;
    padding: .1rem .2rem 0;
  }
</style>
