<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useBackgroundStore } from '@/stores/backgroundStore'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import router from '@/router/index.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

const weatherStore = useWeatherStore()
const backgroundStore = useBackgroundStore()

const searchQuery = ref('')
const selectedCityInfo = ref(null)

setTimeout(() => {
  console.log(weatherStore.cityWeathers)
}, 1000)

const filteredWeatherList = computed(() => {
  return weatherStore.cityWeathers.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase()),
  )
})

watch(
  () => selectedCityInfo.value?.name,
  (name) => {
    if (!name) return
    console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${name}이 선택되었습니다."`)
  },
)

watch(
  () => selectedCityInfo.value,
  (city) => {
    if (!city) return
    backgroundStore.setCityId(city.id)
    backgroundStore.setWeatherFromCondition(city.condition)
  },
)

watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링`,
  )
})

const handleUpdateSearchQuery = (query) => {
  searchQuery.value = query
}

const handleSelectCard = (city) => {
  selectedCityInfo.value = city
}

const handleClickDetail = (city) => {
  selectedCityInfo.value = city
  router.push('/weather/' + city.id)
}
</script>

<template>
  <div class="block">
    <SearchBar :search-query="searchQuery" @update-query="handleUpdateSearchQuery" />

    <BaseDashboardCard v-if="filteredWeatherList?.length > 0">
      <h1>World Weathers</h1>
      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @click-detail="handleClickDetail"
        @select-card="handleSelectCard"
      />
    </BaseDashboardCard>

    <BaseDashboardCard v-else>일치하는 도시가 없습니다.</BaseDashboardCard>

    <BaseDashboardCard class="bottom">
      <div v-if="!selectedCityInfo?.name">Click the card or search for it...</div>
      <div v-else>{{ selectedCityInfo?.name }} has been selected.</div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.9);
}
.bottom {
  font-size: 20px;
}
</style>
