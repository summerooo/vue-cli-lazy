<template>
  <div class="not-found">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在</p>
    <router-link to="/home" class="home-link">返回首页</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafafa;

  h1 {
    font-size: 72px;
    color: #999;
    margin: 0;
  }

  p {
    font-size: 18px;
    color: #666;
    margin: 16px 0 24px;
  }

  .home-link {
    padding: 8px 20px;
    background: #1890ff;
    color: #fff;
    border-radius: 4px;

    &:hover {
      background: #40a9ff;
    }
  }
}
</style>
