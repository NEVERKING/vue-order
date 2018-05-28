<template>
    <yd-flexbox class="order-box" direction="vertical">
        <div class="base-info"  v-title="'确认订单'">
            <h3>桌号:{{mapping[orderData.tableType]}}{{orderData.tableId}}</h3>
            <p>菜品种类:{{myShopCar.length}}种</p>
            <yd-flexbox class="edit-box" direction="horizontal">
                <yd-flexbox-item class="text-left">
                    <div>用餐人数: {{orderData.peopleNumber}}人</div>
                    <!--<p style="line-height:.3rem">备注:少辣椒</p>-->
                </yd-flexbox-item>
                <yd-flexbox-item class="text-right">
                    <yd-button type="danger" @click.native="editNumber">编辑</yd-button>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>
        <yd-flexbox-item class="order-detail">
            <yd-flexbox class="footer" direction="horizontal">
                <yd-flexbox-item class="text-left">
                    <p>餐位费</p>
                    <p style="line-height: .2rem;color: #808080">¥3/位</p>
                </yd-flexbox-item>
                <yd-flexbox-item class="text-right" style="font-size: .46rem;">
                    x {{orderData.peopleNumber}}
                </yd-flexbox-item>
            </yd-flexbox>
            <yd-flexbox v-for='(item, key) in myShopCar' :key="key" class='count-box'>
                <yd-flexbox-item class='text-left'>
                    <yd-flexbox>
                        <yd-flexbox-item>
                            <div style="width: .8rem;height: .8rem;overflow: hidden;border-radius: 999px">
                                <img width="100%" :src="item.headImgUrl"/>
                            </div>
                        </yd-flexbox-item>
                        <yd-flexbox-item>
                            <p class='name' @click='setValue("showCar", false)'>{{item.productName}}</p>
                            <p class='count-info'>¥{{item.productPrice}}/份</p>
                        </yd-flexbox-item>
                    </yd-flexbox>
                </yd-flexbox-item>
                <yd-flexbox-item class='text-right'>
                    <yd-spinner min="0" @click.native="changeCount(item.productAmount, item.productId, item.cartId)" :longpress='false' unit="1" v-model="item.productAmount"></yd-spinner>
                </yd-flexbox-item>
            </yd-flexbox>
        </yd-flexbox-item>
        <yd-flexbox class="footer" direction="horizontal">
            <yd-flexbox-item @click.native="dishes" class="add-dishes">
                加菜
            </yd-flexbox-item>
            <yd-flexbox-item @click.native="getOrder" class="creat-order">
                去下单
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-popup v-model="show" position="center" width="90%">
            <div class="popup">
                <h2>请输入就餐人数</h2>
                <div class="input-box">
                    <input v-model="inpurtValue" autofocus placeholder="请输入就餐人数" />
                </div>
                <yd-flexbox class="button-info">
                    <yd-flexbox-item class="count">
                        <yd-button @click.native="show = false" >关 闭</yd-button>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <yd-button @click.native="inputNumber" type="danger">确 定</yd-button>
                    </yd-flexbox-item>
                </yd-flexbox>
            </div>
        </yd-popup>
    </yd-flexbox>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { placeApi, getOrderApi, updateSeatApi, webSocketApi } from '@/api'
export default {
  data () {
    return {
      show: false,
      inpurtValue: '',
      orderData: {},
      mapping: ['A', 'B', 'C', 'D'],
      status: ['已下单', '已下厨', '已上菜'],
      total: 0
    }
  },
  computed: {
    ...mapState({
      showCar: state => state.HomePage.showCar,
      myShopCar: state => state.HomePage.myShopCar
    })
  },
  created () {
    webSocketApi(() => {
      this.refreshCar()
    })
    // 获取购物车信息
    this.refreshCar()
    // 订单购物车信息
    getOrderApi().then(({data}) => {
      console.log(data.data)
      this.orderData = data.data
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
    changeCount (amount, productId, cartId) {
      if (amount === 0) {
        this.deleteCart({productId, cartId})
      } else {
        this.changeCar({
          productId,
          amount
        })
      }
    },
    editNumber () {
      this.show = true
    },
    inputNumber () {
      if (!this.inpurtValue) return
      updateSeatApi({peopleNumber: this.inpurtValue}).then(({data}) => {
        this.$dialog.notify({
          mes: data.msg,
          timeout: 3000
        })
        this.show = false
        getOrderApi().then(({data}) => {
          console.log(data.data)
          this.orderData = data.data
        })
      }).catch((err) => {
        this.$dialog.notify({
          mes: err.response.msg,
          timeout: 3000
        })
      })
    },
    dishes () {
      this.$router.push({path: '/'})
    },
    getOrder () {
      placeApi().then(({data}) => {
        if (data.code === 0) {
          this.$router.push({path: '/order-pay'})
        } else {
          this.$dialog.toast({mes: data.msg, timeout: 1000})
        }
      }).catch(err => {
        console.log(err)
      })
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
        padding: .4rem .4rem .5rem .4rem;
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
        border-top: 1px solid #dedede;
    }
    .count-box {
        padding: .21rem 0 .21rem 0
    }
    .name {
        color: #4c4c4c;
    }
    .count-info {
        line-height: .2rem;
        font-size: .26rem;
        color: #808080;
    }
    .popup{
        background-color: #ffffff;
    }
    .popup h2 {
        padding: .2rem 0;
    }
    .input-box {
        padding: .2rem .4rem;
    }
    .input-box input {
        border: 1px solid #dedede;
        height: .8rem;
        padding: .1rem .2rem .1rem .2rem;
    }
    .button-info {
        padding: .2rem .4rem .6rem .4rem;
    }
</style>
