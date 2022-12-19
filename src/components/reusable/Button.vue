<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'Button',
  components: { Icon },
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button',
    },
    iconDirection: {
      type: String as () => 'left' | 'right',
      default: 'left',
    },
    variant: {
      type: String as () => 'primary' | 'secondary' | 'danger' | 'Default' | 'neobrutalism',
      default: 'primary',
    },
    size: {
      type: String as () => 'sm' | 'md' | 'lg',
      default: 'md',
    },
    radius: {
      type: String as () =>
        | 'rounded'
        | 'rounded-t'
        | 'rounded-r'
        | 'rounded-b'
        | 'rounded-l'
        | 'rounded-tl'
        | 'rounded-tr'
        | 'rounded-br'
        | 'rounded-bl',
      default: 'rounded',
    },
    loadingDirection: {
      type: String as () => 'left' | 'right',
      default: 'left',
    },
    isLoading: Boolean,
    fullWidth: Boolean,
    isDisabled: Boolean,
    icon: String,
  },
})
</script>

<template>
  <button
    class="btn"
    :class="{
      [`${variant}`]: variant,
      [`${size}`]: size,
      [`${radius}`]: radius,
      'w-full': fullWidth,
      loading: isLoading,
      [`${loadingDirection}`]: loadingDirection,
      'btn-icon': !text && icon,
    }"
    :disabled="isDisabled"
    :type="type">
    <span>
      <Icon
        v-if="icon && iconDirection === 'left'"
        :icon="icon" />
    </span>
    <span>{{ text }}</span>
    <span>
      <Icon
        v-if="icon && iconDirection === 'right'"
        :icon="icon" />
    </span>
  </button>
</template>
