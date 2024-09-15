<template>
  <div class="flex h-screen bg-base-200">
    <!-- Sidebar -->
    <Sidebar :activePage="currentPage"/>
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-base-100 shadow-md">
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center">
            <h1 class="text-xl font-bold ml-4">Products</h1>
            <button class="btn btn-circle btn-sm ml-2" @click="openModal">
              <AddMoreIcon />
            </button>
          </div>
          <div class="flex items-center">
            <button v-if="selectedProducts.length === 1" class="btn btn-ghost btn-circle mr-2">
              <EditIcon />
            </button>
            <button v-if="selectedProducts.length > 0" class="btn btn-ghost btn-circle mr-2" @click="deleteSelectedProducts">
              <DeleteIcon />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-base-200 p-4">
        <div class="overflow-x-auto">
          <table class="table w-full border-collapse">
            <thead>
              <tr class="bg-base-300">
                <th class="w-12 text-xl font-extrabold border p-3 bg-base-300 text-base-content">
                  <input type="checkbox" class="checkbox" @change="toggleAllSelection">
                </th>
                <th class="w-24 text-xl font-extrabold border p-3 bg-base-300 text-base-content">Photo</th>
                <th class="w-1/3 text-xl font-extrabold border p-3 bg-base-300 text-base-content">Name</th>
                <th class="w-1/4 text-xl font-extrabold border p-3 bg-base-300 text-base-content">Type</th>
                <th class="w-1/6 text-xl font-extrabold border p-3 bg-base-300 text-base-content">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products.data" class="border-b">
                <td class="w-12 border p-3">
                  <input type="checkbox" class="checkbox" v-model="selectedProducts" :value="product.product_name">
                </td>
                <td class="w-24 border p-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="product.image" :alt="product.product_name" />
                    </div>
                  </div>
                </td>
                <td class="w-1/3 border p-3">{{ product.product_name }}</td>
                <td class="w-1/4 border p-3">{{ product.category }}</td>
                <td class="w-1/6 border p-3">{{ product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <!-- Product Modal -->
    <ProductModal :isOpen="isModalOpen" @close="closeModal" />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal 
      :isOpen="isDeleteModalOpen"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import ThemeToggle from '../components/Icons/ThemeToggle.vue';
import AddMoreIcon from '../components/Icons/AddMore.vue';
import EditIcon from '../components/Icons/Edit.vue';
import DeleteIcon from '../components/Icons/Delete.vue';
import Sidebar from '../components/Sidebar.vue';
import ProductModal from '../components/NewProductModal.vue';
import { createListResource } from 'frappe-ui';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue';


export default {
  name: 'ProductsPage',
  components: {
    ThemeToggle,
    Sidebar,
    ProductModal,
    AddMoreIcon,
    EditIcon,
    DeleteIcon,
    DeleteConfirmationModal,
  },
  setup() {
    const currentPage = ref('products');
    const isModalOpen = ref(false);
    const selectedProducts = ref([]);
    const isDeleteModalOpen = ref(false);
    const productsToDelete = ref([]);

    const deleteSelectedProducts = () => {
      productsToDelete.value = selectedProducts.value;
      isDeleteModalOpen.value = true;
    };

    const confirmDelete = () => {
      for (const productName of selectedProducts.value) {
          const product = products.data.find(product => product.product_name === productName);
          if (product) {
            console.log('Deleting product:', product.product_name);
            products.delete.submit(product.product_name);
            products.fetch();
          }
        }
      products.fetch();
      isDeleteModalOpen.value = false;
      selectedProducts.value = [];
    };

    const cancelDelete = () => {
      isDeleteModalOpen.value = false;
      productsToDelete.value = [];
    };

    const products = createListResource({
      doctype: 'Product',
      fields: ['image', 'product_name', 'category', 'price'],
      orderBy: 'creation desc',
      start: 0,
      pageLength: 15,
    });
    products.fetch();

    const openModal = () => {
      isModalOpen.value = true;
    };
    
    const closeModal = () => {
      isModalOpen.value = false;
      products.fetch();
    };

    const toggleAllSelection = (event) => {
      if (event.target.checked) {
        selectedProducts.value = products.data.map(product => product.id);
      } else {
        selectedProducts.value = [];
      }
    };

    return {
      currentPage,
      products,
      isModalOpen,
      openModal,
      closeModal,
      selectedProducts,
      toggleAllSelection,
      isDeleteModalOpen,
      deleteSelectedProducts,
      confirmDelete,
      cancelDelete,
    };
  }
}
</script>
