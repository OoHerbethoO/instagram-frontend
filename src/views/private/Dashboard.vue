<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
const PostList = defineAsyncComponent(() => import('@/components/post/PostList.vue'))
import { useGetAllPostsQuery } from '@/types/graphql.types'
import EmptyState from '@/components/reusable/EmptyState.vue'

export default defineComponent({
  name: 'Dashboard',
  components: { PostList, EmptyState },
  setup() {
    const { result, loading, error } = useGetAllPostsQuery({ fetchPolicy: 'cache-and-network' })
    return { result, loading, error }
  },
})
</script>

<template>
  <div>
    <PostList
      :posts="result?.getAllPosts"
      :loading="false" />
    <EmptyState
      v-if="result?.getAllPosts.length === 0"
      title="Looks like there's nothing new here"
      description="Follow some more users or groups to fill up your feed"
      icon="/emptyFeed.svg" />
  </div>
</template>
