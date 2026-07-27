<template>
  <div class="minesweeper-wrapper">
    <div class="minesweeper-card">
      <!-- 顶部控制台 -->
      <div class="status-bar">
        <div class="status-badge mine">
          <span class="icon">💣</span>
          <span class="value">{{ remainingMines }}</span>
        </div>

        <button class="reset-btn" @click="resetGame()">
          {{ isGameOver ? (gameState === GameState.WON ? '😎' : '😵') : '😀' }}
        </button>

        <div class="status-badge flag">
          <span class="icon">🚩</span>
          <span class="value">{{ flagCount }}</span>
        </div>
      </div>

      <!-- 难度选择器 -->
      <div class="difficulty-tabs">
        <button
          v-for="d in difficulties"
          :key="d.label"
          class="tab-btn"
          :class="{ active: rows === d.size && mineCount === d.mines }"
          @click="resetGame(d.size, d.mines)"
        >
          {{ d.label }}
        </button>
      </div>

      <!-- 游戏结束提示浮层 -->
      <div v-if="isGameOver" class="game-banner" :class="gameState">
        <span>{{
          gameState === GameState.WON ? '🎉 恭喜通关！无一踩雷！' : '💥 踩地雷啦！再接再厉！'
        }}</span>
      </div>

      <!-- 棋盘网格 -->
      <div class="board-container">
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
  { label: '初级 8×8', size: 8, mines: 10 },
  { label: '中级 12×12', size: 12, mines: 25 },
  { label: '高级 16×16', size: 16, mines: 50 },
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
  gridTemplateColumns: `repeat(${cols.value}, 34px)`,
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

<style lang="scss" scoped>
.minesweeper-wrapper {
  width: 100%;
  height: 100%;
  padding: 32px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minesweeper-card {
  background: $card-bg;
  padding: 28px 36px;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  border: 1px solid $border-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 28px;

  .status-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f1f5f9;
    border-radius: $border-radius-md;
    font-size: 15px;

    .value {
      font-weight: 700;
      color: $text-primary;
      min-width: 20px;
    }
  }

  .reset-btn {
    font-size: 28px;
    border: none;
    background: #f8fafc;
    border: 1px solid $border-color;
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $shadow-sm;
    transition: $transition-base;

    &:hover {
      transform: scale(1.1);
      background: #fff;
      box-shadow: $shadow-md;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.difficulty-tabs {
  display: flex;
  gap: 8px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: $border-radius-md;

  .tab-btn {
    padding: 6px 16px;
    border: none;
    background: transparent;
    border-radius: $border-radius-sm;
    font-size: 13px;
    font-weight: 500;
    color: $text-secondary;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      color: $text-primary;
    }

    &.active {
      background: #fff;
      color: $primary-color;
      font-weight: 600;
      box-shadow: $shadow-sm;
    }
  }
}

.game-banner {
  width: 100%;
  padding: 10px 16px;
  border-radius: $border-radius-md;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  animation: bannerPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.won {
    background: #d1fae5;
    color: #065f46;
  }

  &.lost {
    background: #fee2e2;
    color: #991b1b;
  }
}

.board-container {
  padding: 12px;
  background: #e2e8f0;
  border-radius: $border-radius-md;
}

.board {
  display: grid;
  gap: 3px;
}

.cell {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  background: #f8fafc;
  border-radius: 6px;
  box-shadow: 0 2px 0 #cbd5e1;
  transition: $transition-base;

  &:hover:not(.revealed) {
    background: #ffffff;
    transform: translateY(-1px);
  }

  &.revealed {
    background: #cbd5e1;
    box-shadow: none;
    cursor: default;
  }

  &.mine {
    background: #fca5a5;
  }

  &.flagged {
    background: #fef08a;
  }
}

.num-1 {
  color: #2563eb;
}
.num-2 {
  color: #059669;
}
.num-3 {
  color: #dc2626;
}
.num-4 {
  color: #7c3aed;
}
.num-5 {
  color: #991b1b;
}
.num-6 {
  color: #0891b2;
}
.num-7 {
  color: #1e293b;
}
.num-8 {
  color: #475569;
}

@keyframes bannerPop {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
