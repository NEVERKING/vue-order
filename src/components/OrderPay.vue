<template>
  <yd-flexbox class="order-box" direction="vertical">
    <div class="base-info">
      <h3>桌号:{{mapping[data.tableType]}}{{data.tableId}}</h3>
    </div>
    <yd-flexbox-item class="order-detail">
      <yd-flexbox direction="horizontal">
        <yd-flexbox-item class="text-left">
          <h3>人数</h3>
          <p>{{data.peopleNumber}}人</p>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <h3>下单时间</h3>
          <p>{{time}}</p>
        </yd-flexbox-item>
        <yd-flexbox-item class="text-right">
          <h3>菜品数量</h3>
          <p>{{orderList.length}}份</p>
        </yd-flexbox-item>
      </yd-flexbox>
      <yd-flexbox class="detail" direction="horizontal">
        <yd-flexbox-item class="text-left">
          <div>菜品详情</div>
        </yd-flexbox-item>
      </yd-flexbox>
      <yd-flexbox class="order-list" v-for="(item, key) in orderList" :key="key" direction="horizontal">
      <yd-flexbox-item class="text-left">
          {{item.productName}}
      </yd-flexbox-item>
        <yd-flexbox-item>
            <yd-flexbox direction="horizontal">
            <yd-flexbox-item>
              x{{item.productAmount}}
            </yd-flexbox-item>
            <yd-flexbox-item>
              ¥{{item.productPrice}}
            </yd-flexbox-item>
            <yd-flexbox-item>
              {{status[item.orderDetailState]}}
           </yd-flexbox-item>
          </yd-flexbox>
      </yd-flexbox-item>
      </yd-flexbox>
    </yd-flexbox-item>
    <yd-flexbox class="footer" direction="horizontal">
      <yd-flexbox-item @click.native="dishes" class="add-dishes">
        加菜
    </yd-flexbox-item>
      <yd-flexbox-item @click.native="getOrder" class="creat-order">
        去买单
    </yd-flexbox-item>
    </yd-flexbox>
  </yd-flexbox>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import moment from 'moment'
import { getOrderApi, webSocketApi } from '@/api'
export default {
  data () {
    return {
      orderList: [],
      data: {},
      time: moment().format('YYYY-MM-DD HH:SS'),
      mapping: ['A', 'B', 'C', 'D'],
      status: ['已下单', '已下厨', '已上菜']
    }
  },
  computed: {
    ...mapState({
      showCar: state => state.HomePage.showCar
    })
  },
  created () {
    webSocketApi()
    // 获取购物车信息
    getOrderApi().then(({data}) => {
      this.orderList = data.data.orderDetailList
      this.data = data.data
    })
  },
  methods: {
    ...mapMutations({
      setValue: 'SET_VALUE',
      resetStore: 'RESET_STORE'
    }),
    ...mapActions({
      refreshCar: 'UPDATE_CAR',
      deleteCart: 'DELETE_CARINFO',
      changeCar: 'ADD_CAR'
    }),
    dishes () {
      this.$router.push({path: '/'})
    },
    getOrder () {
      this.$router.push({path: '/pay'})
    }
  }
}
</script>
<style scoped>
  .order-box {
    width: 100%;
    height: 100%;
  }
  .base-info h3 {
    font-size: .42rem;
    padding-top: .4rem;
  }
  .base-info p {
    color: #808080;
  }
  .base-info {
    width: 100%;
    background-color: #ffffff;
  }
  .edit-box {
    padding: .4rem .4rem .2rem .4rem;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .footer {
    width: 100%;
  }
  .add-dishes {
    padding: .24rem;
    background-color: #ffb400;
    color: #fff;
  }
  .creat-order {
    padding: .24rem;
    background-color: #ef4f4f;
    color: #fff;
  }
  .order-detail {
    overflow-y: auto;
    padding: .2rem .4rem;
    background-color: #ffffff;
  }
  .detail {
    border-bottom: 1px solid #ededed;
    padding-top: .4rem;
    padding-bottom: .2rem;
  }
  .order-list {
    padding: .3rem 0 .2rem 0;
  }
</style>
