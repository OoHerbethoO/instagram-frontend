<script lang="ts">
import type { IPost, IUser } from '@/types/graphql.types'
import { useBookmarkPostMutation, useLikePostMutation } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs } from 'vue'
import Button from '../reusable/Button.vue'

export default defineComponent({
  name: 'PostFooter',
  components: {
    Button,
  },
  emits: ['openModal', 'handleLikePost', 'handleBookmarkPost'],
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IUser | null,
      required: true,
    },
    isIconVariantSolid: Boolean,
    hideBookmark: Boolean,
  },
  setup(props, { emit }) {
    const state = reactive({
      bookmarks: props.me?.bookmarks,
    })

    const { mutate: likePost, loading: likePostLoading } = useLikePostMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts', 'GetPostById'],
    })

    const { mutate: bookmarkPost, loading: bookmarkPostLoading } = useBookmarkPostMutation({
      refetchQueries: ['GetBookmarkedPosts', 'Me', 'GetPostById'],
    })

    const handleLikePost = () => {
      emit('handleLikePost')
      likePost({
        postId: props.post._id,
      })
    }

    const handleBookmarkPost = () => {
      emit('handleBookmarkPost')
      bookmarkPost({
        postId: props.post._id,
      })
    }

    return {
      ...toRefs(state),
      handleLikePost,
      handleBookmarkPost,
      bookmarkPostLoading,
      likePostLoading,
    }
  },
  computed: {
    isPostLikedByMe() {
      return this.post.likes.includes(this.me?._id)
    },
    isBookmark() {
      return this.me.bookmarks.includes(this.post._id)
    },
    totalLikes() {
      return this.post.likes.length
    },
    totalComments() {
      return this.post.comments.length
    },
  },
})
</script>

<template>
  <footer class="card-footer gap-x-4">
    <div class="flex gap-x-5">
      <div class="flex items-center gap-1">
        <Button
          :icon="
            isIconVariantSolid
              ? 'mdi:cards-heart'
              : isPostLikedByMe
              ? 'mdi:cards-heart'
              : 'mdi:cards-heart-outline'
          "
          button-class="font-normal"
          size="md"
          radius="rounded-full"
          :variant="isPostLikedByMe ? 'like' : 'transparent'"
          @click="handleLikePost" />
        <span :class="isPostLikedByMe ? 'text-danger' : 'btn-text'">{{ totalLikes }}</span>
      </div>
      <div
        class="flex items-center gap-1"
        @click="$emit('openModal')">
        <Button
          icon="ph:chat-circle-dots-fill"
          button-class="font-normal"
          size="md"
          radius="rounded-full"
          variant="transparent" />
        <span class="btn-text">{{ totalComments }}</span>
      </div>
    </div>
    <Button
      :icon="isBookmark ? 'mingcute:bookmark-fill' : 'mingcute:bookmark-line'"
      v-if="!hideBookmark"
      radius="rounded-full"
      size="md"
      :loading="bookmarkPostLoading"
      @click="handleBookmarkPost"
      variant="transparent" />
  </footer>
</template>
