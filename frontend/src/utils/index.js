import {
	Home,
	PackageSearch,
	Layers2
  } from 'lucide-vue-next'

import {
	createListResource,
  } from 'frappe-ui'

  
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

  export let posCategory = createListResource({
	doctype: 'Category',
	fields: ['category_name', 'category_description'],
	orderBy: 'creation desc',
	start: 0,
	pageLength: 20,
	auto: true,
})

export function getCategories(posCategory) {
	return posCategory.map((category) => {
		return {
			id: category.id,
			category_name: category.category_name,
			category_description: category.category_description,
		};
	});
}

