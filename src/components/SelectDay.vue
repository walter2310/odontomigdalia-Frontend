<template>
  <div class="flex flex-col ml-8">
    <div style="background-color: red;" @click="console.log('cagate mrko')">Click me!</div>
    <label class="text-xl/8">Días disponibles (Select: {{ selectedDay }})</label>
    <div class="inline-block relative w-64">
      <select
        class="border border-black/50 shadow-inner shadow-white/20 mb-2 px-2 py-1 rounded-lg lg:w-[230px] block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        id="grid-state"
        v-model="selectedDay"
        @change="testChange">
        <option v-for="(day, index) in avaibleDays" :key="index">
          {{ day.day }}
        </option>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
          </svg>
        </div>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits, ref } from 'vue'

  const emit = defineEmits(['showsidebar'])
  // emit('showsidebar', showSidebar.value)

  type Day = {
    day: string;
  };

  const selectedDay = ref('');

  const testChange = () => {
    console.log("index: "+selectedDay.value);
  }

  let avaibleDays: Day[] = [];

try {
  const payloadData = await fetch("http://localhost:8080/api/hours/days", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const processRespone = payloadData.json().then((data) => {
    return data.data.payload;
  });

  avaibleDays = await processRespone;
} catch (error) {
  console.log(error);
}



</script>