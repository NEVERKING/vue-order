<template>
    <div v-title="'在线预约'" class="cell-box">
        <h3 v-if="queryData.reservationId&&queryData.reservationState<2" class="header"><yd-icon size='.5rem' color='#16aa6b' name="checkoff"></yd-icon>
          已预约
        </h3>
        <h3 v-if="!queryData.reservationId" class="header"><yd-icon size='.5rem' color='#16aa6b' name="clock"></yd-icon>
          申请预约
        </h3>
        <h3 v-if="queryData&&queryData.reservationState>1" class="header"><yd-icon size='.5rem' color='#FF685D' name="warn-outline"></yd-icon>
          预约已失效
        </h3>
        <yd-cell-group>
            <yd-cell-item>
              <span slot="left">店铺名称：</span>
              <span slot="right">{{shopTitle}}</span>
            </yd-cell-item>
            <yd-cell-item>
              <span slot="left">预约时间：</span>
              <span slot="right">{{queryData.reservationDay}} {{queryData.reservationTime && queryData.reservationTime.slice(0, 5)}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">预约人数：</span>
                <span slot="right">
                  <yd-spinner v-if="!queryData.reservationId" min="1" unit="1" v-model="people"></yd-spinner>
                  <span v-if="queryData.reservationId">{{queryData.peopleNumber}} 位</span>
                </span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机：</span>
                <input v-if="!queryData.reservationId" slot="right" v-model="phone" type="number" placeholder="请输入手机号">
                <span v-if="queryData.reservationId" slot="right">{{queryData.phone}}</span>
            </yd-cell-item>
            <yd-cell-item v-if="queryData.reservationId">
              <span slot="left">预约状态：</span>
              <span slot="right">{{status[queryData.reservationState]}}</span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-button v-if="!queryData.reservationId" @click.native="submitApply" class="button" size="large" type="danger">立即预约</yd-button>
        <yd-button v-if="queryData.reservationId&&queryData.reservationState<2" @click.native="cancleApply" class="button" size="large" type="danger">取消预约</yd-button>
    </div>
</template>
<script>
import { applyApi, getReservationInfoApi, cancelReservationApi, getSettingInfoApi } from '@/api'
export default {
  data () {
    return {
      queryData: {},
      shopTitle: '',
      people: 1,
      phone: '',
      status: ['等待确认', '商家已确认', '商家已取消', '已到店', '未到店']
    }
  },
  methods: {
    submitApply () {
      if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone))) {
        this.$dialog.notify({
          mes: '手机号码格式不正确',
          timeout: 3000
        })
      } else {
        applyApi({
          peopleNumber: this.people,
          phone: this.phone,
          reservationTimeId: this.queryData.reservationTimeId}).then(({data}) => {
          this.$dialog.toast({mes: data.msg, timeout: 1000})
          this.queryData = data.data
          this.$router.push({path: '/apply'})
        }).catch(err => {
          console.log(err)
        })
      }
    },
    cancleApply () {
      cancelReservationApi().then(({data}) => {
        this.$dialog.toast({mes: data.msg, timeout: 1000})
        this.$router.push({path: '/reservation'})
      })
    }
  },
  created () {
    if (this.$route.query.day) {
      this.queryData = this.$route.query
    } else {
      getReservationInfoApi().then(({data}) => {
        this.queryData = data.data
      })
    }
    getSettingInfoApi().then(({data}) => {
      this.shopTitle = data.data.shopName
    })
  }
}
</script>
<style scoped>
.cell-box {
    width: 100%;
}
.cell-box .button {
    width: 96%;
    margin: auto;
}
.status {
    background-color: #ffffff;
    padding: .2rem 0;
}
.header {
    font-size: medium;
    background-color: #ffffff;
    padding: .4rem 0;
    border-bottom: 1px solid #dedede;
}
</style>
