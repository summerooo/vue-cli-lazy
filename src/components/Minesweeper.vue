<template>
  <div class="minesweeper">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-item">
        <span class="label">💣 剩余</span>
        <span class="value">{{ remainingMines }}</span>
      </div>
      <div class="status-item">
        <button class="reset-btn" @click="resetGame()">
          {{ isGameOver ? '🔄 再来一局' : '😀' }}
        </button>
      </div>
      <div class="status-item">
        <span class="label">🚩 标记</span>
        <span class="value">{{ flagCount }}</span>
      </div>
    </div>

    <!-- 提示消息 -->
    <div v-if="isGameOver" class="game-message" :class="gameState">
      {{ gameState === GameState.WON ? '🎉 恭喜通关！' : '💥 踩到地雷了！' }}
    </div>

    <!-- 难度切换 -->
    <div class="difficulty">
      <button
        v-for="d in difficulties"
        :key="d.label"
        class="diff-btn"
        :class="{ active: rows === d.size && mineCount === d.mines }"
        @click="resetGame(d.size, d.mines)"
      >
        {{ d.label }}
      </button>
    </div>

    <!-- 棋盘 -->
    <div class="board" :style="boardStyle">
      <div
        v-for="(cell, index) in flatGrid"
        :key="index"
        class="cell"
        :class="cellClass(cell)"
        @click="handleClick(cell.row, cell.col)"
        @contextmenu.prevent="handleRightClick(cell.row, cell.col)"
      >
        <span v-if="cell.isRevealed && cell.isMine">💣</span>
        <span v-else-if="cell.isFlagged">🚩</span>
        <span
          v-else-if="cell.isRevealed && cell.adjacentMines > 0"
          :class="`num-${cell.adjacentMines}`"
        >
          {{ cell.adjacentMines }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const GameState = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
}

const rows = ref(10)
const cols = ref(10)
const mineCount = ref(10)
const gameState = ref(GameState.PLAYING)
const grid = ref([])
const flagCount = ref(0)

const remainingMines = computed(() => mineCount.value - flagCount.value)
const isGameOver = computed(
  () => gameState.value === GameState.WON || gameState.value === GameState.LOST,
)

const difficulties = [
  { label: '初级 (8×8)', size: 8, mines: 10 },
  { label: '中级 (12×12)', size: 12, mines: 25 },
  { label: '高级 (16×16)', size: 16, mines: 50 },
]

function createCell() {
  return {
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 0,
  }
}

function initGrid() {
  const newGrid = []
  for (let r = 0; r < rows.value; r++) {
    const row = []
    for (let c = 0; c < cols.value; c++) {
      row.push(createCell())
    }
    newGrid.push(row)
  }
  grid.value = newGrid
}

function placeMines() {
  const totalCells = rows.value * cols.value
  const positions = Array.from({ length: totalCells }, (_, i) => i)

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }

  const minePositions = positions.slice(0, mineCount.value)
  for (const pos of minePositions) {
    const r = Math.floor(pos / cols.value)
    const c = pos % cols.value
    grid.value[r][c].isMine = true
  }
}

function forEachNeighbor(r, c, callback) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < rows.value && nc >= 0 && nc < cols.value) {
        callback(nr, nc)
      }
    }
  }
}

function calculateAdjacent() {
  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      if (grid.value[r][c].isMine) continue
      let count = 0
      forEachNeighbor(r, c, (nr, nc) => {
        if (grid.value[nr][nc].isMine) count++
      })
      grid.value[r][c].adjacentMines = count
    }
  }
}

function reveal(r, c) {
  const cell = grid.value[r][c]
  if (cell.isRevealed || cell.isFlagged) return

  cell.isRevealed = true

  if (cell.adjacentMines === 0 && !cell.isMine) {
    forEachNeighbor(r, c, (nr, nc) => {
      reveal(nr, nc)
    })
  }
}

function checkWin() {
  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      const cell = grid.value[r][c]
      if (!cell.isMine && !cell.isRevealed) return false
    }
  }
  return true
}

function revealAllMines() {
  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      if (grid.value[r][c].isMine) {
        grid.value[r][c].isRevealed = true
      }
    }
  }
}

function handleClick(r, c) {
  if (isGameOver.value) return

  const cell = grid.value[r][c]
  if (cell.isRevealed || cell.isFlagged) return

  if (cell.isMine) {
    gameState.value = GameState.LOST
    revealAllMines()
    return
  }

  reveal(r, c)

  if (checkWin()) {
    gameState.value = GameState.WON
  }
}

function handleRightClick(r, c) {
  if (isGameOver.value) return

  const cell = grid.value[r][c]
  if (cell.isRevealed) return

  cell.isFlagged = !cell.isFlagged
  flagCount.value += cell.isFlagged ? 1 : -1
}

function resetGame(size, mines) {
  if (size) rows.value = size
  if (mines) mineCount.value = mines
  gameState.value = GameState.PLAYING
  flagCount.value = 0
  initGrid()
  placeMines()
  calculateAdjacent()
}

// 展开展平数组
const flatGrid = computed(() => {
  const cells = []
  for (let r = 0; r < grid.value.length; r++) {
    for (let c = 0; c < grid.value[r].length; c++) {
      cells.push({ ...grid.value[r][c], row: r, col: c })
    }
  }
  return cells
})

const boardStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, 32px)`,
}))

function cellClass(cell) {
  return {
    revealed: cell.isRevealed,
    mine: cell.isRevealed && cell.isMine,
    flagged: cell.isFlagged,
  }
}

resetGame()
</script>

<style lang="less" scoped>
.minesweeper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: #f5f5f5;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 8px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;

  .label {
    font-size: 14px;
    color: #666;
  }

  .value {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    min-width: 24px;
    text-align: center;
  }
}

.reset-btn {
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: #eee;
  }
}

.game-message {
  font-size: 18px;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 8px;

  &.won {
    background: #d4edda;
    color: #155724;
  }

  &.lost {
    background: #f8d7da;
    color: #721c24;
  }
}

.difficulty {
  display: flex;
  gap: 8px;
}

.diff-btn {
  padding: 6px 14px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;

  &:hover {
    border-color: #4a90d9;
    color: #4a90d9;
  }

  &.active {
    background: #4a90d9;
    color: #fff;
    border-color: #4a90d9;
  }
}

.board {
  display: grid;
  gap: 1px;
  padding: 8px;
  background: #c0c0c0;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.cell {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  background: #e0e0e0;
  border: 2px outset #f0f0f0;

  &:hover:not(.revealed) {
    background: #d0d0d0;
  }

  &.revealed {
    background: #fff;
    border: 1px solid #ddd;
    cursor: default;
  }

  &.mine {
    background: #ffcccc;
  }

  &.flagged {
    background: #ffffcc;
  }
}

.num-1 {
  color: #0000ff;
}
.num-2 {
  color: #008000;
}
.num-3 {
  color: #ff0000;
}
.num-4 {
  color: #000080;
}
.num-5 {
  color: #800000;
}
.num-6 {
  color: #008080;
}
.num-7 {
  color: #000000;
}
.num-8 {
  color: #808080;
}
</style>
