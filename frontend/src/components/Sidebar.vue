<template>
	<aside :class="[
	  'bg-base-100 shadow-lg transition-all duration-300 ease-in-out',
	  isCollapsed ? 'w-16' : 'w-64'
	]">
	  <nav class="h-full flex flex-col">
		<ul class="menu p-2 w-full">
		  <li class="mb-2">
			<a @click="toggleSidebar" class="justify-between">
			  <span v-if="!isCollapsed" class="text-xl font-bold">Back Office</span>
			  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
			</a>
		  </li>
		  <li>
			<a :class="{ 'active': activePage === 'home' }" @click="navigate('home')">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
			  <span v-if="!isCollapsed">Home</span>
			</a>
		  </li>
		  <li>
			<a :class="{ 'active': activePage === 'products' }" @click="navigate('products')">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
			  <span v-if="!isCollapsed">Products</span>
			</a>
		  </li>
		  <li>
			<a :class="{ 'active': activePage === 'categories' }" @click="navigate('categories')">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
			  <span v-if="!isCollapsed">Categories</span>
			</a>
		  </li>
		</ul>
		<div class="mt-auto p-4">
		  <button @click="handleLogout" class="flex items-center">
			<div class="avatar">
			  <div class="w-8 rounded-full">
				<img :src="avatarUrl" alt="User Avatar" />
			  </div>
			</div>
			<span v-if="!isCollapsed" class="ml-2">Logout</span>
		  </button>
		</div>
	  </nav>
	</aside>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { session } from '../data/session';
  
  export default {
	name: 'Sidebar',
	props: {
	  activePage: {
		type: String,
		default: 'home'
	  },
	  avatarUrl: {
		type: String,
		default: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
	  }
	},
	setup(props) {
	  const router = useRouter();
	  const isCollapsed = ref(false);
  
	  const navigate = (path) => {
		console.log('Navigating to:', path);
		router.push({ path });
	  };
  
	  const toggleSidebar = () => {
		isCollapsed.value = !isCollapsed.value;
	  };
  
	  const handleLogout = () => {
		session.logout.submit();
	  };
  
	  return {
		isCollapsed,
		navigate,
		toggleSidebar,
		handleLogout
	  };
	}
  }
  </script>
  