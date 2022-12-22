<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'Avatar',
  components: { Icon },
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
      default: 'bg-gray-100',
    },
    textClassName: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <div class="flex gap-x-3 items-center">
    <img
      v-if="src"
      :src="src"
      class="avatar"
      :class="{
        [`${size}`]: size,
        [`${className}`]: className,
      }" />
    <Icon
      v-else
      icon="gridicons:user"
      class="avatar p-3 text-gray-500"
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
