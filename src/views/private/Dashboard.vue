<script lang="ts">
import { defineComponent, watch } from 'vue'
import PostList from '@/components/post/PostList.vue'
import { useGetPostsQuery } from '@/types/graphql.types'
export default defineComponent({
  name: 'Dashboard',
  components: { PostList },
  setup() {
    const { result, loading, error } = useGetPostsQuery()
    watch(result, () => {
      console.log(result.value?.getPosts)
    })
    return { result, loading, error }
  },
})
</script>

<template>
  <div>
    <PostList
      :posts="result?.getPosts"
      :loading="loading" />
  </div>
</template>
