import {
	Home,
	PackageSearch,
	Layers2
  } from 'lucide-vue-next'

  
  export function getSidebarLinks() {
	return [
	  {
		label: 'Home',
		to: '/',
		icon: Home,
	  },
	  {
		label: 'Cateogories',
		to: '/category',
		icon: Layers2,
	  },
	  {
		label: 'Products',
		to: '/products',
		icon: PackageSearch,
	  },
	  // Add other links here
	];
  }

