<script lang="ts">
import { useBookmarkPostMutation, useLikePostMutation } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import Button from '../reusable/Button.vue'

export default defineComponent({
  name: 'PostCardFooter',
  components: {
    Button,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
    totalLikes: {
      type: Number,
      required: true,
    },
    totalComments: {
      type: Number,
      required: true,
    },
    isLiked: Boolean,
    isBookmark: Boolean,
    isIconVariantSolid: Boolean,
    hideBookmark: Boolean,
  },
  setup(props) {
    const { mutate: likePost } = useLikePostMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts'],
    })

    const { mutate: bookmarkPost, loading: bookmarkPostLoading } = useBookmarkPostMutation({
      refetchQueries: ['GetBookmarkedPosts', 'Me'],
    })

    const handleLikePost = () =>
      likePost({
        postId: props.postId,
      })

    const handleBookmarkPost = () =>
      bookmarkPost({
        postId: props.postId,
      })

    return {
      handleLikePost,
      handleBookmarkPost,
      bookmarkPostLoading,
    }
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
              : isLiked
              ? 'mdi:cards-heart'
              : 'mdi:cards-heart-outline'
          "
          button-class="font-normal"
          size="md"
          radius="rounded-full"
          :variant="isLiked ? 'like' : 'transparent'"
          @click="handleLikePost" />
        <span :class="isLiked ? 'text-danger' : 'btn-text'">{{ totalLikes }}</span>
      </div>
      <div class="flex items-center gap-1">
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
