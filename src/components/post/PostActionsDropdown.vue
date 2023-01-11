<script lang="ts">
import { useDeletePostMutation } from '@/types/graphql.types'
import { defineComponent, ref } from 'vue'
import Button from '../reusable/Button.vue'
import Dropdown from '../reusable/Dropdown.vue'
export default defineComponent({
  name: 'PostActionsDropdown',
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
  components: { Button, Dropdown },
  setup(props) {
    const isCopied = ref(false)
    const { mutate: deletePost } = useDeletePostMutation({
      refetchQueries: ['Me', 'GetAllPosts', 'GetPostsByUser', 'ExplorePosts'],
    })

    const handleDeletePost = () =>
      deletePost({
        postId: props.postId,
      })

    const handleCopyLink = () => {
      navigator.clipboard.writeText(`http://localhost:3000/post/${props.postId}`)
      isCopied.value = true
    }

    return {
      handleDeletePost,
      handleCopyLink,
      isCopied,
    }
  },
})
</script>

<template>
  <Dropdown>
    <template v-slot:trigger>
      <Button
        icon="mdi:dots-horizontal"
        radius="rounded-full"
        size="md"
        variant="transparent" />
    </template>
    <template v-slot:menu>
      <Button
        icon="mdi:trash-can"
        text="Delete"
        v-if="isCurrentUserPost"
        button-class="justify-start font-normal -text-fs-1 w-full"
        size="md"
        @click="handleDeletePost"
        variant="transparent" />
      <Button
        :text="isCopied ? 'Copied' : 'Copy Link'"
        :icon="
          !isCopied
            ? `material-symbols:content-copy-outline-rounded`
            : `material-symbols:content-copy-rounded`
        "
        :button-class="`w-full justify-start font-normal -text-fs-1 ${
          isCopied && 'font-bold text-primary-dark'
        }`"
        :icon-class="`${isCopied && 'text-primary-dark'}`"
        size="md"
        @click="handleCopyLink"
        variant="transparent" />
    </template>
  </Dropdown>
</template>
