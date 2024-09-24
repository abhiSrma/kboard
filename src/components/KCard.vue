<template>
  <div
    class="bg-white px-4 pb-4 pt-6 mb-3 shadow-md border-t border-r border-l border-gray-100 rounded-md flex flex-col-reverse space-y-2 space-y-reverse relative hover:cursor-move"
  >
    <div class="flex flex-row absolute top-1 right-1">
      <button class="font-black text-gray-500 hover:text-gray-700" @click="toggleEditDialog">
        <PencilSquareIcon class="size-5" />
      </button>
      <button class="font-black text-red-500 hover:text-red-700" @click="deleteTask">
        <XCircleIcon class="size-5" />
      </button>
    </div>

    <div class="text-gray-400 text-sm">{{ task?.author }}, {{ task?.created_at }}</div>
    <div>{{ task?.title }}</div>
  </div>
  <Dialog v-model:visible="visible" modal header="Rename Task" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Rename a Task</span>
    <div class="flex items-center gap-4 mb-8">
      <label for="taskNewName" class="font-semibold w-24">Name</label>
      <InputText
        id="taskNewName"
        class="flex-auto"
        autocomplete="off"
        v-model:modelValue="taskNewName"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="editTask"></Button>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { useKanban } from '@/stores/kanban'
import { PencilSquareIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
const store = useKanban()

const { removeTask, renameTask } = store

const props = defineProps({
  laneName: String,
  task: Object
})

const deleteTask = () => {
  removeTask(props.laneName ?? '', props.task)
}

const taskNewName = ref<string>('')
const visible = ref(false)
const toggleEditDialog = () => {
  visible.value = !visible.value
}

const editTask = () => {
  renameTask(props.laneName ?? '', taskNewName.value, props.task)
  toggleEditDialog()
}
</script>
