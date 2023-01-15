<script lang="ts">
import Button from '@/components/reusable/Button.vue'
import UploadBtn from '@/components/reusable/UploadBtn.vue'
import useImage from '@/hooks/useImage'
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'CoverPhoto',
  components: {
    Button,
    UploadBtn,
  },
  emits: ['handleImage'],
  props: {
    cover: {
      type: String || null,
      required: true,
    },
    isLoading: Boolean,
    edit: Boolean,
  },
  setup(props, { emit }) {
    const { image, readAbleImage, handleImage, cancelImage } = useImage()

    watch(
      () => image.value,
      (newVal) => {
        if (newVal) emit('handleImage', newVal)
      }
    )

    return {
      image,
      readAbleImage,
      handleImage,
      cancelImage,
    }
  },
})
</script>

<template>
  <figure
    class="h-52 w-full rounded-md relative border border-gray-100"
    :class="isLoading ? 'skeleton' : 'bg-gray-100'">
    <img
      v-if="cover || readAbleImage"
      :src="readAbleImage || cover"
      class="w-full h-full rounded-md"
      alt="" />
    <UploadBtn
      v-if="edit"
      buttonClass="absolute top-2 right-2 outline bg-white"
      @handleImage="handleImage"
      @cancelImage="cancelImage"
      :image="image" />
  </figure>
</template>
