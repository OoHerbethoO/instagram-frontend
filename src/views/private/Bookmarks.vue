<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useGetBookmarkedPostsQuery } from '@/types/graphql.types'
import EmptyState from '@/components/reusable/EmptyState.vue'
const PostList = defineAsyncComponent(() => import('@/components/post/PostList.vue'))

export default defineComponent({
  name: 'Bookmarks',
  components: { PostList, EmptyState },
  setup() {
    const { result, loading: bookmarksLoading } = useGetBookmarkedPostsQuery()
    return {
      result,
      bookmarksLoading,
    }
  },
})
</script>

<template>
  <header
    class="h4 font-medium"
    v-if="result?.getBookmarkedPosts.length">
    My Bookmarks
  </header>
  <section class="mt-8">
    <PostList
      :posts="result?.getBookmarkedPosts"
      :loading="bookmarksLoading" />
  </section>
  <EmptyState
    v-if="result?.getBookmarkedPosts.length === 0"
    title="You have no bookmarks saved"
    description="Bookmark posts you like to read later"
    icon="/emptyBookmark.svg" />
</template>
