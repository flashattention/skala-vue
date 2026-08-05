<script setup>
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
  <h3>도시 검색</h3>
  <input
    :value="searchQuery"
    @input="sendUpdateQuery($event.target.value)"
    placeholder="Type a city name to search for"
  />
  <p>검색 중인 도시: {{ searchQuery }}</p>
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
}
</style>
