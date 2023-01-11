<script lang="ts">
import { AppRoutes } from '@/constants/routes.constant'
import type { IPost, IUser } from '@/types/graphql.types'
import moment from 'moment'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import PostActionsDropdown from './PostActionsDropdown.vue'

export default defineComponent({
  name: 'PostHeader',
  components: { Avatar, Button, PostActionsDropdown },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IUser | null,
      required: true,
    },
  },
  setup() {
    return { AppRoutes }
  },
  computed: {
    isCurrentUserPost() {
      return this.post.user._id === this.me?._id
    },
    timeAgo() {
      return moment(this.post.createdAt).fromNow()
    },
  },
})
</script>

<template>
  <header class="card-header mb-1">
    <router-link :to="`${AppRoutes.PROFILE}/${post?.user?._id}`">
      <Avatar
        :src="post?.user?.avatar || ''"
        :text="post?.user.name"
        :time="timeAgo"
        size="md"
        class="card-avatar" />
    </router-link>
    <PostActionsDropdown
      :postId="post._id"
      :isCurrentUserPost="isCurrentUserPost" />
  </header>
</template>
