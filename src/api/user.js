import request from './index'
import { proxyApi } from '@/config'

const PREFIX = proxyApi.user

// 登录
export const login = data => request.post(`${PREFIX}/auth/login`, data)

// 获取用户信息
export const getUserInfo = () => request.get(`${PREFIX}/info`)

// 更新用户信息
export const updateUserInfo = data => request.put(`${PREFIX}/info`, data)

// 退出登录
export const logout = () => request.post(`${PREFIX}/auth/logout`)
