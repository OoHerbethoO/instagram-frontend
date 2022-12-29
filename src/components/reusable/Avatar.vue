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
    isLoading: Boolean,
    time: String,
  },
})
</script>

<template>
  <div class="flex gap-x-3 items-center">
    <div
      class="avatar grid place-items-center rounded-full"
      :class="{
        [`${size}`]: size,
        [`${className}`]: className,
        skeleton: isLoading,
      }">
      <img
        v-if="src"
        :src="src"
        class="rounded-full border border-gray-200" />
      <span v-else>
        <Icon
          icon="gridicons:user"
          :class="{
            [`${size}`]: size,
            [`${className}`]: className,
          }"
          class="avatar-icon text-gray-500 rounded-full" />
      </span>
    </div>
    <div>
      <p
        v-if="text"
        class="avatar-text"
        :class="{
          [`${size}`]: size,
          [`${textClassName}`]: textClassName,
        }">
        {{ text }}
      </p>
      <p
        class="-text-fs-3"
        v-if="time">
        {{ time }}
      </p>
    </div>
  </div>
</template>
