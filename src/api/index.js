import axios from 'axios'

axios.defaults.baseURL = 'http://120.78.165.70'
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMjAxOCIsInVuaXF1ZV9uYW1lIjoiMjAxOCIsInVzZXJpZCI6IjIwMTgiLCJpc3MiOiJyZXN0YXBpdXNlciIsImF1ZCI6IjA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2IiwiZXhwIjoxNTI2OTYwNjEzLCJuYmYiOjE1MjY3ODc4MTN9.NhRUDwOLxuLLgUiAcR9cjZlqaeqGLNKnfqDGc0_dUZU'
const openId = 'oOojD1L0z3FdADqZKjv7Y7QV79Gc'
// const tableId= 37
// 查看商品列表
export const getProductListApi = () => {
  return axios.get('/customer/ordermeal/list')
}
// 获取最新的购物车信息
export const getCartInfoApi = () => {
  return axios.get('/customer/ordermeal/updateCart')
}
// 清除购物车
export const deleteAllCartApi = (params) => {
  return axios.post(`/customer/ordermeal/deleteAllCart?tableId=${params.tableId}`)
}
// 刷新购物车
export const updateCartApi = (params) => {
  return axios.get('/customer/ordermeal/updateCart', {params})
}
// 加入（修改）购物车
export const addCartApi = (params) => {
  return axios.post(`/customer/ordermeal/addCart?openId=${openId}&tableId=${params.tableId}&productId=${params.productId}&amount=${params.amount}`)
}
// 搜索菜品
export const searchApi = (params) => {
  return axios.get(`/customer/ordermeal/search?name=${params.name}`)
}
// 设置就坐的人数
export const choiceeatApi = (params) => {
  return axios.post(`/customer/ordermeal/seat?tableId=${params.tableId}&peopleNumber=${params.peopleNumber}`)
}
// 查看商家给出的预约信息
export const reservationApi = (params) => {
  return axios.get(`/customer/reservation/list`)
}
// 申请一个预约
export const applyApi = (params) => {
  return axios.post(`/customer/reservation/apply?openId=${openId}&reservationTimeId=${params.reservationTimeId}&peopleNumber=${params.peopleNumber}&phone=${params.phone}`)
}
// 查看我的预约
export const getReservationInfoApi = () => {
  return axios.get(`/customer/reservation/info?openId=${openId}`)
}
// 删除一条购物车信息
export const deleteCartApi = (params) => {
  return axios.post(`/customer/ordermeal/deleteCart?tableId=${params.tableId}&cartId=${params.cartId}`)
}
// 下单
export const placeApi = (params) => {
  return axios.post(`/customer/ordermeal/place?tableId=${params.tableId}`)
}
// 查看订单
export const getOrderApi = (params) => {
  return axios.get(`/customer/ordermeal/order?tableId=${params.tableId}`)
}
// 查看商家信息 //需要登录
export const getSettingInfoApi = (params) => {
  return axios.get(`/shop/setting/info`)
}
// 排队拿号
export const applyTableApi = ({tableType}) => {
  return axios.post(`/customer/queue/request?openId=${openId}&tableType=${tableType}`)
}
// 查看排队信息
export const queueStatusApi = () => {
  return axios.get(`/customer/queue/status?openId=${openId}`)
}
// 取消预约
export const cancelQueueApi = () => {
  return axios.post(`/customer/reservation/cancel?openId=${openId}`)
}
