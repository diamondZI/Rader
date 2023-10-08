<template>
  <div class="about">
    <h1>
     逻辑应该与canvas同理,
     自适应适配用div好做一些
     Canavs 需要计算监听页面大小,重新绘制
    </h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
