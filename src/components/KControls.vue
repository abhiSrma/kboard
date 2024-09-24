<template>
  <div class="flex items-center justify-between pt-6 pb-3">
    <h3 class="text-xl text-gray-500">Board</h3>
    <button
      class="flex space-x-2 font-bold text-green-500 hover:text-green-700"
      @click="toggleDialog"
    >
      <PlusIcon class="size-6 text-green-500" />
      Add New Column
    </button>
  </div>
  <Dialog v-model:visible="visible" modal header="Add Lane" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Create a lane</span>
    <div class="flex items-center gap-4 mb-8">
      <label for="title" class="font-semibold w-24">Title</label>
      <InputText id="title" class="flex-auto" autocomplete="off" v-model:modelValue="laneTitle" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="createLane"></Button>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useKanban } from '@/stores/kanban'
import { PlusIcon } from '@heroicons/vue/24/outline'

const store = useKanban()

const laneTitle = ref<string>('')
const { addLane } = store

const visible = ref(false)
const toggleDialog = () => {
  visible.value = !visible.value
}

const createLane = () => {
  toggleDialog()
  addLane(laneTitle.value)
}
</script>
