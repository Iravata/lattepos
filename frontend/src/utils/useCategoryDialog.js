import { ref } from 'vue';

export function useCategoryDialog() {
  const showDialog = ref(false);

  return {
    showDialog,
  };
}
