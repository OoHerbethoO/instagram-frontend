<script lang="ts">
import { useMeQuery } from '@/types/graphql.types'
import type { IPost } from '@/types/graphql.types'
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import PostCard from './PostCard.vue'
import PostCardSkeleton from '../skeletons/PostCardSkeleton.vue'
import ViewPostModal from '../modals/ViewPostModal.vue'
import useGallery from '@/hooks/useGallery'

export default defineComponent({
  name: 'PostList',
  components: { PostCard, PostCardSkeleton, ViewPostModal },
  props: {
    posts: {
      type: Array as () => Array<IPost>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const { result: meData, loading: meLoading } = useMeQuery()
    const { column1, column2, column3, setData } = useGallery(props.posts, {
      columnsOnLgScreens: 3,
      columnsOnMdScreens: 2,
      stateSuffix: 'column',
    })

    const state = reactive({
      isModalOpen: false,
      selectedPost: null as IPost | null,
    })

    const handlePostClick = (post: IPost) => {
      state.selectedPost = post
      state.isModalOpen = true
    }

    watch(
      () => props.posts,
      () => {
        if (!props.posts) {
          state.selectedPost = null
          state.isModalOpen = false
          return
        }

        setData(props.posts)
        state.selectedPost =
          props.posts.find((post) => post._id === state.selectedPost?._id) || null
      }
    )

    return {
      ...toRefs(state),
      meData,
      meLoading,
      handlePostClick,
      column1: column1 as IPost,
      column2: column2 as IPost,
      column3: column3 as IPost,
    }
  },
})
</script>

<template>
  <div>
    <div
      v-if="meLoading"
      class="card-gallery">
      <PostCardSkeleton
        v-for="i in 4"
        :key="i" />
    </div>
    <div
      v-else
      class="card-gallery">
      <div class="gallery-item">
        <PostCard
          v-for="post in column1"
          :key="post._id"
          @openModal="handlePostClick(post)"
          :me="meData?.me"
          :post="post" />
      </div>
      <div class="gallery-item">
        <PostCard
          v-for="post in column2"
          :key="post._id"
          @openModal="handlePostClick(post)"
          :me="meData?.me"
          :post="post" />
      </div>
      <div class="gallery-item">
        <PostCard
          v-for="post in column3"
          :key="post._id"
          @openModal="handlePostClick(post)"
          :me="meData?.me"
          :post="post" />
      </div>
    </div>
    <ViewPostModal
      :isModalOpen="isModalOpen"
      @close="isModalOpen = false"
      :post="selectedPost"
      @open="isModalOpen = true" />
  </div>
</template>
