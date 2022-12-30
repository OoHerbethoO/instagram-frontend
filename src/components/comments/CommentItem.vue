<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Avatar from '@/components/reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import { useLikeCommentMutation, useDeleteCommentMutation } from '@/types/graphql.types'
import type { IComment, IUser } from '@/types/graphql.types'
import { useToast } from 'vue-toastification'
import moment from 'moment'

export default defineComponent({
  name: 'CommentItem',
  components: { Avatar, Button },
  props: {
    comment: {
      type: Object as () => IComment,
      required: true,
    },
    me: {
      type: Object as () => IUser,
      required: true,
    },
  },

  setup(props) {
    const state = reactive({
      isHovered: false,
    })
    const toast = useToast()
    const {
      mutate: likeComment,
      onError: likeCommentOnError,
      loading: likeCommentLoading,
    } = useLikeCommentMutation({
      refetchQueries: ['GetComments'],
    })

    const {
      mutate: deleteComment,
      onError: deleteCommentOnError,
      loading: deleteCommentLoading,
    } = useDeleteCommentMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts'],
    })

    const handleDeleteComment = () => {
      deleteComment({
        commentId: props.comment._id,
      })
    }

    const handleLikeComment = async () => {
      await likeComment({
        commentId: props.comment._id,
      })
    }

    likeCommentOnError((error) => {
      toast.error(error.message)
    })

    deleteCommentOnError((error) => {
      toast.error(error.message)
    })

    return {
      handleLikeComment,
      likeCommentLoading,
      handleDeleteComment,
      deleteCommentLoading,
      ...toRefs(state),
    }
  },

  computed: {
    totalLikes() {
      console.log(this.comment.likes)
      return this.comment.likes.length
    },
    isLiked() {
      return this.comment.likes.some((like) => like === this.me._id)
    },
    isCommentOwner() {
      return this.comment.user._id === this.me._id
    },
    timeAgo() {
      return moment(this.comment.createdAt).fromNow()
    },
  },
})
</script>

<template>
  <div
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="flex items-start gap-x-2 w-full flex-shrink-0">
    <Avatar
      size="md"
      :src="comment.user.avatar" />
    <div class="flex-1">
      <div class="flex justify-between items-center">
        <div>
          <h6>{{ comment.user.name }}</h6>
          <p
            class="text-[12px] text-gray-600"
            v-if="timeAgo">
            {{ timeAgo }}
          </p>
        </div>
        <div class="flex gap-x-1">
          <Button
            icon="mdi:trash-can"
            v-if="isCommentOwner && isHovered"
            :loading="deleteCommentLoading"
            button-class="justify-start font-normal -text-fs-1"
            size="sm"
            radius="rounded-full"
            @click="handleDeleteComment"
            variant="transparent" />
          <div class="flex items-center gap-x-1">
            <Button
              :icon="isLiked ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'"
              button-class="font-normal"
              size="sm"
              :loading="likeCommentLoading"
              @click="handleLikeComment"
              radius="rounded-full"
              :variant="isLiked ? 'like' : 'transparent'" />
            <span :class="'btn-text -text-fs-2 text-gray-500'">{{ totalLikes || 0 }}</span>
          </div>
        </div>
      </div>
      <p class="text-[14px] mt-2">{{ comment.content }}</p>
    </div>
  </div>
</template>
