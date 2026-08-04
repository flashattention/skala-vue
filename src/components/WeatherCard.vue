<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const sendSelectCard = (payload) => {
  emit('select-card', payload)
}

const sendClickDetail = (payload) => {
  emit('click-detail', payload)
}
</script>

<template>
  <div class="card" @click.stop="sendSelectCard(city)">
    <div class="left">
      {{ city.name }} ({{ city.status }})<br />
      현재 기온: {{ city.temp }}℃
      <div v-if="city.temp >= 25">🔥 더움 (25도 이상)</div>
      <div v-else>❄️ 선선함 (25도 미만)</div>
    </div>
    <div class="right">
      <button @click.stop="sendClickDetail(city)">상세보기</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 10px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .right {
    display: flex;
    padding: 20px;
    button {
      color: rgba(255, 255, 255, 0.9);
      align-self: center;
      border: 1px solid rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      background-color: inherit;
    }
  }
}
</style>
