import {
	createResource,
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

  export const posCategory = createResource({
	url: 'lattepos.lattepos.utils.get_category_list',
	cache: ['PosCategory'],
	auto: true
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

