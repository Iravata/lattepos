import {
	Home,
	PackageSearch
  } from 'lucide-vue-next'
  
  export function getSidebarLinks() {
	return [
	  {
		label: 'Home',
		to: '/',
		icon: Home,
	  },
	  {
		label: 'Products',
		to: '/products',
		icon: PackageSearch,
	  },
	  // Add other links here
	];
  }
  