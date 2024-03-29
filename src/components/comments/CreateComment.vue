<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Input from '@/components/reusable/Input.vue'
import Button from '@/components/reusable/Button.vue'
import { useCreateCommentMutation } from '@/types/graphql.types'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'CreateComment',
  components: { Input, Button },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const toast = useToast()
    const state = reactive({
      comment: '',
    })

    const {
      mutate: createComment,
      onError: createCommentOnError,
      loading: createCommentLoading,
    } = useCreateCommentMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts'],
      updateQueries: {
        GetComments: (prev, { mutationResult }) => {
          if (!mutationResult.data) return prev
          const newComment = mutationResult.data.createComment
          return {
            ...prev,
            getComments: [...prev.getComments, newComment],
          }
        },
      },
    })

    const handleCreateComment = async () => {
      if (!state.comment) return
      const result = await createComment({
        content: state.comment,
        postId: props.postId,
      })

      if (result?.data?.createComment) {
        state.comment = ''
      }
    }

    createCommentOnError((error) => {
      toast.error(error.message)
    })

    return {
      ...toRefs(state),
      createCommentLoading,
      handleCreateComment,
    }
  },
})
</script>

<template>
  <div class="relative">
    <Input
      type="textarea"
      :value="comment"
      @input="comment = $event.target.value"
      placeholder="Write a comment..." />
    <section class="bottom-right absolute bottom-2 right-2 flex items-center gap-x-1">
      <Button
        icon="fluent:emoji-48-filled"
        variant="transparent"
        size="md"
        radius="rounded-full" />
      <Button
        text="Comment"
        :loading="createCommentLoading"
        :disabled="comment.length === 0"
        @click="handleCreateComment"
        size="sm" />
    </section>
  </div>
</template>
