<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-base-100 p-8 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Add New Product</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="image">Product Image</label>
            <div class="flex items-center">
              <FileUploader
                :fileTypes="['image/*']"
                @success="handleFileUploadSuccess"
              >
                <template v-slot="{ uploading, progress, openFileSelector }">
                  <button type="button" @click="openFileSelector" class="btn btn-outline btn-sm">
                    {{ uploading ? `Uploading ${progress}%` : 'Attach Image' }}
                  </button>
                </template>
              </FileUploader>
              <span v-if="formData.image" class="ml-2 text-sm">{{ formData.image.name }}</span>
              <svg v-if="formData.image" @click="deleteImage" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="productName">Product Name</label>
            <input v-model="formData.productName" id="productName" type="text" class="input input-bordered w-full" required>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="category">Category</label>
            <div class="flex items-center">
              <select v-model="formData.category" id="category" class="select select-bordered w-full" required>
                <option value="">Select a category</option>
                <option v-for="category in categories.data" >
                  {{ category.category_name }}
                </option>
              </select>
              <button type="button" @click="openNewCategoryModal" class="btn btn-outline btn-sm ml-2">
                New
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="price">Price</label>
            <input v-model="formData.price" id="price" type="number" step="0.01" class="input input-bordered w-full" required>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="$emit('close')" class="btn btn-ghost mr-2">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { createListResource, FileUploader } from 'frappe-ui';
  
  export default {
    name: 'ProductModal',
    components: {
      FileUploader,
    },
    props: {
      isOpen: Boolean,
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
      const formData = ref({
        productName: '',
        category: '',
        price: '',
        image: null,
      });
  
      const categories = createListResource({
        doctype: 'Category',
        fields: ['category_name'],
        orderBy: 'creation desc',
        start: 0,
        pageLength: 100,
      });
      categories.fetch();
      console.log(categories);
  
      const handleFileUploadSuccess = (file) => {
        formData.value.image = file;
      };
  
      const deleteImage = () => {
        formData.value.image = null;
      };
  
      const addProduct = async () => {
        try {
          const productResource = createListResource({
            doctype: 'Product',
            fields: ['image', 'product_name', 'category', 'price'],
          });
  
          await productResource.insert.submit({
            product_name: formData.value.productName,
            category: formData.value.category,
            price: formData.value.price,
            image: formData.value.image.file_url,
          });
  
          emit('close');
          formData.value = { productName: '', category: '', price: '', image: null };
        } catch (error) {
          console.error('Error adding product:', error);
        }
      };
  
      const submitForm = () => {
        addProduct();
      };
  
      return {
        formData,
        categories,
        handleFileUploadSuccess,
        deleteImage,
        submitForm,
      };
    },
  };
  </script>
  