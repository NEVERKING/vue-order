import {
  ADD_FOOD,
  SET_VALUE,
  RESET_STORE,
  UPDATE_CAR,
  ADD_CAR,
  CLEAR_DISHES } from '../actionTypes'
import {
  deleteAllCartApi,
  addCartApi,
  updateCartApi } from '@/api'
import {
  Confirm,
  // Alert,
  Toast
  // Notify,
  // Loading
} from 'vue-ydui/dist/lib.rem/dialog'

const HomePage = {
  state: {
    showCar: false,
    showDetail: false,
    dishes: 1,
    myShopCar: []
  },
  mutations: {
    [ADD_FOOD] (state, { text, isError, isShow, time = 1500 }) {
      // state.isShow = isShow
      // state.text = text
      // state.isError = isError
    },
    [SET_VALUE] (state, {key, value}) {
      console.log(key, value, './//////////')
      // 打开购物车
      state[key] = value
    },
    [RESET_STORE] (state) {
      state.showCar = false
      state.showDetail = false
    }
  },
  actions: {
    // 清除购物车
    [CLEAR_DISHES] ({state, commit, rootState}, tableId) {
      Confirm({
        title: '清空购物车',
        mes: '确定清空购物车吗?',
        opts: () => {
          deleteAllCartApi({tableId}).then((resp) => {
            Toast({
              mes: resp.data.msg,
              timeout: 1500,
              icon: 'success'
            })
            commit('SET_VALUE', {key: 'myShopCar', value: []})
          }).catch(() => {
            Toast({
              mes: '出错了',
              timeout: 1500,
              icon: 'error'
            })
          })
        }
      })
    },
    // 刷新购物车
    [UPDATE_CAR] ({state, commit, rootState}, {tableId}) {
      updateCartApi({tableId}).then(({data}) => {
        commit('SET_VALUE', {key: 'myShopCar', value: data.data})
      }).catch((err) => {
        console.log(err)
      })
    },
    // 加入（修改）购物车
    [ADD_CAR] ({state, commit, rootState}, {tableId, productId, amount, openId}) {
      addCartApi({tableId, productId, amount, openId}).then((resp) => {
        console.log(resp.data)
        Toast({
          mes: resp.data.msg,
          timeout: 1500,
          icon: 'success'
        })
        commit('SET_VALUE', {key: 'showDetail', value: false})
      }).catch((err) => {
        console.log(err)
        Toast({
          mes: '加入购物车失败',
          timeout: 1500,
          icon: 'error',
          callback: () => {
            console.log()
          }
        })
      })
    }

  }
}

export default HomePage
