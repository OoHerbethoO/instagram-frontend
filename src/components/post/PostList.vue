<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import PostCard from './PostCard.vue'
import PostCardSkeleton from '../skeletons/PostCardSkeleton.vue'

export default defineComponent({
  name: 'PostList',
  components: { PostCard, PostCardSkeleton },
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
})
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="card-galery">
      <PostCardSkeleton
        v-for="i in 4"
        :key="i" />
    </div>
    <div
      v-else
      class="card-galery">
      <PostCard
        v-for="post in posts"
        :key="post._id"
        :post="post" />
    </div>
  </div>
</template>
