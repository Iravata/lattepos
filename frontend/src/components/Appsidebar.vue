<template>
	<div
	  class="relative flex flex-col justify-between transition-all duration-300 ease-in-out bg-gray-800 h-screen cursor-pointer"
	  :class="isSidebarCollapsed ? 'w-14' : 'w-56'"
	  @click="toggleSidebar"
	>
	  <div class="flex flex-col overflow-hidden flex-grow" :class="isSidebarCollapsed ? 'items-center' : ''">
		<!-- Logo Section -->
		<div class="flex items-center justify-center py-4">
		  <img :src="logo" alt="Logo" class="h-10" />
		</div>
		<!-- Sidebar Links -->
		<div class="flex flex-col overflow-y-auto">
		  <SidebarLink
			v-for="link in links"
			:key="link.label"
			:link="link"
			:isCollapsed="isSidebarCollapsed"
		  />
		</div>
	  </div>
	  <div
		class="flex h-12 py-2 items-center justify-center rounded-md duration-300 ease-in-out"
		:class="isSidebarCollapsed ? 'px-0 w-auto' : 'px-2 w-52'"
	  >
		<UserDropdown :isCollapsed="isSidebarCollapsed" />
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SidebarLink from './SidebarLink.vue'
  import UserDropdown from './UserDropdown.vue'
  import { getSidebarLinks } from '../utils/index.js'
  import logo from '@/assets/logo/logo.svg'
  
  const isSidebarCollapsed = ref(false)
  const links = getSidebarLinks()
  
  function toggleSidebar() {
	isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
  </script>
  
  