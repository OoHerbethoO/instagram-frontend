<script lang="ts">
import useGallery from '@/hooks/useGallery'
import type { IPost } from '@/types/graphql.types'
import { useMeQuery } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch, defineAsyncComponent } from 'vue'
import PostSkeleton from '@/components/skeletons/PostSkeleton.vue'
const PostCard = defineAsyncComponent(() => import('./PostCard.vue'))
const ViewPostModal = defineAsyncComponent(() => import('./ViewPostModal.vue'))

export default defineComponent({
  name: 'PostList',
  components: { PostCard, PostSkeleton, ViewPostModal },
  props: {
    posts: {
      type: Array as () => Array<IPost>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    isCardPhotoOnly: {
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
      posts: props.posts,
    })

    const handlePostClick = (post: IPost) => {
      state.selectedPost = post
      state.isModalOpen = true
    }

    const handlePrevPost = () => {
      const index = state.posts.findIndex((post) => post._id === state.selectedPost?._id)
      if (index === 0) return
      state.selectedPost = state.posts[index - 1]
    }

    const handleDeletePost = (id) => {
      console.log('handleDelete', id)
      state.posts = state.posts.filter((post) => post._id !== id)
      if (state.isModalOpen) {
        console.log('isModalOpen')
        handleNextPost()
      }
    }

    const handleNextPost = () => {
      const index = state.posts.findIndex((post) => post._id === state.selectedPost?._id)
      if (index === state.posts.length - 1) return
      state.selectedPost = state.posts[index + 1]
    }

    watch(
      () => state.posts,
      () => {
        console.log('state.posts changed')
        if (state.posts.length == 0) {
          state.selectedPost = null
          state.isModalOpen = false
          return
        }

        setData(state.posts)
      }
    )

    watch(
      () => props.posts,
      () => {
        if (state.posts) {
          state.posts = state.posts.filter((post) => {
            return props.posts.find((p) => p._id === post._id)
          })
        }
        state.posts = props.posts
      }
    )

    return {
      ...toRefs(state),
      meData,
      meLoading,
      handlePostClick,
      handlePrevPost,
      handleNextPost,
      handleDeletePost,
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
        :variant="isCardPhotoOnly ? 'photo' : 'card'"
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
        <PostCard
          v-for="post in column1"
          :key="post._id"
          @openModal="handlePostClick(post)"
          @handleDeletePost="handleDeletePost"
          :isCardPhotoOnly="isCardPhotoOnly"
          :me="meData?.me"
          :post="post" />
      </div>
      <div class="gallery-item">
        <PostCard
          v-for="post in column2"
          :key="post._id"
          @handleDeletePost="handleDeletePost"
          @openModal="handlePostClick(post)"
          :me="meData?.me"
          :isCardPhotoOnly="isCardPhotoOnly"
          :post="post" />
      </div>
      <div
        class="gallery-item"
        v-if="columnsOnLgScreens === 3">
        <PostCard
          v-for="post in column3"
          :key="post._id"
          @handleDeletePost="handleDeletePost"
          @openModal="handlePostClick(post)"
          :me="meData?.me"
          :isCardPhotoOnly="isCardPhotoOnly"
          :post="post" />
      </div>
    </div>
    <ViewPostModal
      :isModalOpen="isModalOpen"
      @handleDeletePost="handleDeletePost"
      @close="isModalOpen = false"
      :post="selectedPost"
      @prev="handlePrevPost"
      @next="handleNextPost"
      :isPrevBtnDisabled="!selectedPost || selectedPost._id === posts[0]._id"
      :isNextBtnDisabled="!selectedPost || selectedPost._id === posts[posts.length - 1]._id"
      @open="isModalOpen = true" />
  </div>
</template>
