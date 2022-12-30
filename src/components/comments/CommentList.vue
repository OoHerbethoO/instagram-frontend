<script lang="ts">
import { useGetCommentsQuery, useMeQuery } from '@/types/graphql.types'
import type { IPost } from '@/types/graphql.types'
import { defineComponent, watch } from 'vue'
import CommentItem from './CommentItem.vue'

export default defineComponent({
  name: 'CommentList',
  components: { CommentItem },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
  },
  setup(props) {
    const {
      result: commentsData,
      loading: commentsLoading,
      error: commentsError,
      refetch: commentsRefetch,
    } = useGetCommentsQuery({
      comments: props.post.comments,
    })

    const { result: meData, loading: meLoading, error: meError } = useMeQuery()

    watch(
      () => props.post.comments,
      () => {
        commentsRefetch({ comments: props.post.comments })
      }
    )

    return {
      commentsData,
      commentsLoading,
      commentsError,
      meData,
    }
  },
})
</script>

<template>
  <div class="md:max-h pb-5 overflow-auto">
    <header class="h4 font-medium mb-3 pb-2 sticky top-0 bg-white w-full">Comments</header>
    <section class="flex flex-col items-start gap-6">
      <CommentItem
        v-for="comment in commentsData?.getComments"
        :key="comment._id"
        :comment="comment"
        :me="meData?.me" />
    </section>
  </div>
</template>
