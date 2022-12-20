<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import Button from '../reusable/Button.vue'
import Avatar from '../reusable/Avatar.vue'

export default defineComponent({
  name: 'AddPostModal',
  components: { Button, Avatar },
  setup() {
    const state = reactive({
      image: '',
      readAbleImage: '',
      text: '',
    })

    const handleImage = (e: any) => {
      const file = e.target.files[0]
      state.image = file
      if (!file) return
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

    return {
      ...toRefs(state),
      handleImage,
      handleRemoveImage,
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
            placeholder="What’s Happening ?" />
          <div
            class="relative"
            v-if="readAbleImage">
            <img
              :src="readAbleImage"
              class="w-full h-auto rounded object-cover"
              alt="" />
            <Button
              icon="ion:close"
              size="sm"
              button-class="absolute top-2 right-2 bg-black bg-opacity-40"
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
            @change="handleImage" />
        </Button>
        <Button
          icon="fluent:emoji-48-filled"
          variant="transparent"
          radius="rounded-full" />
        <Button
          text="Post"
          :disabled="!text && !image"
          size="md" />
      </footer>
    </section>
  </section>
</template>
