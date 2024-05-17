<template>
    <div class="flex h-screen" :class="{ 'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode }">
      <AppSidebar />
      <DarkModeToggle />
      <div class="flex-1 max-w-5xl py-12 mx-auto relative">
        <h2 class="font-bold text-lg mb-4">
          Categories
        </h2>
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
  import AppSidebar from '../components/Appsidebar.vue';
  import DarkModeToggle from '../components/DarkModeToggle.vue';
  import { useDarkMode } from '../utils/useDarkMode';
  import { ListView } from 'frappe-ui';
  import CategoryDialog from '../components/CategoryDialog.vue';
  import { useCategoryDialog } from '../utils/useCategoryDialog';
  
  const { isDarkMode } = useDarkMode();
  const { showDialog } = useCategoryDialog();
  
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
  
  const rows = [];
  
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
  