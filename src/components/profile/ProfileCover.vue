<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import Button from '@/components/reusable/Button.vue'
import UploadBtn from '@/components/reusable/UploadBtn.vue'
import useImage from '@/hooks/useImage'

export default defineComponent({
  name: 'ProfileCover',
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
    class="h-52 w-full rounded-md relative"
    :class="isLoading ? 'skeleton' : 'bg-gray-200'">
    <img
      v-if="cover || readAbleImage"
      :src="readAbleImage || cover"
      class="w-full h-full rounded-md"
      alt="" />
    <UploadBtn
      v-if="edit"
      class="top-right top-3 right-3"
      @handleImage="handleImage"
      @cancelImage="cancelImage"
      :image="image" />
  </figure>
</template>
