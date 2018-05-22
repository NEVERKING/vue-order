<template>
  <yd-popup :close-on-masker='false' v-model='showCar' position='bottom' height='auto'>
    <yd-flexbox direction="vertical">
      <div class='header'>
        <h3>已选菜品</h3>
        <p class='clear' @click='clearDishes(tableId)'>
          <yd-icon name="delete" size='.4rem'></yd-icon>
          清除
        </p>
        <p class='close' @click='setValue({key: "showCar", value: false})'>
          <yd-icon name="error-outline" size='.4rem'></yd-icon>
          关闭
        </p>
      </div>
      <div class="box">
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
            <yd-spinner min="0" :longpress='false' unit="1"
                        @click.native="changeCount(item.productAmount, item.productId, item.cartId, item.tableId)"
                        v-model="item.productAmount"></yd-spinner>
          </yd-flexbox-item>
        </yd-flexbox>
      </div>
    </yd-flexbox>
  </yd-popup>
</template>
<script>
import {mapMutations, mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      spinner: 0,
      tableId: 37
    }
  },
  computed: {
    ...mapState({
      showCar: state => state.HomePage.showCar,
      myShopCar: state => state.HomePage.myShopCar
    })
  },
  methods: {
    ...mapMutations({
      setValue: 'SET_VALUE',
      resetStore: 'RESET_STORE'
    }),
    ...mapActions({
      clearDishes: 'CLEAR_DISHES',
      changeCar: 'ADD_CAR',
      deleteCart: 'DELETE_CARINFO'
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
    }
  },
  beforeDestroy: function () {
    this.resetStore()
  }
}
</script>
<style scoped>
  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .header {
    background-color: #dedede;
    padding: .2rem 0;
    top: 0;
    left: 0;
    width: 100%;
  }

  .header .clear {
    position: absolute;
    top: .15rem;
    right: .15rem;
  }

  .header .close {
    position: absolute;
    top: .15rem;
    left: .15rem;
  }

  .count-box {
    padding: .21rem .4rem .21rem .4rem;
  }

  .box {
    width: 100%;
    overflow-y: auto;
    height: 7rem;
  }

  .name {
    color: #4c4c4c;
  }

  .count-info {
    line-height: .2rem;
    font-size: .26rem;
    color: #808080;
  }
</style>
