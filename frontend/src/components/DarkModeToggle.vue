<template>
  <div class="absolute top-4 right-4">
    <Button icon="sun" @click="toggleTheme" />
  </div>
</template>

<script setup>

import { useDarkMode } from '../utils/useDarkMode';

const { toggleTheme } = useDarkMode();
</script>

<style scoped>
/* Add any additional styles here */
</style>
