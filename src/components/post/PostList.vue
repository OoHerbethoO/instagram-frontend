<script lang="ts">
import useGallery from '@/hooks/useGallery'
import type { IPost } from '@/types/graphql.types'
import { useMeQuery } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import ViewPostModal from '../modals/ViewPostModal.vue'
import PostSkeleton from '../skeletons/PostSkeleton.vue'
import Post from './Post.vue'

export default defineComponent({
  name: 'PostList',
  components: { Post, PostSkeleton, ViewPostModal },
  props: {
    posts: {
      type: Array as () => Array<IPost>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    isPostForProfile: {
      type: Boolean,
      default: false,
    },
    columnsOnLgScreens: {
      type: Number,
      default: 3,
    },
    columnsOnMdScreens: {
      type: Number,
      default: 2,
    },
    columnsOnSmScreens: {
      type: Number,
      default: 1,
    },
  },

  setup(props) {
    const { result: meData, loading: meLoading } = useMeQuery()
    const { column1, column2, column3, setData } = useGallery(props.posts, {
      columnsOnLgScreens: props.columnsOnLgScreens,
      columnsOnMdScreens: props.columnsOnMdScreens,
      columnsOnSmScreens: props.columnsOnSmScreens,
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

    const handlePrevPost = () => {
      const index = props.posts.findIndex((post) => post._id === state.selectedPost?._id)
      if (index === 0) return
      state.selectedPost = props.posts[index - 1]
    }

    const handleNextPost = () => {
      const index = props.posts.findIndex((post) => post._id === state.selectedPost?._id)
      if (index === props.posts.length - 1) return
      state.selectedPost = props.posts[index + 1]
    }

    watch(
      () => props.posts,
      () => {
        if (props.posts.length == 0) {
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
      handlePrevPost,
      handleNextPost,
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
      v-if="loading"
      class="card-gallery"
      :class="{
        'profile-page-gallery': columnsOnLgScreens === 2,
      }">
      <PostSkeleton
        v-for="i in 4"
        :variant="isPostForProfile ? 'photo' : 'card'"
        :key="i" />
    </div>
    <div
      v-else
      class="card-gallery"
      :class="{
        'profile-page-gallery': columnsOnLgScreens === 2,
        'explore-page-gallery': columnsOnSmScreens === 2,
      }">
      <div class="gallery-item">
        <Post
          v-for="post in column1"
          :key="post._id"
          @openModal="handlePostClick(post)"
          :isPostForProfile="isPostForProfile"
          :me="meData?.me"
          :post="post" />
      </div>
      <div class="gallery-item">
        <Post
          v-for="post in column2"
          :key="post._id"
          @openModal="handlePostClick(post)"
          :me="meData?.me"
          :isPostForProfile="isPostForProfile"
          :post="post" />
      </div>
      <div
        class="gallery-item"
        v-if="columnsOnLgScreens === 3">
        <Post
          v-for="post in column3"
          :key="post._id"
          @openModal="handlePostClick(post)"
          :me="meData?.me"
          :isPostForProfile="isPostForProfile"
          :post="post" />
      </div>
    </div>
    <ViewPostModal
      :isModalOpen="isModalOpen"
      @close="isModalOpen = false"
      :post="selectedPost"
      @prev="handlePrevPost"
      @next="handleNextPost"
      :isPrevBtnDisabled="!selectedPost || selectedPost._id === posts[0]._id"
      :isNextBtnDisabled="!selectedPost || selectedPost._id === posts[posts.length - 1]._id"
      @open="isModalOpen = true" />
  </div>
</template>
