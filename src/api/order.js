import request from './index'
import { proxyApi } from '@/config'

const PREFIX = proxyApi.order

// 获取订单列表
export const getOrderList = params => request.get(`${PREFIX}/list`, { params })

// 获取订单详情
export const getOrderDetail = orderId => request.get(`${PREFIX}/detail/${orderId}`)
