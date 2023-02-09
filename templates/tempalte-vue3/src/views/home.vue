<template>
  <div class="home">
    <h2>Home</h2>
    <img src="@/assert/pic.jpg" alt="">
    <img src="/img.jpg" alt="">
  </div>
</template>

<script>

</script>

<style lang="less">
  .home {
    & > h2 {
      color: red;
    }

    & > img {
      width: 375px;
    }
  }
</style>