<template>
    <div class="flex h-screen" :class="{ 'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode }">
      <AppSidebar />
      <DarkModeToggle />
      <div class="flex-1 max-w-5xl py-12 mx-auto relative">
        <h2 class="font-bold text-lg mb-4">
          Products
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
      <ProductDialog :showDialog="showDialog" @update:showDialog="showDialog = $event" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { h } from 'vue';
  import AppSidebar from '../components/Appsidebar.vue';
  import DarkModeToggle from '../components/DarkModeToggle.vue';
  import { useDarkMode } from '../utils/useDarkMode';
  import { ListView, Avatar, Button } from 'frappe-ui';
  import ProductDialog from '../components/ProductDialog.vue';
  import { useProductDialog } from '../utils/useProductDialog';
  
  const { isDarkMode } = useDarkMode();
  const { showDialog } = useProductDialog();
  
  const columns = [
    {
      label: 'Product Photo',
      key: 'product_photo',
      width: 3,
      getLabel: ({ row }) => row.name,
      prefix: ({ row }) => {
        return h(Avatar, {
          shape: 'circle',
          image: row.product_photo,
          size: 'sm'
        });
      },
    },
    {
      label: 'Product Name',
      key: 'product_name',
      width: '200px',
    },
    {
      label: 'Product Type',
      key: 'product_type',
    },
    {
      label: 'Status',
      key: 'status',
    },
  ];
  
  const rows = [];
  
  const options = {
    selectable: true,
    showTooltip: true,
    resizeColumn: true,
    emptyState: {
      title: 'No Products found',
      description: 'Create a new record to get started',
      button: {
        label: 'New Products',
        variant: 'solid',
        onClick: () => showDialog.value = true,
      },
    },
  };
  </script>
  