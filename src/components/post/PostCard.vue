<script lang="ts">
import { AppRoutes } from '@/constants/routes.constant'
import type { IPost, IUser } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import PostActionsDropdown from './PostActionsDropdown.vue'
import PostContent from './PostContent.vue'
import PostImage from './PostImage.vue'
import PostCardFooter from './PostCardFooter.vue'
import PostCardHeader from './PostCardHeader.vue'
import moment from 'moment'

export default defineComponent({
  name: 'PostCard',
  components: {
    Avatar,
    Button,
    PostActionsDropdown,
    PostCardFooter,
    PostCardHeader,
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
  },
  setup(props) {
    const state = reactive({
      isCurrentUserPost: false,
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
  <Transition name="card">
    <article class="post-card">
      <PostCardHeader
        :post="post"
        :me="me" />
      <PostContent
        :content="post.content"
        :trimText="trimText" />
      <PostImage
        :photo="post?.photo"
        @click="$emit('openModal')" />
      <PostCardFooter
        :post="post"
        :me="me" />
    </article>
  </Transition>
</template>
