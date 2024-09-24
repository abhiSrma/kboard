<script setup lang="ts">
import KColumn from './KColumn.vue'
import KControls from './KControls.vue'
import { storeToRefs } from 'pinia'
import { useKanban } from '@/stores/kanban'

const store = useKanban()
const { lanesList } = storeToRefs(store)
</script>

<template>
  <KControls />
  <div class="flex space-x-6 overflow-x-scroll snap-x snap-mandatory">
    <div
      v-for="lane in lanesList?.keys()"
      :key="lane"
      class="border border-gray-300 rounded-md bg-gray-50 min-w-[320px] max-w-[360px] snap-start"
    >
      <KColumn :laneName="lane" :cards="lanesList?.get(lane)"></KColumn>
    </div>
  </div>
</template>
