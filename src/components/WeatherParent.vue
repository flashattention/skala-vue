<script setup>
import backgroundWeather from '@/utils/backgroundWeather'
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((item) => item.name.includes(searchQuery.value.trim()))
})

watch(
  () => selectedCityInfo.value?.name,
  (name) => {
    if (!name) return
    console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${name}이 선택되었습니다."`)
  },
)

watch(
  () => selectedCityInfo.value?.status,
  (status) => {
    if (status === '맑음') backgroundWeather.sunny()
    else if (status === '비') backgroundWeather.rainy()
    else if (status === '구름') backgroundWeather.cloudy()
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
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}
</script>

<template>
  <div class="block">
    <h1>Weather</h1>

    <BaseDashboardCard>
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateSearchQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard v-if="filteredWeatherList.length > 0">
      <h3>지역별 날씨 현황</h3>
      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @click-detail="handleClickDetail"
        @select-card="handleSelectCard"
      />
    </BaseDashboardCard>

    <BaseDashboardCard v-else>일치하는 도시가 없습니다.</BaseDashboardCard>

    <BaseDashboardCard>
      <div v-if="!selectedCityInfo?.name">카드를 클릭하거나 검색해 보세요.</div>
      <div v-else>{{ selectedCityInfo?.name }}이 선택되었습니다.</div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  width: 80vw;
  color: rgba(255, 255, 255, 0.9);
  h1 {
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
