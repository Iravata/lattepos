<template>
    <div class="flex h-screen" :class="{ 'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode }">
      <AppSidebar />
      <DarkModeToggle />
      <div class="flex-1 max-w-3xl py-12 mx-auto relative">
        <h2 class="font-bold text-lg mb-4">
          Products
        </h2>
        <div>
          <ListView
            class="h-[250px]"
            :columns="columns"
            :rows="rows"
            :options="options"
            row-key="id"
          />
        </div>
      </div>
    </div>
</template>
  
  <script lang="ts" setup>
import { h } from 'vue';
  import AppSidebar from '../components/Appsidebar.vue';
  import DarkModeToggle from '../components/DarkModeToggle.vue';
  import { useDarkMode } from '../utils/useDarkMode';
  import { ListView, Avatar } from 'frappe-ui';
  
  const { isDarkMode } = useDarkMode();
  
  const columns = [
    {
      label: 'Name',
      key: 'name',
      width: 3,
      getLabel: ({ row }) => row.name,
      prefix: ({ row }) => {
        return h(Avatar, {
          shape: "circle",
          image: row.user_image,
          size: "sm"
        });
      },
    },
    {
      label: 'Email',
      key: 'email',
      width: '200px',
    },
    {
      label: 'Role',
      key: 'role',
    },
    {
      label: 'Status',
      key: 'status',
    },
  ];
  
  const rows = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
      status: 'Active',
      role: 'Developer',
      user_image: 'https://avatars.githubusercontent.com/u/499550',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@doe.com',
      status: 'Inactive',
      role: 'HR',
      user_image: 'https://avatars.githubusercontent.com/u/499120',
    },
  ];
  
  const options = {
    selectable: true,
    showTooltip: true,
    resizeColumn: true,
    emptyState: {
      title: 'No records found',
      description: 'Create a new record to get started',
      button: {
        label: 'New Record',
        variant: 'solid',
        onClick: () => console.log("New Record"),
      },
    },
  };
  </script>
  