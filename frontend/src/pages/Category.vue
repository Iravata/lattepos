<template>
    <div class="flex h-screen" :class="{ 'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode }">
      <AppSidebar />
      <DarkModeToggle />
      <div class="flex-1 max-w-5xl py-12 mx-auto relative">
        <div class="flex items-center mb-4">
          <h2 class="font-bold text-lg">
            Categories
          </h2>
          <button
            v-if="rows.length > 0"
            @click="showDialog = true"
            class="btn btn-primary flex items-center ml-2"
          >
            <CirclePlus class="mr-1" width="20" height="20"/>
          </button>
        </div>
        <div>
          <ListView
            class="h-[700px]"
            :columns="columns"
            :rows="rows"
            :options="options"
            row-key="id"
          />
        </div>
      </div>
      <CategoryDialog :showDialog="showDialog" @update:showDialog="showDialog = $event" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { CirclePlus } from 'lucide-vue-next';
  import AppSidebar from '../components/Appsidebar.vue';
  import DarkModeToggle from '../components/DarkModeToggle.vue';
  import { useDarkMode } from '../utils/useDarkMode';
  import CategoryDialog from '../components/CategoryDialog.vue';
  import { useCategoryDialog } from '../utils/useCategoryDialog';
  import { posCategory, getCategories } from '../utils';
  import { ListView } from 'frappe-ui';
  
  const { isDarkMode } = useDarkMode();
  const { showDialog } = useCategoryDialog();
  const rows = ref([]);
  posCategory.fetch();
  
  watch(() => posCategory.data, (newData) => {
    if (newData && Array.isArray(newData)) {
      rows.value = getCategories(newData);
    }
  });
  
  const columns = [
    {
      label: 'Category Name',
      key: 'category_name',
      width: '200px',
    },
    {
      label: 'Description',
      key: 'category_description',
    },
  ];
  
  const options = {
    selectable: true,
    showTooltip: true,
    resizeColumn: true,
    emptyState: {
      title: 'No Categories found',
      description: 'Create a new record to get started',
      button: {
        label: 'New Category',
        variant: 'solid',
        onClick: () => showDialog.value = true,
      },
    },
  };
  </script>
  