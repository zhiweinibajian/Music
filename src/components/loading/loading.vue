<template>
  <div class="loading"></div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .loading {
    animation: loading .8s linear infinite;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -17.5px;
    margin-top: -17.5px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border-top: 1px solid #31c27c;
    border-right: 1px solid #31c27c;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
