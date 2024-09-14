import { computed, reactive } from 'vue'
//test store
export const state = reactive({
  requestList: [],
  info: {},
  token: '',
})
export const mutations = {
  setState (data = {}) {
    const getTypeof = mutations.getTypeof
    for (let i in data) {
      if (getTypeof(state[i]) !== getTypeof(data[i])) {
        console.log(`state中${i}类型为${getTypeof(state[i])},传入值为${data[i]},请检查state中是否存在`)
        continue
      }
      state[i] = data[i]
      if (['[object Object]', '[object Array]'].includes(getTypeof(data[i]))) localStorage.setItem(i, JSON.stringify(data[i]))
      else localStorage.setItem(i, data[i])
    }
  },
  getState (data = []) {
    const getTypeof = mutations.getTypeof
    for (let i of data) {
      let item = localStorage.getItem(i)
      if (['[object Object]', '[object Array]'].includes(getTypeof(state[i]))) state[i] = item && JSON.parse(item) || state[i]
      else state[i] = item || state[i]
    }
  },
  getTypeof (data) {
    return Object.prototype.toString.call(data)
    // 基本数据类型都能返回相应的类型。
    // Object.prototype.toString.call(999) // "[object Number]"
    // Object.prototype.toString.call('') // "[object String]"
    // Object.prototype.toString.call(Symbol()) // "[object Symbol]"
    // Object.prototype.toString.call(42n) // "[object BigInt]"
    // Object.prototype.toString.call(null) // "[object Null]"
    // Object.prototype.toString.call(undefined) // "[object Undefined]"
    // Object.prototype.toString.call(true) // "[object Boolean]
    // 复杂数据类型也能返回相应的类型
    // Object.prototype.toString.call({a:1}) // "[object Object]"
    // Object.prototype.toString.call([1,2]) // "[object Array]"
    // Object.prototype.toString.call(new Date) // "[object Date]"
    // Object.prototype.toString.call(function(){}) // "[object Function]"
  }
}

// 默认计算store所有的值
export const mapState = (data = state) => {
  if (!Array.isArray(data)) data = Object.keys(data)
  let obj = {}
  for (let i of data) obj[i] = computed(() => state[i])
  return obj
}
export const mapMutations = (data = mutations) => {
  if (!Array.isArray(data)) data = Object.keys(data)
  let obj = {}
  for (let i of data) obj[i] = mutations[i]
  return obj
}
