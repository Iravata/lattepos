<template>
    <Dialog :modelValue="showDialog" @update:modelValue="updateDialogVisibility">
      <template #body-title>
        <h3>Add New Product</h3>
      </template>
      <template #body-content>
        <form @submit.prevent="saveProduct">
          <FileUploader
            :fileTypes="['image/*']"
            :validateFile="(fileObject) => {}"
            @success="(file) => { handleFileUpload(file) }"
          >
            <template #default="{ file, uploading, progress, uploaded, message, error, total, success, openFileSelector }">
              <Button
                @click="openFileSelector"
                :loading="uploading"
              >
              {{ uploaded? 'Change Photo' : 'Upload Photo' }}
              </Button>
            </template>
          </FileUploader>
          <div class="p-2">
            <FormControl
              :type="'text'"
              size="sm"
              variant="subtle"
              placeholder="Enter Product Name"
              :disabled="false"
              label="Product Name"
              v-model="productName"
            />
          </div>
          <div class="p-2">
            <FormControl
              type="select"
              :options="categories.map(cat => ({ label: cat, value: cat }))"
              size="sm"
              variant="subtle"
              placeholder="Select POS Category"
              :disabled="false"
              label="Category"
              v-model="category"
            />
          </div>
          <div class="p-2">
            <FormControl
              :type="'number'"
              size="sm"
              variant="subtle"
              placeholder="Enter the Price"
              :disabled="false"
              label="Price"
              v-model="price"
            />
          </div>
          <div class="p-2">
            <FormControl
              :type="'textarea'"
              size="sm"
              variant="subtle"
              placeholder="Say a few words about the Product"
              :disabled="false"
              label="Description"
              v-model="description"
            />
          </div>
        </form>
      </template>
      <template #actions>
        <Button variant="solid" @click="saveProduct">
          Save
        </Button>
        <Button class="ml-2" @click="discardProduct">
          Discard
        </Button>
      </template>
    </Dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { Dialog, Button, FormControl, FileUploader } from 'frappe-ui';
  
  const props = defineProps<{ showDialog: boolean }>();
  const emit = defineEmits(['update:showDialog']);
  
  const productName = ref('');
  const category = ref('');
  const price = ref<number | null>(null);
  const description = ref('');
  const productPhoto = ref<File | null>(null);
  const categories = ref(['Electronics', 'Books', 'Clothing', 'Furniture']);
  
  const handleFileUpload = (file: File) => {
    productPhoto.value = file;
  };
  
  const saveProduct = () => {
    // Save product logic here
    console.log({
      productName: productName.value,
      category: category.value,
      price: price.value,
      description: description.value,
      productPhoto: productPhoto.value,
    });
    emit('update:showDialog', false);
    resetForm();
  };
  
  const discardProduct = () => {
    emit('update:showDialog', false);
    resetForm();
  };
  
  const resetForm = () => {
    productName.value = '';
    category.value = '';
    price.value = null;
    description.value = '';
    productPhoto.value = null;
  };
  
  const updateDialogVisibility = (value: boolean) => {
    emit('update:showDialog', value);
  };
  </script>
  