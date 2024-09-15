<template>
  <div class="flex h-screen bg-base-200">
    <!-- Sidebar -->
    <Sidebar 
      :activePage="currentPage"/>
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-base-100 shadow-md">
        <div class="flex items-center justify-between p-4">
            <h1 class="text-xl font-bold ml-4">Home</h1>
          <div class="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-base-200 p-4">
        <h2 class="text-2xl font-bold mb-4">Welcome {{session.user}}</h2>
        <h3 class="text-xl mb-4">The LattePos Platform</h3>
        <div class="space-y-4">
          <div v-for="(item, index) in integrations" :key="index" class="card lg:card-side bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div class="card-actions justify-start">
                <button class="btn btn-primary">Launch</button>
              </div>
            </div>
            <figure><img :src="item.image" :alt="item.title" class="w-full h-48 object-cover" /></figure>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ThemeToggle from '../components/Icons/ThemeToggle.vue';
import Sidebar from '../components/Sidebar.vue';
import { session } from '../data/session';

export default {
  name: 'HomePage',
  components: {
    ThemeToggle,
    Sidebar
  },
  setup() {
    const currentPage = ref('home');
    const integrations = ref([
    { 
        title: 'POS', 
        description: 'An easy to use point of sale with everything a hospitality business needs to grow.',
        image: '/path/to/pos-image.jpg'
      },
      { 
        title: 'Insights', 
        description: 'Stay miles ahead with powerful, effortless reporting for your entire operation.',
        image: '/path/to/insights-image.jpg'
      },
      { 
        title: 'Purchase', 
        description: 'Bring simplicity and efficiency to the way you order stock and manage your purchasing.',
        image: '/path/to/purchase-image.jpg'
      },
    ]);


    return {
      currentPage,
      integrations,
      session
    };
  }
}
</script>