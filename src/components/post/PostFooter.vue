<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { useBookmarkPostMutation, useLikePostMutation } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs } from 'vue'
import Button from '../reusable/Button.vue'

export default defineComponent({
  name: 'PostFooter',
  components: {
    Button,
  },
  emits: ['openModal'],
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IPost['user'] | null,
    },
    isIconVariantSolid: Boolean,
    hideBookmark: Boolean,
  },
  setup(props) {
    const state = reactive({
      likes: props.post.likes,
      bookmarks: props.me?.bookmarks,
    })

    const { mutate: likePost, loading: likePostLoading } = useLikePostMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts', 'GetPostById'],
    })

    const { mutate: bookmarkPost, loading: bookmarkPostLoading } = useBookmarkPostMutation({
      refetchQueries: ['GetBookmarkedPosts', 'Me', 'GetPostById'],
    })

    const handleLikePost = () => {
      state.likes = state.likes.includes(props.me?._id)
        ? state.likes.filter((id) => id !== props.me?._id)
        : [...state.likes, props.me?._id]
      likePost({
        postId: props.post._id,
      })
    }

    const handleBookmarkPost = () => {
      state.bookmarks = state.bookmarks.includes(props.post._id)
        ? state.bookmarks.filter((id) => id !== props.post._id)
        : [...state.bookmarks, props.post._id]
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
      return this.likes.includes(this.me?._id)
    },
    isBookmark() {
      return this.bookmarks.includes(this.post._id)
    },
    totalLikes() {
      return this.likes.length
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
