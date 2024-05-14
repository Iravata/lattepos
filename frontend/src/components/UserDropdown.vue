<template>
	<div class="relative">
	  <button
		@click.stop="toggleDropdown"
		class="flex h-12 py-2 items-center rounded-md duration-300 ease-in-out"
		:class="isCollapsed ? 'px-0 w-auto justify-center' : 'px-2 w-52'"
	  >
		<Avatar
		  :shape="'square'"
		  :image="null"
		  :label="userInitial"
		  size="2xl"
		  class="text-white bg-gray-700"
		/>
		<div
		  class="flex flex-1 flex-col text-left duration-300 ease-in-out"
		  :class="isCollapsed ? 'opacity-0 ml-0 w-0 overflow-hidden' : 'opacity-100 ml-2 w-auto'"
		>
		  <div class="text-base font-medium text-white leading-none">
			{{ session.user }}
		  </div>
		</div>
	  </button>
	  <div
		v-if="dropdownOpen"
		class="absolute bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
	  >
		<a href="#" @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { Avatar } from 'frappe-ui'
  import { session } from '../data/session'
  
  const dropdownOpen = ref(false)
  const props = defineProps({
	isCollapsed: {
	  type: Boolean,
	  default: false
	}
  })
  
  const userInitial = computed(() => {
	return session.user ? session.user.charAt(0).toUpperCase() : ''
  })
  
  function toggleDropdown(event) {
	event.stopPropagation()
	dropdownOpen.value = !dropdownOpen.value
  }
  
  function logout() {
	session.logout.submit()
	console.log('Logging out...')
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
	dropdownOpen.value = false
  })
  </script>
  

  