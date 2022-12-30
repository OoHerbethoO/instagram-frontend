<script lang="ts">
import Avatar from '@/components/reusable/Avatar.vue'
import Button from '@/components/reusable/Button.vue'
import UploadBtn from '@/components/reusable/UploadBtn.vue'
import { AppRoutes } from '@/constants/routes.constant'
import useImage from '@/hooks/useImage'
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'ProfileHeader',
  components: {
    Avatar,
    Button,
    UploadBtn,
  },
  emits: ['handleImage', 'handleName'],
  props: {
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { image, readAbleImage, handleImage, cancelImage } = useImage()

    watch(
      () => image.value,
      (newVal) => {
        if (newVal) emit('handleImage', newVal)
      }
    )

    watch(
      () => props.name,
      (newVal) => {
        if (newVal) emit('handleName', { target: { value: newVal, name: 'name' } })
      }
    )

    return { AppRoutes, image, readAbleImage, handleImage, cancelImage }
  },
})
</script>

<template>
  <div class="-mt-11 pl-1 md:pl-3 flex items-center justify-between z-10">
    <div class="flex gap-x-5 items-center">
      <div class="relative">
        <Avatar
          size="lg"
          :src="readAbleImage || avatar"
          :isLoading="isLoading"
          :text="!edit ? name : ''"
          textClassName="pt-10" />
        <UploadBtn
          class="bottom-right"
          @handleImage="handleImage"
          @cancelImage="cancelImage"
          :image="image"
          v-if="edit" />
      </div>
      <div>
        <input
          v-if="edit"
          v-model="name"
          @input="$emit('handleName', $event)"
          name="name"
          placeholder="Please enter your name"
          class="mt-10 edit-input avatar-text lg w-max"
          type="text" />
        <p class="absolute mt-1 text-danger -text-fs-1">{{ error }}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
