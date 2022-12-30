<script lang="ts">
import useImage from '@/hooks/useImage'
import usePhotoUpload from '@/hooks/usePhotoUpload'
import { useCreatePostMutation, useMeQuery } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs } from 'vue'
import { useToast } from 'vue-toastification'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import Modal from '../reusable/Modal.vue'

export default defineComponent({
  name: 'AddPostModal',
  components: { Button, Avatar, Modal },
  setup($props, { emit: $emit }) {
    const toast = useToast()
    const { result: me } = useMeQuery()
    const { handleUploadPhoto, uploadPhotoLoading } = usePhotoUpload()
    const {
      mutate: uploadPost,
      onError: onCreatePostError,
      loading: postLoading,
    } = useCreatePostMutation({
      refetchQueries: ['GetAllPosts', 'Me', 'GetPostsByUser'],
    })
    const { image, readAbleImage, handleImage, cancelImage } = useImage()

    const state = reactive({
      text: '',
      isModalOpen: false,
    })
    const handleText = (e: any) => (state.text = e.target.value)

    const handleCreatePost = async () => {
      const photo = await handleUploadPhoto(image.value)
      const postResult: any = await uploadPost({
        content: state.text,
        photo,
      })
      if (postResult.data?.createPost) {
        toast.success('Post created successfully')
        state.text = ''
        cancelImage()
        state.isModalOpen = false
      }
    }

    onCreatePostError((error) => toast.error(error.message))

    return {
      ...toRefs(state),
      image,
      readAbleImage,
      postLoading,
      uploadPhotoLoading,
      me,
      handleImage,
      cancelImage,
      handleText,
      handleCreatePost,
    }
  },
})
</script>

<template>
  <Modal
    title="Create Post"
    @close="isModalOpen = false"
    @open="isModalOpen = true"
    :is-open="isModalOpen"
    :modalHeight="'h-max'">
    <template v-slot:trigger>
      <Button
        text="Add Post"
        @click="isModalOpen = true"
        icon="ion:add-circle" />
    </template>
    <template v-slot:modal-body>
      <main class="flex items-start gap-x-2">
        <Avatar :src="me?.me?.avatar || ''" />
        <div class="flex-1">
          <textarea
            class="w-full h-16 text-area pt-2"
            placeholder="What’s Happening ?"
            v-model="text"
            @input="handleText" />
          <div
            class="relative"
            v-if="readAbleImage">
            <img
              :src="readAbleImage"
              class="w-full rounded-lg object-cover"
              alt="" />
            <Button
              icon="ion:close"
              size="sm"
              button-class="absolute top-3 right-3 bg-black bg-opacity-40"
              radius="rounded-full"
              @click="cancelImage" />
          </div>
        </div>
      </main>
    </template>
    <template v-slot:modal-footer>
      <footer class="flex gap-x-2 justify-end">
        <Button
          icon="ph:image-square-fill"
          variant="transparent"
          radius="rounded-full">
          <input
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleImage" />
        </Button>
        <Button
          icon="fluent:emoji-48-filled"
          variant="transparent"
          radius="rounded-full" />
        <Button
          text="Post"
          :disabled="!text || !image"
          :isLoading="postLoading || uploadPhotoLoading"
          type="submit"
          size="md"
          @click="handleCreatePost" />
      </footer>
    </template>
  </Modal>
</template>
