<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs } from 'vue'
import PhotoCard from './PhotoCard.vue'
import PostModal from '../post/PostModal.vue'

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
  setup() {
    const state = reactive({
      isModalOpen: false,
      selectedPost: null as IPost | null,
    })

    const handlePostClick = (post: IPost) => {
      state.selectedPost = post
      state.isModalOpen = true
    }

    return { ...toRefs(state), handlePostClick }
  },
})
</script>

<template>
  <main class="grid sm:grid-cols-2 gap-10 flex-1">
    <PhotoCard
      v-for="post in posts"
      :key="post?._id"
      @click="handlePostClick(post)"
      :post="post" />
    <PostModal
      :isModalOpen="isModalOpen"
      @close="isModalOpen = false"
      :post="selectedPost"
      @open="isModalOpen = true" />
  </main>
</template>
