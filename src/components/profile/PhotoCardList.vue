<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import PhotoCard from './PhotoCard.vue'
import PostModal from '../post/PostModal.vue'
import usePhotoGallery from '@/hooks/usePhotoGallery'
export default defineComponent({
  name: 'PhotoCardList',
  components: { PhotoCard, PostModal },
  props: {
    posts: {
      type: Object as () => IPost[],
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { column1, column2, setData } = usePhotoGallery(props.posts, {
      columnsOnLgScreens: 0,
      columnsOnMdScreens: 2,
      stateSuffix: 'column',
    })

    const state = reactive({
      isModalOpen: false,
      selectedPost: null as IPost | null,
    })

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

    const handlePostClick = (post: IPost) => {
      state.selectedPost = post
      state.isModalOpen = true
    }

    return {
      ...toRefs(state),
      handlePostClick,
      column1: column1 as IPost,
      column2: column2 as IPost,
    }
  },
})
</script>

<template>
  <main class="grid sm:grid-cols-2 gap-6">
    <div>
      <PhotoCard
        v-for="post in column1"
        :key="post?._id"
        class="mb-8 md:mb-6"
        @click="handlePostClick(post)"
        :post="post" />
    </div>
    <div>
      <PhotoCard
        v-for="post in column2"
        :key="post?._id"
        class="mb-8 md:mb-6"
        @click="handlePostClick(post)"
        :post="post" />
    </div>
  </main>
  <PostModal
    :isModalOpen="isModalOpen"
    @close="isModalOpen = false"
    :post="selectedPost"
    @open="isModalOpen = true" />
</template>
