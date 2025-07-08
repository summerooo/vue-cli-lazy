
import proxyApi from '@/dev.js'
const { socket } = proxyApi

export class WebSocketService {
  constructor(options = {}) {
    this.options = options
    this.socket = null
    this.reconnectAttempts = 0
    this.MAX_RECONNECT_ATTEMPTS = 99
    this.HEARTBEAT_INTERVAL = 30000
    this.heartbeatTimer = null
    this.reconnectTimer = null
    this.connect()
  }

  connect() {
    this.socket = new WebSocket(socket)

    this.socket.onopen = () => {
      this.reconnectAttempts = 0
      console.log('WebSocket 连接已建立')
      this.startHeartbeat()
      this.options.onOpen && this.options.onOpen()
    }

    this.socket.onmessage = (event) => {
      console.log('收到消息:', event.data)
      if (event.data == 'pong') return this.receivePong()
      this.options.onMessage && this.options.onMessage(event.data)
    }

    this.socket.onclose = () => {
      console.log('WebSocket 连接已关闭')
      this.stopHeartbeat()
      this.options.onClose && this.options.onClose()
      this.attemptReconnect()
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket 错误:', error)
      this.options.onError && this.options.onError(error)
    }
  }

  startHeartbeat() {
    if (!this.heartbeatTimer) {
      this.heartbeatTimer = setInterval(() => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.isAlive = false
          this.sendPing()
        }
      }, this.HEARTBEAT_INTERVAL)
    }
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  sendPing() {
    this.socket.send('ping')
    setTimeout(() => {
      if (!this.isAlive) {
        console.warn('WebSocket 心跳失败，尝试重新连接...')
        this.socket.close()
      }
    }, this.HEARTBEAT_INTERVAL / 2)
  }

  receivePong() {
    this.isAlive = true
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++
      console.log(`尝试重新连接 (${this.reconnectAttempts})...`)
      this.reconnectTimer = setTimeout(() => {
        this.connect()
      }, 1000 * this.reconnectAttempts)
    } else {
      console.error('达到最大重新连接次数')
    }
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message))
      this.options.onSend && this.options.onSend(message)
    } else {
      console.error('WebSocket 未连接，无法发送消息')
    }
  }

  close() {
    this.stopHeartbeat()
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }
}
