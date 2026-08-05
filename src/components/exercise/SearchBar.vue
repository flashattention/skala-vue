<script setup>
import BaseDashboardCard from './BaseDashboardCard.vue'

defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update-query'])

const sendUpdateQuery = (payload) => {
  emit('update-query', payload)
}
</script>

<template>
  <BaseDashboardCard>
    <h1>Search City</h1>
    <input
      :value="searchQuery"
      @input="sendUpdateQuery($event.target.value)"
      placeholder="Type a city name to search for..."
    />
    <h2>Searching: {{ searchQuery }}</h2>
  </BaseDashboardCard>
</template>

<style scoped>
input {
  width: 100%;
  height: 40px;
  font-size: 24px;
  background-color: inherit;
  border: 1px solid transparent;
  border-radius: 5px;
  color: inherit;
  padding-left: 7px;
  font-family: inherit;
}
</style>
