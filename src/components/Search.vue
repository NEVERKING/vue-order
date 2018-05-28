<template>
    <div class='flex-box'  v-title="'搜索菜品'">
        <yd-search v-model="value" placeholder="请输入菜品名或口味" cancel-text="确定" :on-cancel="submitHandler" :on-submit="submitHandler"></yd-search>
        <div :class="[list.length == 0 ? 'item-center list-box' : 'list-box']">
            <p v-if="list.length == 0" class="text-aligin:center">暂无数据</p>
            <yd-list :theme='3'>
                <yd-list-item v-for='product in list' :key='product.id'>
                  <img v-if="product.state === 0" slot='img' :src='product.icon' @click='showDetail(product)' />
                  <img v-if="product.state === 1" slot='img' :src='product.icon' />
                    <yd-list-other slot='other'>
                        <div style='width:100%'>
                            <div class='info'>
                                <p class='list-name'>{{product.name}}</p>
                                <p class='list-price'>¥{{product.price}}</p>
                            </div>
                          <button v-if="product.state === 0" @click='showDetail(product)' class='add-product'>添加</button>
                          <button v-if="product.state === 1" class='disabled-product'>告罄</button>
                        </div>
                    </yd-list-other>
                </yd-list-item>
            </yd-list>
        </div>
        <div class='footer-car'>
            <yd-flexbox class='button-info'>
                <yd-flexbox-item class='shop-car'>
                        <span @click='showShopCar'>
                        <yd-icon name='order'></yd-icon>
                        <span>已点了{{myShopCar.length}}个菜</span>
                        </span>
                </yd-flexbox-item>
                <yd-flexbox-item class='text-right'>
                    <yd-button @click.native="linkOrder" type='danger'>选好了</yd-button>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>
        <yd-backtop></yd-backtop>
        <show-detail :productDetail= 'productDetail' ></show-detail>
        <show-car></show-car>
    </div>
</template>

<script>
import { searchApi, webSocketApi } from '@/api'
import ShowDetail from './ShowDetail'
import ShowCar from './ShowCar'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      list: [],
      productDetail: {},
      visible: false,
      value: ''
    }
  },
  components: {
    ShowDetail,
    ShowCar
  },
  created () {
    webSocketApi()
    // 获取购物车信息
    this.refreshCar()
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
      refreshCar: 'UPDATE_CAR'
    }),
    submitHandler () {
      this.$dialog.loading.open('正在搜索')
      searchApi({name: this.value})
        .then(({ data }) => {
          this.list = data.data
          this.$dialog.loading.close()
        })
        .catch(err => {
          console.log(err)
          this.$dialog.loading.close()
        })
        // this.$dialog.toast({mes: `搜索：${value}`});
    },
    showDetail (productDetail) {
      this.setValue({ key: 'showDetail', value: true })
      this.productDetail = productDetail
    },
    showShopCar () {
      this.refreshCar()
      this.setValue({ key: 'showCar', value: true })
    },
    beforeDestroy: function () {
      this.resetStore()
    },
    linkOrder () {
      this.$router.push({path: '/order'})
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  padding: 0.15rem 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.list-name {
  color: #4c4c4c;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.list-price {
  text-align: left;
}
.add-product {
  display: block;
  text-align: center;
  width: 100%;
  border: 1px solid #ef4f4f;
  padding: 0.1rem 0;
  border-radius: 4px;
  color: #ef4f4f;
}
.disabled-product {
  display: block;
  text-align: center;
  width: 100%;
  border: 1px solid #808080;
  padding: 0.1rem 0;
  border-radius: 4px;
  color: #808080;
}
.info {
  height: 0.8rem;
}
.shop-car {
  color: #ef4f4f;
  font-size: 0.34rem;
  text-align: left;
}
.text-right {
  text-align: right;
}
.list-box {
  overflow-y: auto;
  flex: 1;
}
.item-center {
    align-content: center;
    justify-content: center;
}
.flex-box {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.footer-car {
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 0.15rem 0.4rem;
  border-top: 1px solid #dedede;
}
</style>
