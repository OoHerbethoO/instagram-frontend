<script lang="ts">
import { useExplorePostsLazyQuery } from '@/types/graphql.types'
import { defineComponent, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useInfiniteScrollPagination } from '@/hooks/useInfiniteScrollPagination'
const PostList = defineAsyncComponent(() => import('@/components/post/PostList.vue'))

export default defineComponent({
  name: 'Explore',
  components: { PostList },
  setup() {
    const { limit, loadMore } = useInfiniteScrollPagination()

    const {
      load: loadExplorePosts,
      result: explorePostsData,
      loading: explorePostsLoading,
      error: explorePostsError,
    } = useExplorePostsLazyQuery({
      limit: limit.value,
    })

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore()
        loadExplorePosts()
      }
    }

    onMounted(() => {
      loadExplorePosts()
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      explorePostsData,
      explorePostsLoading,
      explorePostsError,
    }
  },
})
</script>

<template>
  <div>
    <PostList
      :posts="explorePostsData?.explorePosts"
      :loading="explorePostsLoading"
      :columnsOnLgScreens="3"
      :columnsOnMdScreens="3"
      :columnsOnSmScreens="2"
      :isCardPhotoOnly="true"
      v-if="explorePostsData?.explorePosts" />
  </div>
</template>
