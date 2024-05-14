<template>
  <div class="min-h-screen flex items-center justify-center"
    :class="{ 'bg-gray-800': isDarkMode, 'bg-gray-100': !isDarkMode }">
    <DarkModeToggle />
    <div class="absolute top-4 right-4">
      <Button icon="sun" @click="toggleTheme" />
    </div>

    <Card class="max-w-md w-full shadow-lg rounded-lg p-6"
      :class="{ 'bg-gray-700': isDarkMode, 'bg-white': !isDarkMode }">
      <div class="flex justify-center mb-6">
        <img :src="'/src/assets/logo/logo.svg'" alt="Logo" class="h-20" />
      </div>

      <form class="flex flex-col space-y-4" @submit.prevent="submit">
        <div class="p-2">
          <FormControl type="text" size="sm" variant="subtle" placeholder="Enter your email" :disabled="false"
            label="Email" v-model="email" :fill="isDarkMode" />
        </div>

        <div class="p-2">
          <FormControl type="password" size="sm" variant="subtle" placeholder="Enter your password" :disabled="false"
            label="Password" v-model="password" :fill="isDarkMode" />
        </div>

        <Button :variant="'solid'" theme="gray" size="md" label="Login" :loading="loading" :loadingText="'Logging in'"
          :disabled="false" type="submit">
          Login
        </Button>
      </form>
    </Card>
    <div class="fixed bottom-4 right-4">
      <Toast v-if="showToast" :title="toastMessage" :timeout=5 @close="showToast = false" :class="{'bg-red-500': showToast}"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { session } from '../data/session';
import { Button, Card, FormControl, Toast } from 'frappe-ui';
import DarkModeToggle from '../components/DarkModeToggle.vue';
import { useDarkMode } from '../utils/useDarkMode';


const { isDarkMode, toggleTheme } = useDarkMode();

const email = ref('');
const password = ref('');
const showToast = ref(false);
const toastMessage = ref('');
const loading = ref(false);

const submit = async () => {
  loading.value = true;
  try {
    await session.login.submit({
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    console.log("error that I caught: ", error)
    toastMessage.value = 'Invalid email or password';
    showToast.value = true;
  } finally {
    loading.value = false;
  }
};
</script>
