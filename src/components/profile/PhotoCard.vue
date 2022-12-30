<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs } from 'vue'
import Button from '@/components/reusable/Button.vue'
import PostCardFooter from '@/components/post/PostCardFooter.vue'

export default defineComponent({
  name: 'PhotoCard',
  components: {
    Button,
    PostCardFooter,
  },
  emits: ['openModal'],
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      isHovered: false,
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<template>
  <div
    class="post-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <figure class="card-image cursor-pointer relative">
      <img
        class="w-full h-full rounded-md object-cover"
        :src="post?.photo || ''"
        @click="$emit('openModal')" />
      <footer
        v-if="isHovered"
        class="overlay absolute top-0 grid place-items-center">
        <PostCardFooter
          :totalLikes="post?.likes.length || 0"
          :totalComments="post?.comments.length || 0"
          :postId="post?._id"
          variant="white"
          :isIconVariantSolid="true"
          :hideBookmark="true" />
      </footer>
    </figure>
  </div>
</template>
