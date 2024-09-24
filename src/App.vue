<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="flex">
      <div class="w-full p-4 lg:p-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
