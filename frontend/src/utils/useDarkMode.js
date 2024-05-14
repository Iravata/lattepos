import { ref, watchEffect } from 'vue';

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

// Ensure the theme is applied on initial load
watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode.value);
});

export function useDarkMode() {
  return { isDarkMode, toggleTheme };
}
