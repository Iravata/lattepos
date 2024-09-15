<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    <div class="relative bg-white rounded-lg p-8 max-w-sm w-full">
      <h3 class="text-lg font-medium mb-4">Are you sure you want to delete?</h3>
      <div class="flex justify-end">
        <button @click="onNo" class="btn btn-ghost mr-2">No</button>
        <button @click="onYes" class="btn btn-primary">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmationModal',
  props: {
    isOpen: Boolean,
  },
  methods: {
    onYes() {
      this.$emit('confirm');
    },
    onNo() {
      this.$emit('cancel');
    },
  },
};
</script>
