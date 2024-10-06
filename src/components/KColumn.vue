<template>
  <div class="flex items-center justify-between p-4 bg-white border-b border-gray-300 rounded-t-md">
    <div class="text-lg font-semibold">
      {{ laneName }}
    </div>

    <div class="flex items-center space-x-1">
      <span class="block px-3 py-1 text-sm font-semibold bg-gray-200 rounded-xl">
        {{ cards?.length }}
      </span>
      <button class="font-black text-gray-500 hover:text-gray-700" @click="sortLane">
        <Bars3BottomRightIcon class="size-5" />
      </button>
      <button class="font-black text-gray-500 hover:text-gray-700" @click="toggleEditDialog">
        <PencilSquareIcon class="size-5" />
      </button>
      <button class="font-black text-red-500 hover:text-red-700" @click="deleteLane">
        <XCircleIcon class="size-5" />
      </button>
    </div>
  </div>

  <div class="p-4">
    <draggableComponent class="min-h-full" :list="cards" item-key="title" group="cards">
      <template #item="{ element, index }">
        <div>
          <KCard :task="element" :laneName="laneName" :index="index" />
        </div>
      </template>
    </draggableComponent>
  </div>
  <div class="p-4">
    <a
      @click="toggleDialog"
      class="bg-white p-4 mb-3 shadow-md border-t border-r border-l border-gray-100 rounded-md flex flex-col-reverse space-y-2 space-y-reverse relative hover:cursor-pointer"
    >
      <span class="flex flex-row items-center justify-center text-green-500 text-lg font-semibold"
        ><PlusIcon class="size-6 text-green-500" />Add new Task</span
      >
    </a>
  </div>
  <Dialog v-model:visible="visible" modal header="Add Task" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Create a task</span>
    <div class="flex items-center gap-4 mb-8">
      <label for="title" class="font-semibold w-24">Title</label>
      <InputText id="title" class="flex-auto" autocomplete="off" v-model:modelValue="taskTitle" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="author" class="font-semibold w-24">Author</label>
      <InputText id="author" class="flex-auto" autocomplete="off" v-model:modelValue="taskAuthor" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="createTask"></Button>
    </div>
  </Dialog>
  <Dialog v-model:visible="editLaneVisible" modal header="Rename Lane" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Rename a Lane</span>
    <div class="flex items-center gap-4 mb-8">
      <label for="laneNewName" class="font-semibold w-24">Name</label>
      <InputText
        id="laneNewName"
        class="flex-auto"
        autocomplete="off"
        v-model:modelValue="laneNewName"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="editLaneVisible = false"
      ></Button>
      <Button type="button" label="Save" @click="editLane"></Button>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import draggableComponent from 'vuedraggable'
import KCard from './KCard.vue'
import {
  Bars3BottomRightIcon,
  PencilSquareIcon,
  PlusIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'
import { useKanban, type Task } from '@/stores/kanban'

const store = useKanban()

const props = defineProps({
  laneName: { type: String, required: true },
  cards: { type: Array<Task>, required: true }
})

const taskTitle = ref<string>('')
const taskAuthor = ref<string>('')
const { addTask, removeLane, renameLane, sortLaneByDate } = store

const visible = ref(false)
const toggleDialog = () => {
  visible.value = !visible.value
}

const laneNewName = ref<string>('')
const editLaneVisible = ref(false)
const toggleEditDialog = () => {
  editLaneVisible.value = !editLaneVisible.value
  taskTitle.value = ''
  taskAuthor.value = ''
}

const createTask = () => {
  toggleDialog()
  addTask(props.laneName ?? '', {
    title: taskTitle.value,
    author: taskAuthor.value,
    created_at: new Date().toISOString().split('T')[0]
  })
}

const deleteLane = () => {
  removeLane(props.laneName ?? '')
}

const editLane = () => {
  renameLane(props.laneName ?? '', laneNewName.value)
}

const sortLane = () => {
  sortLaneByDate(props.laneName ?? '', true)
}
</script>
