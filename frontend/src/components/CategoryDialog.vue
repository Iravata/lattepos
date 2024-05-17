<template>
    <Dialog :modelValue="showDialog" @update:modelValue="updateDialogVisibility">
      <template #body-title>
        <h3>Add New Category</h3>
      </template>
      <template #body-content>
        <form @submit.prevent="saveCategory">
          <div class="p-2">
            <FormControl
              :type="'text'"
              size="sm"
              variant="subtle"
              placeholder="Category Name"
              :disabled="false"
              label="Category Name"
              v-model="categoryName"
            />
          </div>
          <div class="p-2">
            <FormControl
              :type="'textarea'"
              size="sm"
              variant="subtle"
              placeholder="say something about this category"
              :disabled="false"
              label="Description"
              v-model="description"
            />
          </div>
        </form>
      </template>
      <template #actions>
        <Button variant="solid" @click="saveCategory">
          Save
        </Button>
        <Button class="ml-2" @click="discardCategory">
          Discard
        </Button>
      </template>
    </Dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { Dialog, Button, FormControl } from 'frappe-ui';
  import { posCategory } from '../utils';
  
  const props = defineProps<{ showDialog: boolean }>();
  const emit = defineEmits(['update:showDialog']);
  
  const categoryName = ref('');
  const description = ref('');
  
  const saveCategory = () => {
    

    posCategory.insert.submit({
        category_name: categoryName.value,
        category_description: description.value,
    })

    console.log({
      categoryName: categoryName.value,
      description: description.value,
    });
    emit('update:showDialog', false);
    resetForm();
  };
  
  const discardCategory = () => {
    emit('update:showDialog', false);
    resetForm();
  };
  
  const resetForm = () => {
    categoryName.value = '';
    description.value = '';
  };
  
  const updateDialogVisibility = (value: boolean) => {
    emit('update:showDialog', value);
  };
  </script>
  