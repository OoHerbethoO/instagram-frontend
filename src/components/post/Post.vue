<script lang="ts">
import { AppRoutes } from '@/constants/routes.constant'
import type { IPost, IUser } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import PostActionsDropdown from './PostActionsDropdown.vue'
import PostContent from './PostContent.vue'
import PostImage from './PostImage.vue'
import PostFooter from './PostFooter.vue'
import PostHeader from './PostHeader.vue'
import moment from 'moment'

export default defineComponent({
  name: 'Post',
  components: {
    Avatar,
    Button,
    PostActionsDropdown,
    PostFooter,
    PostHeader,
    PostContent,
    PostImage,
  },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IUser | null,
      required: true,
    },
    height: String,
    trimText: {
      type: Boolean,
      default: true,
    },
    isPostForProfile: {
      type: Boolean,
      default: false,
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      isCurrentUserPost: false,
      isHovered: false,
    })

    watch(
      () => [props.post, props.me],
      () => {
        if (props.me) {
          state.isCurrentUserPost = props.post.user._id === props.me._id
        }
      },
      { immediate: true }
    )

    return { ...toRefs(state), AppRoutes, moment }
  },
})
</script>

<template>
  <Transition
    name="card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <article
      class="post-card"
      :class="{
        'gap-0': isPostForProfile && !post?.photo,
        'gap-3': isPostForProfile && post?.photo,
      }">
      <PostHeader
        :post="post"
        v-if="!isPostForProfile"
        :me="me" />
      <PostContent
        @openModal="$emit('openModal')"
        :post="post"
        :isModalOpen="isModalOpen"
        :trimText="trimText" />
      <figure class="cursor-pointer relative">
        <PostImage
          :photo="post?.photo"
          @click="$emit('openModal')" />
        <footer
          v-if="isHovered && isPostForProfile"
          class="overlay absolute top-0 grid place-items-center">
          <PostFooter
            :post="post"
            variant="white"
            :isIconVariantSolid="true"
            :hideBookmark="true" />
        </footer>
      </figure>
      <PostFooter
        v-if="!isPostForProfile"
        @openModal="$emit('openModal')"
        :post="post"
        :me="me" />
    </article>
  </Transition>
</template>
