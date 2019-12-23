<template>
  <div class="all">
    <div>
      <tr v-for="(item, y) in map" :key="y">
        <td v-for="(x, i) in item" :key="map.length + i"
          :style="{'color': isMine(`${x}-${y}`) ? 'red' : ''}"
          :class="{'active': activeCoordinate[`${x}-${y}`]}"
          @click="clickCell(`${x}-${y}`)"
        >
        <!-- {{`${x}-${y}`}} -->
        <!-- {{activeCoordinate[`${x}-${y}`] ? coordinate[`${x}-${y}`] : ''}} -->
        {{coordinate[`${x}-${y}`]}}
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // row: [],
      // col: [],
      mine: 10,
      mineCoordinate: [],
      coordinate: {},
      activeCoordinate: {},
      map: []
    }
  },
  created() {
    this.init()
    console.log(this.coordinate)
  },
  methods: {
    async init() {
      for (let x = 0; x < this.mine; x++) {
        this.$set(this.map, x, [])
        for (let y = 0; y < this.mine; y++) {
          // 生成地图 [ [], [] ]
          this.map[x].push(y)
          // 生成地图坐标
          this.$set(this.activeCoordinate, `${x}-${y}`, false)
          this.$set(this.coordinate, `${x}-${y}`, '')
        }
      }
      // 埋波雷
      this.buriedMine()
      // 周围埋了几个雷
      for (let i in this.coordinate) {
        this.$set(this.coordinate, i, this.surroundingMinesCount(i))
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
        console.log(this.coordinate[cell], '?')
        if (this.coordinate[cell]) this.$set(this.activeCoordinate, cell, true )
        let xy = cell.split('-')
        for (let i = +xy[0] - 1; i <= +xy[0] + 1; i++) {
          for (let j = +xy[1] - 1; j <= +xy[1] + 1; j++) {
            console.log(this.coordinate[`${i}-${j}`] === '')
            if (!this.activeCoordinate[`${i}-${j}`] && !this.isMine(`${i}-${j}`)) {
              this.$set(this.activeCoordinate, `${i}-${j}`, true)
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
  }
}
</script>

<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  td {
    width: 33px;
    height: 33px;
    text-align: center;
    line-height: 33px;
    border: 1px solid gray;
    background: lightgray;
  }
  .active {
    background: lightcoral;
  }
}
</style>
