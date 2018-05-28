<template>
<div class="button-box"  v-title="'选择就餐人数'">
    <h3>请选择就餐人数</h3>
    <yd-flexbox v-for="(item, key) in buttonList" :key="key">
        <yd-flexbox-item class="button-item" v-for="(button, key2) in item" :key="key2">
            <div :class="[button == checked ? 'button checked' : 'button']" @click="checkSeat(button)">{{button}}</div>
        </yd-flexbox-item>
    </yd-flexbox>
    <div class="click-button">
        <yd-button size="large" @click.native="checkOk" type="danger">确定</yd-button>
    </div>
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
                <yd-flexbox-item class="text-right">
                    <yd-button @click.native="inputNumber" type="danger">确 定</yd-button>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>
    </yd-popup>
</div>
</template>
<script>
import { choiceeatApi } from '@/api'
export default {
  data () {
    return {
      checked: 0,
      inpurtValue: '',
      show: false,
      tableId: '',
      buttonList: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, '...']
      ]
    }
  },
  methods: {
    checkSeat (value) {
      if (value === '...') {
        this.show = true
      }
      this.checked = value
    },
    checkOk () {
      if (this.checked === 0) return
      choiceeatApi({peopleNumber: this.checked}).then(({data}) => {
        this.$dialog.notify({
          mes: data.msg,
          timeout: 3000
        })
        this.$router.push({path: '/'})
      }).catch((err) => {
        console.log(err)
      })
    },
    inputNumber () {
      if (!this.inpurtValue) return
      choiceeatApi({peopleNumber: this.inpurtValue}).then(({data}) => {
        this.$dialog.notify({
          mes: data.msg,
          timeout: 3000
        })
        this.$router.push({path: '/'})
      }).catch((err) => {
        this.$dialog.notify({
          mes: err.response.msg,
          timeout: 3000
        })
      })
    }
  }
}
</script>
<style scoped>
    .button-box{
        width: 100%;
    }
    .button-box h3 {
        padding: 1.5rem 0 1rem 0;
        font-size: .4rem;
    }
    .button-item {
        padding: .2rem 0;
    }
    .button-box .button {
        padding: .16rem .3rem;
        border: 1px solid #dedede;
        background-color: #ffffff;
        width: 1.4rem;
        margin: auto;
        border-radius: 4px;
    }
    .click-button {
        margin: 1rem .2rem 0 .2rem;
    }
    .checked {
        border-color: #ef4f4f!important;
        color: #ef4f4f;
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
