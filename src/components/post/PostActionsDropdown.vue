<script lang="ts">
import { useDeletePostMutation } from '@/types/graphql.types'
import { defineComponent, ref } from 'vue'
import Button from '../reusable/Button.vue'
import Dropdown from '../reusable/Dropdown.vue'
export default defineComponent({
  name: 'PostActionsDropdown',
  emits: ['handleDeletePost'],
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
  setup(props, { emit }) {
    const isCopied = ref(false)
    const { mutate: deletePost } = useDeletePostMutation({
      refetchQueries: ['Me', 'GetAllPosts', 'GetPostsByUser', 'ExplorePosts', 'GetPostById'],
    })

    const handleDeletePost = () => {
      emit('handleDeletePost', props.postId)
      deletePost({
        postId: props.postId,
      })
    }

    const handleCopyLink = () => {
      const url = new URL(window.location.href)
      const postLink = `${url.origin}/post/${props.postId}`
      navigator.clipboard.writeText(postLink)
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
  <Dropdown @onClose="isCopied = false">
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
          isCopied && 'font-bold active-item'
        }`"
        :icon-class="`${isCopied && 'active-item'}`"
        size="md"
        @click="handleCopyLink"
        variant="transparent" />
      <a
        :href="`/post/${postId}`"
        target="_blank">
        <Button
          text="Open in new tab"
          icon="mdi:open-in-new"
          button-class="justify-start font-normal -text-fs-1 w-full"
          size="md"
          variant="transparent" />
      </a>
    </template>
  </Dropdown>
</template>
