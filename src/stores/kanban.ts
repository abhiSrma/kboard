import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useKanban = defineStore('kanban', () => {
  const lanesList = ref<Map<string, Array<any>>>(new Map<string, Array<any>>())

  function addTask(laneName: string, task: any) {
    if (lanesList.value.has(laneName)) {
      lanesList.value.get(laneName)?.push(task)
    }
  }

  function removeTask(laneName: string, task: any) {
    if (lanesList.value.has(laneName)) {
      const filterdList = lanesList.value.get(laneName)?.filter((t) => t.title !== task.title)
      lanesList.value.set(laneName, filterdList ?? [])
    }
  }

  function renameTask(laneName: string, newName: string, task: any) {
    if (lanesList.value.has(laneName)) {
      const tasks = lanesList.value.get(laneName)
      tasks?.map((t) => {
        if (t.title === task.title) {
          t.title = newName
        }
        return t
      })
    }
  }

  function addLane(laneName: string) {
    if (!lanesList.value.has(laneName)) {
      lanesList.value.set(laneName, new Array<any>())
    }
  }

  function removeLane(laneName: string) {
    if (lanesList.value.has(laneName)) {
      lanesList.value.delete(laneName)
    }
  }

  function renameLane(laneName: string, newName: string) {
    if (lanesList.value.has(laneName)) {
      const value = lanesList.value.get(laneName) ?? []
      const newMap = new Map<string, Array<any>>()

      for (const [key, val] of lanesList.value) {
        if (key === laneName) {
          newMap.set(newName, value)
        } else {
          newMap.set(key, val)
        }
      }
      lanesList.value = newMap
    }
  }

  function sortLaneByDate(laneName: string, ascending: boolean) {
    if (lanesList.value.has(laneName)) {
      const tasks = lanesList.value.get(laneName) ?? []
      lanesList.value.set(laneName, sortTasksByDate(tasks, ascending))
    }
  }

  function sortTasksByDate(tasks: any[], ascending: boolean): any[] {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)

      // Compare the dates and return based on ascending or descending
      if (ascending) {
        return dateA.getDate() - dateB.getDate()
      } else {
        return dateB.getDate() - dateA.getDate()
      }
    })
  }

  lanesList.value?.set('To Do', [
    {
      title: 'After sorting this should be at the end',
      author: 'John Doe',
      created_at: '2024-10-05'
    },
    {
      title: 'Test Card Title with a really long description to make it break into two lines',
      author: 'John Doe',
      created_at: '2024-09-05'
    }
  ])

  lanesList.value.set('In Progress', [
    {
      title: 'Test Title 2',
      author: 'John Doe',
      created_at: '2024-08-09'
    }
  ])

  lanesList.value.set('Done', [
    {
      title: 'Test Title 3',
      author: 'Jane Doe',
      created_at: '2024-09-01'
    }
  ])

  return {
    lanesList,
    addTask,
    addLane,
    removeLane,
    removeTask,
    renameLane,
    sortLaneByDate,
    renameTask
  }
})
