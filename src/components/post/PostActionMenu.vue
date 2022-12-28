<script lang="ts">
import { useDeletePostMutation } from '@/types/graphql.types'
import type { IPost } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import Button from '../reusable/Button.vue'

export default defineComponent({
  name: 'PostActionMenu',
  props: {
    postId: {
      type: String,
      required: true,
    },
    isCurrentUserPost: {
      type: Boolean,
      required: true,
    },
  },
  components: { Button },
  setup(props) {
    const { mutate: deletePost } = useDeletePostMutation({
      refetchQueries: ['Me', 'GetAllPosts', 'GetPostsByUser'],
    })

    const handleDeletePost = () => {
      deletePost({
        postId: props.postId,
      })
    }

    const handleCopyLink = () => {
      navigator.clipboard.writeText(`http://localhost:3000/post/${props.postId}`)
    }

    return {
      handleDeletePost,
      handleCopyLink,
    }
  },
})
</script>

<template>
  <section class="dropdown">
    <Button
      icon="mdi:dots-vertical"
      :data-dropdown-target="`#postActionMenu${postId}`"
      radius="rounded-full"
      size="md"
      variant="transparent" />
    <div
      class="dropdown-menu"
      :id="`postActionMenu${postId}`">
      <div class="dropdown-content">
        <Button
          icon="mdi:trash-can"
          text="Delete"
          v-if="isCurrentUserPost"
          button-class="justify-start font-normal"
          size="md"
          @click="handleDeletePost"
          variant="transparent" />
        <Button
          text="Copy Link"
          icon="material-symbols:content-copy-outline-rounded"
          button-class="justify-start font-normal"
          size="md"
          @click="handleCopyLink"
          variant="transparent" />
      </div>
    </div>
  </section>
</template>
