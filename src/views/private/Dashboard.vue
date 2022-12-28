<script lang="ts">
import { defineComponent, watch } from 'vue'
import PostList from '@/components/post/PostList.vue'
import { useGetAllPostsQuery } from '@/types/graphql.types'
export default defineComponent({
  name: 'Dashboard',
  components: { PostList },
  setup() {
    const { result, loading, error } = useGetAllPostsQuery()
    watch(result, () => {
      console.log(result.value?.getAllPosts)
    })
    return { result, loading, error }
  },
})
</script>

<template>
  <div>
    <PostList
      :posts="result?.getAllPosts"
      :loading="loading" />
  </div>
</template>
