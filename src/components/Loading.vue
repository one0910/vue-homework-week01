<script>
export default {
  name: 'loadingMask',
  props: ['isActive']
}
</script>

<template>
  <div class="loadingMask" :style="{ display: isActive ? 'flex' : 'none' }"></div>
</template>

<style lang="scss" scoped>
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loadingMask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(7px);
  z-index: 9999;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  &:after {
    content: '';
    display: block;
    height: 55px;
    width: 55px;
    border: 7px solid #0d6efdc9;
    border-radius: 50%;
    border-top: none;
    border-right: none;
    margin: 16px auto;
    animation: rotation 1s linear infinite;
  }
}
</style>
