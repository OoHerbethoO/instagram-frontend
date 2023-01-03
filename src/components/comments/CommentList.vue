<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { useGetCommentsQuery, useMeQuery } from '@/types/graphql.types'
import { defineComponent, watch } from 'vue'
import CommentItem from './CommentItem.vue'
import CommentItemSkeleton from '../skeletons/CommentItemSkeleton.vue'

export default defineComponent({
  name: 'CommentList',
  components: { CommentItem, CommentItemSkeleton },
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
    } = useGetCommentsQuery({
      comments: props.post.comments,
    })

    const { result: meData, loading: meLoading, error: meError } = useMeQuery()

    return {
      commentsData,
      commentsLoading,
      meData,
    }
  },
})
</script>

<template>
  <div class="md:max-h pb-5 overflow-auto">
    <header class="h4 font-medium mb-3 pb-2 sticky top-0 bg-white w-full z-10">Comments</header>
    <section class="flex flex-col items-start gap-6">
      <template v-if="commentsLoading">
        <CommentItemSkeleton
          v-for="i in 4"
          :key="i" />
      </template>

      <template v-else>
        <CommentItem
          v-for="comment in commentsData?.getComments"
          :key="comment?._id"
          :comment="comment"
          :me="meData?.me" />
      </template>

      <p
        class="w-full text-center text-gray-400 -text-fs-1 my-2"
        v-if="commentsData?.getComments.length === 0">
        No comments yet – be the first to leave a comment!
      </p>
    </section>
  </div>
</template>
