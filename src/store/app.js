import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    requestList: [],
  }),
  actions: {
    addCancel(cancel) {
      this.requestList.push(cancel)
    },
    clearRequests() {
      this.requestList.forEach(cancel => cancel())
      this.requestList = []
    }
  }
})
