<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggle">
    <p>날씨 단위: {{ configStore.unitSymbol }}</p>
    <button @click="configStore.toggleUnit()">단위 설정 변경</button>
  </div>
</template>

<style scoped>
.unit-toggle {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 230px;
  p,
  button {
    background-color: rgba(255, 255, 255, 0.5);
    color: #ffffff;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    height: 35px;
    display: flex;
    align-items: center;
  }
  button {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 668px) {
    flex-direction: column;
    button {
      margin: 5px;
    }
  }
}
</style>
