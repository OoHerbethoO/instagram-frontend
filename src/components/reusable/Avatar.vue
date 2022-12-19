<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Avatar',
  props: {
    src: {
      type: String,
      required: true,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    size: {
      type: String as () => 'sm' | 'md' | 'default' | 'lg',
      default: 'default',
    },
    className: {
      type: String,
      default: '',
    },
    textClassName: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <div class="flex gap-x-4 items-center">
    <img
      :src="src"
      class="avatar"
      :class="{
        [`${size}`]: size,
        [`${className}`]: className,
      }" />
    <span
      v-if="text"
      class="avatar-text"
      :class="{
        [`${size}`]: size,
        [`${textClassName}`]: textClassName,
      }"
      >{{ text }}</span
    >
  </div>
</template>
