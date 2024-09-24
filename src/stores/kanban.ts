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
      title:
        "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
      author: 'Philip J. Fry',
      created_at: '2024-09-11'
    },
    {
      title:
        "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
      author: 'Turanga Leela',
      created_at: '2024-09-01'
    },
    {
      title:
        "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
      author: 'Bender Bending Rodriguez',
      created_at: '2024-09-14'
    },
    {
      title:
        "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
      author: 'Professor Farnsworth',
      created_at: '2024-09-14'
    },
    {
      title:
        "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
      author: 'Amy Wong',
      created_at: '2024-09-13'
    },
    {
      title:
        'Robot 1-X, save my friends! And Zoidberg! Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you!',
      author: 'Hermes Conrad',
      created_at: '2024-09-16'
    },
    {
      title: "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
      author: 'Dr. John A. Zoidberg',
      created_at: '2024-09-05'
    }
  ])

  lanesList.value.set('In Progress', [
    {
      title: "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
      author: 'Dr. John A. Zoidberg',
      created_at: '2024-09-01'
    },
    {
      title:
        "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
      author: 'Amy Wong',
      created_at: '2024-08-05'
    },
    {
      title:
        "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
      author: 'Turanga Leela',
      created_at: '2024-08-09'
    }
  ])

  lanesList.value.set('Done', [
    {
      title:
        "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
      author: 'Bender Bending Rodriguez',
      created_at: '2024-09-01'
    },
    {
      title:
        "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
      author: 'Professor Farnsworth',
      created_at: '2024-08-01'
    },
    {
      title:
        "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
      author: 'Philip J. Fry',
      created_at: '2024-08-15'
    },
    {
      title:
        "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
      author: 'Turanga Leela',
      created_at: '2024-08-19'
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
