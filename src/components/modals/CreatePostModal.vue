<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import Button from '../reusable/Button.vue'
import Avatar from '../reusable/Avatar.vue'
import { useCreatePostMutation } from '@/types/graphql.types'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'CreatePostModal',
  components: { Button, Avatar },
  setup() {
    const toast = useToast()
    const state = reactive({
      image: '',
      readAbleImage: '',
      text: '',
    })

    const { mutate, onDone, onError } = useCreatePostMutation({
      updateQueries: {
        GetPosts: (prev, { mutationResult }) => {
          if (!mutationResult.data) return prev
          const newPost = mutationResult.data.createPost
          return Object.assign({}, prev, {
            getPosts: [newPost, ...prev.getPosts],
          })
        },
        Me: (prev, { mutationResult }) => {
          if (!mutationResult.data) return prev
          const newPost = mutationResult.data.createPost._id
          return Object.assign({}, prev, {
            me: {
              ...prev.me,
              posts: [newPost, ...prev.me.posts],
            },
          })
        },
      },
    })

    const handleImage = (e: any) => {
      const file = e.target.files[0]
      if (!file) return
      state.image = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        state.readAbleImage = reader.result as string
      }
    }

    const handleRemoveImage = () => {
      state.image = ''
      state.readAbleImage = ''
    }

    const handleText = (e: any) => (state.text = e.target.value)

    const handlePost = () => {
      if (!state.text) return
      mutate({
        content: state.text,
        photo: state.image,
      })
    }

    onDone((result) => {
      toast.success('Post created successfully')
      state.text = ''
      state.image = ''
      state.readAbleImage = ''
    })

    onError((error) => {
      toast.error(error.message)
    })

    return {
      ...toRefs(state),
      handleImage,
      handleRemoveImage,
      handleText,
      handlePost,
    }
  },
})
</script>

<template>
  <section
    class="modal"
    id="postModal">
    <section class="modal-content">
      <header class="modal-header">
        <h5 class="header-title">Create Post</h5>
        <Button
          icon="ion:close"
          data-close-button="#postModal"
          variant="transparent"
          radius="rounded-full" />
      </header>
      <main class="modal-body flex items-start gap-x-3">
        <Avatar />
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
              class="w-full h-auto rounded-lg object-cover"
              alt="" />
            <Button
              icon="ion:close"
              size="sm"
              button-class="absolute top-3 right-3 bg-black bg-opacity-40"
              radius="rounded-full"
              @click="handleRemoveImage" />
          </div>
        </div>
      </main>
      <footer class="modal-footer gap-x-2 justify-end">
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
          :disabled="!text && !image"
          size="md"
          @click="handlePost" />
      </footer>
    </section>
  </section>
</template>
