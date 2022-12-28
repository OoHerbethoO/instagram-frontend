<script lang="ts">
import Button from '@/components/reusable/Button.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UploadBtn',
  components: {
    Button,
  },
  emits: ['handleImage', 'cancelImage'],
  props: {
    image: {
      type: String || null,
      required: true,
    },
  },
})
</script>

<template>
  <Button
    v-if="!image"
    icon="material-symbols:edit"
    variant="outline"
    size="sm"
    class="absolute bg-black bg-opacity-20 border-0"
    icon-class="text-white"
    radius="rounded-full">
    <input
      type="file"
      @change="$emit('handleImage', $event)"
      class="hidden" />
  </Button>
  <Button
    v-else
    icon="iconoir:cancel"
    @click="$emit('cancelImage')"
    variant="outline"
    size="sm"
    class="absolute bg-black bg-opacity-20 border-0"
    icon-class="text-white"
    radius="rounded-full" />
</template>
