<template>
  <div class="flex h-screen" :class="{ 'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode }">
    <DarkModeToggle />
    <AppSidebar />
    <div class="flex-1 max-w-3xl py-12 mx-auto relative">
      <h2 class="font-bold text-lg mb-4">
        Welcome {{ session.user }}!
      </h2>

      <Button theme="gray" variant="solid" icon-left="code" @click="ping.fetch" :loading="ping.loading">
        Click to send 'ping' request
      </Button>
      <div>
        {{ ping.data }}
      </div>
      <pre>{{ ping }}</pre>

      <div class="flex flex-row space-x-2 mt-4">
        <Button @click="showDialog = true">Open Dialog</Button>
        <Button @click="session.logout.submit()">Logout</Button>
      </div>

      <!-- Dialog -->
      <Dialog title="Title" v-model="showDialog"> Dialog content </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog } from 'frappe-ui'
import { createResource } from 'frappe-ui';
import { session } from '../data/session';
import AppSidebar from '../components/Appsidebar.vue';
import DarkModeToggle from '../components/DarkModeToggle.vue'
import { useDarkMode } from '../utils/useDarkMode'

const { isDarkMode } = useDarkMode();

const ping = createResource({
  url: 'ping',
  auto: true,
})

const showDialog = ref(false)
</script>

<style scoped>
/* Add any additional styles here */
</style>
