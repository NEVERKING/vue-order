import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Search from '@/components/Search'
import Order from '@/components/Order'
import SeatNumber from '@/components/SeatNumber'
import Queue from '@/components/Queue'
import ViewQueue from '@/components/ViewQueue'
import Reservation from '@/components/Reservation'
import Apply from '@/components/Apply'
import Success from '@/components/Success'
import OrderPay from '@/components/OrderPay'
import Pay from '@/components/Pay'

Vue.use(Router)

export default new Router({
  baseUrl: '/wechat/',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/seat',
      name: 'SeatNumber',
      component: SeatNumber
    },
    {
      path: '/queue',
      name: 'Queue',
      component: Queue
    },
    {
      path: '/view-queue',
      name: 'ViewQueue',
      component: ViewQueue
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    },
    {
      path: '/order-pay',
      name: 'OrderPay',
      component: OrderPay
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    }
  ]
})
