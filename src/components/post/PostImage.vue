<script lang="ts">
import { defineComponent } from 'vue'
import { useImage } from '@vueuse/core'

export default defineComponent({
  name: 'PostImage',
  props: {
    photo: {
      type: String,
      required: true,
    },
    isAspectSquare: {
      type: Boolean,
      default: false,
    },
    isCardPhotoOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { isLoading } = useImage({ src: props.photo })
    return { isImageLoading: isLoading }
  },
})
</script>

<template>
  <div
    v-if="isImageLoading"
    class="bg-gray-200 h-max w-full aspect-square rounded-md skeleton"></div>
  <figure
    class="bg-gray-100 rounded-md"
    v-else>
    <img
      :src="photo || ''"
      class="card-image object-contain"
      :class="[
        isAspectSquare ? 'aspect-square' : 'lg:aspect-auto',
        isCardPhotoOnly ? 'aspect-auto' : 'aspect-square',
      ]"
      alt="" />
  </figure>
</template>
