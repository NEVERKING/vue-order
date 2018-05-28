<template>
    <div v-title="'我的预约'" class="tab-box">
        <h3>
            <yd-icon name="time" size=".4rem"></yd-icon>
            <span>预约订座</span>
        </h3>
        <yd-tab>
            <yd-tab-panel label="今天">
                <yd-flexbox class="reservation-action" v-for="(array, ind) in today" :key="ind">
                    <yd-flexbox-item style="font-size: medium" v-for="(item, key) in array" :key="key" v-if="item.reservationTime">
                        <h3 v-if="item.reservationTimeSwitch" @click="linkPage(item, '今天')" :class="[key % 2 === 0 ? 'border-right': '']">{{item.reservationTime.substring(0,5)}}</h3>
                        <h3 v-if="!item.reservationTimeSwitch" style="color: #949494" :class="[key % 2 === 0 ? 'border-right': '']"><del>{{item.reservationTime.substring(0,5)}}</del></h3>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-tab-panel>
            <yd-tab-panel label="明天">
                <yd-flexbox class="reservation-action" v-for="(array, ind) in tomorrow" :key="ind">
                    <yd-flexbox-item style="font-size: medium" v-for="(item, key) in array" :key="key" v-if="item.reservationTime">
                      <h3 v-if="item.reservationTimeSwitch" @click="linkPage(item, '明天')" :class="[key % 2 === 0 ? 'border-right': '']" >{{item.reservationTime.substring(0,5)}}</h3>
                        <h3 v-if="!item.reservationTimeSwitch" style="color: #949494" :class="[key % 2 === 0 ? 'border-right': '']"><del>{{item.reservationTime.substring(0,5)}}</del></h3>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-tab-panel>
            <yd-tab-panel label="后天">
                <yd-flexbox class="reservation-action" v-for="(array, ind) in theDayAfterTomorrow" :key="ind">
                    <yd-flexbox-item style="font-size: medium" v-for="(item, key) in array" :key="key" v-if="item.reservationTime">
                        <h3 v-if="item.reservationTimeSwitch" @click="linkPage(item, '后天')" :class="[key % 2 === 0 ? 'border-right': '']">{{item.reservationTime.substring(0,5)}}</h3>
                        <h3 v-if="!item.reservationTimeSwitch" style="color: #949494" :class="[key % 2 === 0 ? 'border-right': '']"><del>{{item.reservationTime.substring(0,5)}}</del></h3>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-tab-panel>
        </yd-tab>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left" style="color:#808080">
                <yd-icon size='.4rem' color='#c9c9c9' name="phone2"></yd-icon>
                联系电话:
            </span>
            <span slot="right" style="color:#808080"><a :href="'tel:'+tel">{{tel}}</a></span>
          </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script type="text/babel">
import { reservationApi } from '@/api'
export default {
  data () {
    return {
      today: [],
      tomorrow: [],
      theDayAfterTomorrow: [],
      tel: ''
    }
  },
  methods: {
    modifyArr (arrData) {
      let newArr = []
      for (let index = 0; index < arrData.length; index += 2) {
        newArr = [...newArr, [arrData[index], arrData[index + 1] || {reservationTime: ''}]]
      }
      return newArr
    },
    linkPage ({reservationDay, reservationTime, reservationTimeId}, day) {
      this.$router.push({path: '/apply', query: {reservationDay, reservationTime, day, reservationTimeId}})
    }
  },
  created () {
    reservationApi().then(({data}) => {
      this.today = this.modifyArr(data.data.today)
      console.log(this.today)
      this.tomorrow = this.modifyArr(data.data.tomorrow)
      this.theDayAfterTomorrow = this.modifyArr(data.data.theDayAfterTomorrow)
      this.tel = data.data.tel
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
.tab-box {
    width: 100%;
}
.tab-box h3 {
    padding: .4rem 0;
    background-color: #ffffff;
    border-bottom: 1px solid #dedede;
}
.tab-box h3 span {
    font-size: .36rem;
}
.tab-box h2 {
    text-align: left;
    font-size: .4rem;
    padding: .2rem .4rem .2rem .4rem;
    background-color: #ffffff;
}
.border-right {
    border-right: 1px solid #dedede;
}
</style>
