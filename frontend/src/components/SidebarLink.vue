<template>
	<div
	  class="flex items-center p-2 my-1 rounded-md duration-300 ease-in-out"
	  :class="isCollapsed ? 'justify-center' : 'justify-start'"
	  :style="{ color: isCollapsed ? 'white' : 'white' }"
	>
	  <router-link :to="link.to" class="flex items-center w-full">
		<component :is="link.icon" class="h-6 w-6 text-white" />
		<span v-if="!isCollapsed" class="ml-2 text-white">{{ link.label }}</span>
	  </router-link>
	</div>
  </template>
  
  <script setup>
  const props = defineProps({
	link: {
	  type: Object,
	  required: true
	},
	isCollapsed: {
	  type: Boolean,
	  default: false
	}
  })
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  