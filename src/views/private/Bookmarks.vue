<script lang="ts">
import { useGetBookmarkedPostsQuery } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import PostList from '@/components/post/PostList.vue'

export default defineComponent({
  name: 'Bookmarks',
  components: { PostList },
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
  <header class="h5 font-medium">My Bookmarked ({{ result?.getBookmarkedPosts.length }})</header>
  <section class="mt-8">
    <PostList
      :posts="result?.getBookmarkedPosts"
      :loading="bookmarksLoading" />
  </section>
</template>
