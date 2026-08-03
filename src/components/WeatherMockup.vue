<script setup>
import { ref } from 'vue'
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])
const searchQuery = ref('')
const selectQuery = ref('')
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="block">
    <h1>과제 1: 날씨 (Mockup)</h1>
    <div class="el">
      <h3>도시 검색</h3>
      <input
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
        placeholder="검색할 도시 이름 입력"
      />
      <p>검색 중인 도시: {{ searchQuery }}</p>
    </div>
    <div class="el">
      <h3>지역별 날씨 현황</h3>
      <div
        class="card"
        v-for="{ id, name, temp, status } in weatherList"
        @click="selectQuery = name"
        :key="id"
      >
        <div class="left">
          {{ name }} ({{ status }})<br />
          현재 기온: {{ temp }}℃
          <div v-if="temp >= 25">🔥 더움 (25도 이상)</div>
          <div v-else>❄️ 선선함 (25도 미만)</div>
        </div>
        <div class="right" @click.stop="showDetail(name, status)">
          <button>상세보기</button>
        </div>
      </div>
    </div>
    <div class="el">
      <div v-if="!selectQuery.trim()">카드를 클릭하거나 검색해 보세요.</div>
      <div v-else>{{ selectQuery }}이 선택되었습니다.</div>
    </div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  width: 800px;
  .el {
    background-color: #eeeeee;
    margin: 10px;
    border-radius: 5px;
    padding: 20px;
    .card {
      margin: 10px;
      background-color: white;
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .right {
        display: flex;
        padding: 20px;
        button {
          align-self: center;
        }
      }
    }
  }
}
</style>
