import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Task {
  title: string
  author: string
  created_at: string
}

export const useKanban = defineStore('kanban', () => {
  const lanesList = ref<Map<string, Array<Task>>>(new Map<string, Array<Task>>())

  function addTask(laneName: string, task: Task) {
    if (lanesList.value.has(laneName)) {
      lanesList.value.get(laneName)?.push(task)
    }
  }

  function removeTask(laneName: string, index: number) {
    if (lanesList.value.has(laneName)) {
      const tasks = lanesList.value.get(laneName)
      if (tasks) {
        const updatedTasks = tasks.filter((_, i) => i !== index)
        lanesList.value.set(laneName, updatedTasks)
      }
    } else {
      alert(`Lane name "${laneName}" does not exist.`)
    }
  }

  function renameTask(laneName: string, newName: string, index: number) {
    if (lanesList.value.has(laneName)) {
      const tasks = lanesList.value.get(laneName)
      if (tasks && index >= 0 && index < tasks.length) {
        tasks[index].title = newName
        lanesList.value.set(laneName, tasks)
      } else {
        alert('Could not delete due to missing information')
      }
    } else {
      alert(`Lane "${laneName}" does not exist.`)
    }
  }

  function addLane(laneName: string) {
    if (!lanesList.value.has(laneName)) {
      lanesList.value.set(laneName, new Array<Task>())
    } else {
      alert(`Lane name "${laneName}" already exists.`)
    }
  }

  function removeLane(laneName: string) {
    if (lanesList.value.has(laneName)) {
      lanesList.value.delete(laneName)
    }
  }

  function renameLane(laneName: string, newName: string) {
    if (lanesList.value.has(laneName)) {
      if (!lanesList.value.has(newName)) {
        const value = lanesList.value.get(laneName)
        if (value) {
          lanesList.value.set(newName, value)
          lanesList.value.delete(laneName)
        }
      } else {
        alert(`Lane name "${newName}" already exists. Rename aborted.`)
      }
    } else {
      alert(`Lane name "${laneName}" does not exist.`)
    }
  }

  function sortLaneByDate(laneName: string, ascending: boolean) {
    if (lanesList.value.has(laneName)) {
      const tasks = lanesList.value.get(laneName) ?? []
      lanesList.value.set(laneName, sortTasksByDate(tasks, ascending))
    }
  }

  function sortTasksByDate(tasks: Task[], ascending: boolean): any[] {
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
