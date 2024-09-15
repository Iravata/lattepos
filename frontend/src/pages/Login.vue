<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="absolute top-4 right-4">
      <ThemeToggle />
    </div>

    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-center mb-6">
          <img src="@/assets/logo/logo.svg" alt="LattePos Logo" class="h-20">
        </div>

        <form @submit.prevent="submit" class="space-y-4">
          <div class="form-control">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Enter your email" 
              class="input input-bordered" 
              required
            >
          </div>
          <div class="form-control">
            <input 
              type="password" 
              v-model="password" 
              placeholder="Enter your password" 
              class="input input-bordered" 
              required
            >
          </div>
          <div class="form-control">
            <button 
              type="submit" 
              class="btn btn-primary"
              :class="{ 'loading': loading }"
            >
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="toast toast-end" v-if="showToast">
      <div class="alert alert-error">
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { session } from '../data/session';
import ThemeToggle from '../components/Icons/ThemeToggle.vue';

export default {
  name: 'LoginPage',
  components: {
    ThemeToggle
  },
  setup() {
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
        console.log("error that I caught: ", error);
        toastMessage.value = 'Invalid email or password';
        showToast.value = true;
        setTimeout(() => {
          showToast.value = false;
        }, 3000);
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      showToast,
      toastMessage,
      loading,
      submit
    };
  }
}
</script>