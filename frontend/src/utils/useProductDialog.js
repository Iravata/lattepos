import { ref } from 'vue';

const showDialog = ref(false);

export function useProductDialog() {
  return {
    showDialog,
  };
}
