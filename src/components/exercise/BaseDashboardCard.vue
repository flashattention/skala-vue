<script setup></script>

<template>
  <div class="base-dashboard">
    <slot>컨텐츠가 존재하지 않습니다.</slot>
  </div>
</template>

<style scoped>
.base-dashboard {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  color: #ffffff;
  margin: 10px;
  border-radius: 5px;
  padding: 20px;
  width: 75vw;
}
</style>
