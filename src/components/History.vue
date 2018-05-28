<template>
  <div class="order">
    <div v-title="'历史订单'">
      <div>
        <h3 style="text-align:center; padding-top: .5rem; font-size: .4rem"><yd-icon name="order" size='.4rem' color='#9c9c9c'></yd-icon>历史订单</h3>
      </div>
      <div style="padding-top: .3rem">
        <p v-if="total.length == 0" style="text-align:center; padding-top: 2rem; font-size: .3rem">您没有历史订单</p>
        <yd-accordion>
          <yd-accordion-item v-for="orders in total" :key="orders.id"
                             :title="date + getDate(orders.createTime) + amount + orders.orderMoney">
            <yd-flexbox style="font-size:larger; padding-top: .2rem; padding-bottom: .2rem">
              <yd-flexbox-item>菜品名称</yd-flexbox-item>
              <yd-flexbox-item>数量</yd-flexbox-item>
              <yd-flexbox-item>单价</yd-flexbox-item>
            </yd-flexbox>
            <p v-for="details in orders.orderDetailList" :key="details.id">
              <yd-flexbox style="padding-top: .1rem; padding-bottom: .1rem">
                <yd-flexbox-item>{{details.productName}}</yd-flexbox-item>
                <yd-flexbox-item>{{details.productAmount}}</yd-flexbox-item>
                <yd-flexbox-item>¥ {{details.productPrice}}</yd-flexbox-item>
              </yd-flexbox>
            </p>
          </yd-accordion-item>
        </yd-accordion>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {listApi} from '@/api'

export default {
  data () {
    return {
      total: [1],
      date: '用餐日期：',
      amount: '消费金额：￥'
    }
  },
  created () {
    listApi().then(({data}) => {
      this.total = data.data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    getDate (createTime) {
      return createTime.substring(0, 10)
    }
  }
}
</script>

<style scoped>
  .order {
    width: 100%
  }
</style>
