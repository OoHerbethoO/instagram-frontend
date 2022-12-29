<script lang="ts">
import PostList from '@/components/post/PostList.vue'
import { useGetAllPostsQuery } from '@/types/graphql.types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard',
  components: { PostList },
  setup() {
    const { result, loading, error } = useGetAllPostsQuery()
    return { result, loading, error }
  },
})
</script>

<template>
  <div>
    <PostList
      :posts="result?.getAllPosts"
      :loading="loading" />
    <br />
  </div>
</template>
