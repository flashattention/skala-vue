<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useWeatherStore } from '@/stores/weatherStore'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const weatherStore = useWeatherStore()
const cityId = ref(null)

const configStore = useConfigStore()

onMounted(() => {
  cityId.value = route.params.cityId
})

const selectedCity = computed(() => {
  if (!cityId.value || cityId.value === '0') return null
  return weatherStore.cityWeathers.find((city) => city.id === cityId.value)
})

const displayTemp = computed(() => {
  const rawTemp = selectedCity.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <BaseDashboardCard>
    <div v-if="!selectedCity" class="empty-state">
      <p>날씨 세부 정보를 확인할 지역을 선택해주세요.</p>
    </div>

    <div v-else class="detail-container">
      <div class="header">
        <img
          :src="`https://flagcdn.com/24x18/${selectedCity.country.toLowerCase()}.png`"
          :alt="selectedCity.country"
        />
        <h2>{{ selectedCity.name }}</h2>
        <span class="country-badge" v-if="selectedCity.country">{{ selectedCity.country }}</span>
      </div>

      <div class="main-weather">
        <img
          v-if="selectedCity.icon"
          :src="`https://openweathermap.org/img/wn/${selectedCity.icon}@2x.png`"
          :alt="selectedCity.condition"
          class="weather-icon"
        />
        <div class="temp-display">
          <span class="temp-value">{{ Math.round(displayTemp) }}{{ configStore.unitSymbol }}</span>
          <span class="condition-text">{{ selectedCity.condition }}</span>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="label">습도</span>
          <span class="value">{{ selectedCity.humidity }}%</span>
        </div>
        <div class="info-item">
          <span class="label">위도 (Lat)</span>
          <span class="value">{{ selectedCity.lat }}</span>
        </div>
        <div class="info-item">
          <span class="label">경도 (Long)</span>
          <span class="value">{{ selectedCity.long }}</span>
        </div>
      </div>
    </div>
  </BaseDashboardCard>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 1.1rem;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  width: 95%;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.flag {
  font-size: 2rem;
}

.header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #2c3e50;
}

.country-badge {
  background-color: #e2e8f0;
  color: #475569;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.main-weather {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #f8fafc;
  padding: 15px;
  border-radius: 12px;
}

.weather-icon {
  width: 70px;
  height: 70px;
}

.temp-display {
  display: flex;
  flex-direction: column;
}

.temp-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e293b;
  line-height: 1;
}

.condition-text {
  font-size: 1rem;
  color: #64748b;
  margin-top: 5px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.info-item .label {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 4px;
}

.info-item .value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
}
</style>
