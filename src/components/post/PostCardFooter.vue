<script lang="ts">
import { useBookmarkPostMutation, useLikePostMutation } from '@/types/graphql.types'
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, watch, toRefs } from 'vue'
import Button from '../reusable/Button.vue'

export default defineComponent({
  name: 'PostCardFooter',
  components: {
    Button,
  },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IPost['user'] | null,
      required: true,
    },
    isIconVariantSolid: Boolean,
    hideBookmark: Boolean,
  },
  setup(props) {
    const state = reactive({
      isLiked: false,
      isBookmark: false,
      totalLikes: 0,
      totalComments: 0,
    })

    const { mutate: likePost } = useLikePostMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts'],
    })

    const { mutate: bookmarkPost, loading: bookmarkPostLoading } = useBookmarkPostMutation({
      refetchQueries: ['GetBookmarkedPosts', 'Me'],
    })

    const handleLikePost = () =>
      likePost({
        postId: props.post._id,
      })

    const handleBookmarkPost = () =>
      bookmarkPost({
        postId: props.post._id,
      })

    watch(
      () => [props.post, props.me],
      () => {
        if (props.me) {
          state.isLiked = props.post.likes.includes(props.me._id)
          state.isBookmark = props.me.bookmarks.includes(props.post._id)
          state.totalLikes = props.post.likes.length
          state.totalComments = props.post.comments.length
        }
      },
      { immediate: true }
    )

    return {
      ...toRefs(state),
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
