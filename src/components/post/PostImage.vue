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
    class="bg-gray-200 h-[350px] w-full rounded-md skeleton"></div>
  <figure
    class="bg-gray-200 rounded-md"
    v-else>
    <img
      :src="photo || ''"
      class="card-image"
      alt="" />
  </figure>
</template>
