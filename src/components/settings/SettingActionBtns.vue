<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/reusable/Button.vue'
export default defineComponent({
  name: 'SettingActionBtns',
  emits: ['handleSubmit'],
  components: {
    Button,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<template>
  <div class="flex gap-x-3">
    <Button
      class="mt-10"
      buttonClass="px-4 -text-fs-1"
      text="Update"
      :isLoading="loading"
      :disabled="loading"
      @click="$emit('handleSubmit')"
      variant="primary" />
  </div>
</template>
