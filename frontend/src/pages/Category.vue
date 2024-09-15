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
        <div v-if="posCategory.data?.length">
          <ListView
            class="h-[700px]"
            :columns="columns"
            :rows="rows"
            :options="options"
            row-key="id"
          />
          <ListHeader class="mb-2 grid items-center space-x-4 rounded bg-gray-100 p-2">
            <ListHeaderItem :item="item" v-for="item in columns" :key="item.key">
              <template #prefix="{ item }">
							<component
								v-if="item.icon"
								:is="item.icon"
								class="h-4 w-4 stroke-1.5 ml-4"
							/>
						</template>
            </ListHeaderItem>
          </ListHeader>
          <ListRows>
					<ListRow :row="row" v-for="row in posCategory.data">
						<template #default="{ column, item }">
							<ListRowItem :item="row[column.key]" :align="column.align">
								<div>
									{{ row[column.key] }}
								</div>
							</ListRowItem>
						</template>
					</ListRow>
				</ListRows>
        </div>
      </div>
      <CategoryDialog :showDialog="showDialog" @update:showDialog="showDialog = $event" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { CirclePlus } from 'lucide-vue-next';
  import AppSidebar from '../components/Sidebar.vue';
  import DarkModeToggle from '../components/Icons/ThemeToggle.vue';
  import { useDarkMode } from '../utils/useDarkMode';
  import CategoryDialog from '../components/CategoryDialog.vue';
  import { useCategoryDialog } from '../utils/useCategoryDialog';
  import { posCategory, getCategories } from '../utils';
  import { ListView, ListHeader } from 'frappe-ui';
  
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
  