<template>
 <div class="flex flex-col ml-8">
      <label class="text-xl/8">Horas disponibles</label>
      <div class="inline-block relative w-64">
        <select
          class="border border-black/50 shadow-inner shadow-white/20 mb-2 px-2 py-1 rounded-lg lg:w-[230px] block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="grid-state"
        >
        <option v-for="(hour, index) in hoursArray" :key="index">
          {{ hour.start }} - {{ hour.end }}
        </option>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              ><path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              ></path></svg
            >
          </div>
        </select>
      </div>
 </div>
 <div class="flex justify-center mt-3 -ml-6">
      <button
        type="button"
        class="bg-[#0c0b46] hover:bg-[#0c0b46]/80 text-white font-bold py-2 px-4 rounded"
      >
        <strong>Completar cita</strong>
      </button>
    </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const day = 'Jueves-1/2/2024';
  const hoursArray: any[] = [];

  const response = await fetch(`http://localhost:8080/api/hours?day=${day}`);
  const data = await response.json();

  const hours = data.data;
  hours.map((hour: any) => {
    hoursArray.push(hour);
  });

</script>