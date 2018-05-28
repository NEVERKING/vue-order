<template>
  <div style="width: 100%">
    <div v-title="'排队取号'" class="queue-box">
      <div style="background-color: #ffffff;">
        <h2 style="padding-top: .5rem;">排号</h2>
      </div>
      <hr style="height: 1px;border: 2px #d4d4d4;">
      <div>
        <yd-grids-group :rows="2" style="border: 2px #d4d4d4;">
          <div v-for='(item,key) in queues' :key='key'>
            <yd-grids-item v-for='(queue, key) in item' :key='key'>
            <span slot="text">
              <div @click="choiceTable(queue.tableType)">
                <h3>{{types[queue.tableType]}}桌</h3>
                <p>{{info[queue.tableType]}}</p>
                <p style="color: #808080">当前等待{{queue.peopleNumber}}桌</p>
              </div>
            </span>
            </yd-grids-item>
          </div>
        </yd-grids-group>
      </div>
    </div>
    <div style="margin-top: 1rem;width: 100%">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left" style="color:#808080">
            <yd-icon size='.4rem' color='#c9c9c9' name="question"></yd-icon>
            取号规则:
          </span>
          <span slot="right" style="color:#808080">{{data.queueDescription}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left" style="color:#808080">
            <yd-icon size='.4rem' color='#c9c9c9' name="phone2"></yd-icon>
            联系电话:
          </span>
          <span slot="right" style="color:#808080"><a :href="'tel:'+data.shopTel">{{data.shopTel}}</a></span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
  </div>
</template>
<script>
import {getSettingInfoApi, applyTableApi, queueApi} from '@/api'

export default {
  data () {
    return {
      queues: [],
      types: ['A', 'B', 'C', 'D'],
      info: ['1-2人', '3-4人', '5-8人', '8人以上'],
      data: {}
    }
  },
  methods: {
    choiceTable (tableType) {
      applyTableApi({tableType}).then(({data}) => {
        this.$dialog.alert({
          mes: data.msg,
          callback: () => {
            this.$router.push({path: '/view-queue'})
          }
        })
      }).catch(() => {
        this.$dialog.toast({
          mes: '出错了',
          timeout: 1500,
          icon: 'error'
        })
      })
    }
  },
  created () {
    getSettingInfoApi().then(({data}) => {
      this.data = data.data
    }).catch(err => {
      console.log(err)
    })
    queueApi().then(({data}) => {
      let newArr = []
      for (let index = 0; index < data.data.length; index += 2) {
        newArr = [...newArr, [data.data[index], data.data[index + 1]]]
      }
      this.queues = newArr
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .queue-box {
    width: 75%;
    margin: .8rem auto auto;
    border-bottom: 0;
  }

  .queue-box h2 {
    padding: 0 0 .6rem 0;
    font-size: .4rem;
  }

  .queue-box h3 {
    font-size: .38rem;
  }

</style>
