<template>
  <div class="headerContainer">
    <div class="logo-container">
      <img src="../assets/images/logo.png" alt="" />
      <div class="tiaoBox">
        <div class="tiao"></div>
        <div class="tiaoText">{{ title }}</div>
      </div>
    </div>
    <div class="time-container" style="color: white">
      <div v-if="projectName && $route.name === 'projectDetail'" class="time-container-projectName">项目名称：{{ projectName }}</div>
      <div class="time-container-timeBox">
        {{ currentTime }}
      </div>
      <div class="time-container-dateBox">
        <div>{{ currentWeek }}</div>
        <div>{{ currentDate }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, defineProps } from "vue";
import { useRoute } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const projectName = inject('projectName');
// const projectName = ref(localStorage.getItem('projectName'));
const $route = useRoute();

const currentTime = ref("");
const currentWeek = ref("");
const currentDate = ref("");





onMounted(() => {
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    currentTime.value = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    currentWeek.value =
      "星期" + ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
    currentDate.value =
      now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
  }, 1000);
});

onUnmounted(() => {
  clearInterval();
});
</script>

<style lang="less" scoped>
.headerContainer {
  position: relative;
  width: 100%;
  // height:@header-height;
  // border:3px solid blue;
  background-image: url(../assets/images/nav-bg.png);
  // background-color: rgba(0,0,0,1);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo-container {
    display: flex;
    align-items: center;
    height: 70px;
    width: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .tiaoBox {
      display: flex;
      align-items: center;

      .tiaoText {
        min-width: 100px;
        .flex-center-center();
        font-weight: 500;
        font-size: 24px;
        color: #ffe8cc;
        // color: @theme-timeColor;
        // padding-bottom: 5px;
      }

      .tiao {
        width: 1px;
        height: 25px;
        border: 3px solid #ff6613;
        border-radius: 10px;
        margin: 21px;
      }
    }
  }

  .time-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > div {
      margin-left: 32px;
      color: @theme-timeColor;
      font-weight: bold;
    }

    .time-container-projectName{
        // min-width: 220px;
        height: 42px;
        padding:6px 32px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 20px;
        color: @theme-timeColor;
        background: rgba(216,216,216,0.1);
        .flex-center-center();
        }

    .time-container-timeBox {
      font-size: 36px;
      .flex-center-center();
    }

    .time-container-dateBox {
      & > div {
        .flex-center-center();
      }
      & > div:nth-child(2) {
        margin-top: 7px;
        font-size: 12px;
      }
      & > div:nth-child(1) {
        font-size: 14px;
      }
    }
  }
}

// .headerContainer::before {
//   content: '';
//   position: absolute;
//   top: -8px;
//   left: -2px;
//   width: 1px;
//   height: 14px;
//   background: rgba(255,255,255,0.48);
//   border: 1px solid #8d8c8c;
//   border-width: 2px 0 0 2x;
//   transform: translate(7px, 8px) skewX(-45deg);
//   z-index: 1;
// }
// .headerContainer::after {
//   content: '';
//   position: absolute;
//   top: -10px;
//   left: -21px;
//   width: 20px;
//   height: 16px;
//   background: #030303;
//   // border: 2px solid rgba(255,255,255,0.48);
//   border-width: 2px 0 0 2px;
//   transform: translate(8px, 8px) skewX(-45deg);
//   z-index: 1;
// }
</style>
