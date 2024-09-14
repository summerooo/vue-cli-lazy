<template>
  <div class="all">
    <div class="content">
      <div class="tr" v-for="(item, y) in map"  >
        <div class="td" v-for="(x, i) in item" 
          :style="{'color': isMine(`${x}-${y}`) ? 'red' : ''}"
          :class="{'active': activeCoordinate[`${x}-${y}`]}"
          @click="clickCell(`${x}-${y}`)"
          >
          {{coordinate[`${x}-${y}`]}}
          <!-- v-text="coordinate[`${x}-${y}`]" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'
export default {
  data() {
    return {
      // row: [],
      // col: [],
      mine: 10,
      mineCoordinate: [],
      coordinate: {},
      activeCoordinate: {},
      map: [],
      itemRefs: []
    }
  },
  async created() {
    await nextTick()
    this.init()
  },
  methods: {
    setItemRef(el) {
      this.itemRefs.push(el)
    },
    async init() {
      for (let x = 0; x < this.mine; x++) {
        this.map[x] = []
        for (let y = 0; y < this.mine; y++) {
          // 生成地图 [ [], [] ]
          this.map[x].push(y)
          // 生成地图坐标
          this.activeCoordinate[`${x}-${y}`] = false
          this.coordinate[`${x}-${y}`] = ''
        }
      }
      // 埋波雷
      this.buriedMine()
      // 周围埋了几个雷
      for (let i in this.coordinate) {
        this.coordinate[i] = this.surroundingMinesCount(i)
      }
    },
    buriedMine () {
      this.mineCoordinate = []  
      for (let i = 0; i < this.mine; i++) {
        this.mineCoordinate.push(`${parseInt(this.mine * Math.random())}-${parseInt(this.mine * Math.random())}`)
      }
    },
    isMine (xy) {
      return this.mineCoordinate.includes(xy)
    },
    clickCell (xys) {
      if (this.isMine(xys)) return console.log('踩到了')
      let spread = cell => {
        // console.log(this.coordinate[cell], '?')
        if (this.coordinate[cell]) this.activeCoordinate[cell] = true
        let xy = cell.split('-')
        for (let i = +xy[0] - 1; i <= +xy[0] + 1; i++) {
          for (let j = +xy[1] - 1; j <= +xy[1] + 1; j++) {
            // console.log(this.coordinate[`${i}-${j}`] === '')
            if (!this.activeCoordinate[`${i}-${j}`] && !this.isMine(`${i}-${j}`)) {
              this.activeCoordinate[`${i}-${j}`] = true
              if (this.coordinate[`${i}-${j}`] === '') spread(`${i}-${j}`)
            }
          }
        }
      }
      spread(xys)
    },
    surroundingMinesCount (cell) {
      let xy = cell.split('-')
      let n = this.coordinate[cell] || ''
      for (let i = +xy[0] - 1; i <= +xy[0] + 1; i++) {
        for (let j = +xy[1] - 1; j <= +xy[1] + 1; j++) {
          if (this.isMine(`${i}-${j}`)) {
            n++
          }
        }
      }
      return n
    } 
  },
  mounted() {
    
  },
}
</script>

<style lang="less" scoped>
.all {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
  }
  .tr {
    display: block;
  }
  .td {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border: 1px solid gray;
    background: lightgray;
  }
  .active {
    background: lightblue;
  }
}
</style>
