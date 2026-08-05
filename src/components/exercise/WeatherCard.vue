<script setup>
import { useConfigStore } from '@/stores/configStore'
import { computed } from 'vue'

const props = defineProps({
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

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const getCityLocalTime = (timezone) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())
}
</script>

<template>
  <div class="card" @click.stop="sendSelectCard(city)">
    <div class="left">
      <div class="city-header">
        <img
          v-if="city.country"
          :src="`https://flagcdn.com/24x18/${city.country.toLowerCase()}.png`"
          :alt="city.country"
          class="flag-img"
        />
        <h1 class="city-name">{{ city.name }}</h1>
        <h1 class="time">{{ getCityLocalTime(city.timezone) }}</h1>
      </div>

      <div class="weather-info">
        <span class="temp-text">{{ Math.round(displayTemp) }}{{ configStore.unitSymbol }}</span>
        <span class="condition-badge">{{ city.condition }}</span>
        <span v-if="city.temp >= 25" class="status-badge hot"> 🔥 더움 </span>
        <span v-else class="status-badge cool"> ❄️ 선선함 </span>
      </div>
    </div>

    <div class="right">
      <button class="detail-btn" @click.stop="sendClickDetail(city)">상세보기</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 10px 0;
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.city-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flag-img {
  width: 20px;
  height: 15px;
  border-radius: 2px;
  object-fit: cover;
}

.city-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.condition-badge {
  font-size: 0.8rem;
  background-color: white;
  color: rgba(0, 0, 0, 0.7);
  padding: 2px 8px;
  border-radius: 12px;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.temp-text {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
}

.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
}

.status-badge.hot {
  background-color: #fef2f2;
  color: #ef4444;
}

.status-badge.cool {
  background-color: #f0f9ff;
  color: #0284c7;
}

.right {
  display: flex;
  align-items: center;
}

.detail-btn {
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.detail-btn:hover {
  background-color: #1a252f;
}
</style>
