<script lang="ts">
import { useInfiniteScrollPagination } from '@/hooks/useInfiniteScrollPagination'
import type { IPost } from '@/types/graphql.types'
import { useExplorePostsLazyQuery, useGetPostByIdQuery, useMeQuery } from '@/types/graphql.types'
import { defineComponent, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import PostCardSkeleton from '@/components/skeletons/PostSkeleton.vue'
const CommentList = defineAsyncComponent(() => import('@/components/comments/CommentList.vue'))
const PostCard = defineAsyncComponent(() => import('@/components/post/PostCard.vue'))
const PostList = defineAsyncComponent(() => import('@/components/post/PostList.vue'))
const CreateComment = defineAsyncComponent(() => import('@/components/comments/CreateComment.vue'))
const Button = defineAsyncComponent(() => import('@/components/reusable/Button.vue'))
const Modal = defineAsyncComponent(() => import('@/components/reusable/Modal.vue'))

export default defineComponent({
  components: {
    Modal,
    PostCard,
    CommentList,
    CreateComment,
    PostCardSkeleton,
    Button,
    PostList,
  },
  props: ['id'],
  setup(props) {
    const {
      result: post,
      loading: postLoading,
      error: postError,
      onError,
      onResult,
    } = useGetPostByIdQuery({
      postId: props.id,
    })

    const { skip, limit, loadMore } = useInfiniteScrollPagination()

    const {
      load: loadExplorePosts,
      result: explorePostsData,
      loading: explorePostsLoading,
      error: explorePostsError,
    } = useExplorePostsLazyQuery({
      skip: skip.value,
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

    const { result: meData, loading: meLoading } = useMeQuery()
    return { post, postLoading, meData, explorePostsData, explorePostsLoading }
  },
  computed: {
    posts() {
      return this.explorePostsData?.explorePosts.filter(
        (post: IPost) => post._id !== this.post?.getPostById?._id
      )
    },
  },
})
</script>

<template>
  <div>
    <section class="md:flex gap-8 relative single-post-card">
      <div class="w-[46.4%] overflow-auto">
        <PostCard
          :key="post?.getPostById?._id"
          :me="meData?.me"
          :isAspectSquare="true"
          :trimText="false"
          :post="post?.getPostById" />
      </div>
      <aside
        class="flex-1 flex flex-col justify-between mt-5 md:mt-0 aspect-square md:overflow-auto">
        <div class="flex-1">
          <CommentList
            class="mb-3"
            :key="post?.getPostById?._id"
            :post="post?.getPostById" />
        </div>
        <CreateComment
          class="sticky bottom-0 bg-white"
          :postId="post?.getPostById?._id" />
      </aside>
    </section>
    <PostList
      class="mt-12"
      :posts="posts"
      :loading="explorePostsLoading"
      :columnsOnLgScreens="3"
      :columnsOnMdScreens="3"
      :columnsOnSmScreens="1"
      :isCardPhotoOnly="true"
      v-if="posts"
      :skipPostId="post?.getPostById?._id" />
  </div>
</template>
