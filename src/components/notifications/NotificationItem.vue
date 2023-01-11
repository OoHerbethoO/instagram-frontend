<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import FollowOrUnfollowBtn from '../reusable/FollowOrUnfollowBtn.vue'
import { AppRoutes } from '@/constants/routes.constant'
import moment from 'moment'

export default defineComponent({
  name: 'NotificationItem',
  components: {
    Avatar,
    FollowOrUnfollowBtn,
  },
  props: {
    notification: {
      type: Object,
    },
  },
  setup() {
    return { AppRoutes }
  },
  computed: {
    route() {
      return `${AppRoutes.PROFILE}/${this.notification?.sender?._id}`
    },
    text() {
      switch (this.notification?.type) {
        case 'follow':
          return 'started following you'
        case 'like':
          return 'liked your post'
        case 'comment':
          return 'commented on your post'
        case 'mention':
          return 'mentioned you in a post'
        default:
          return ''
      }
    },
    timeAgo() {
      return moment(this.notification.createdAt).fromNow()
    },
  },
})
</script>

<template>
  <div class="notification-item">
    <router-link :to="route">
      <Avatar :src="notification?.sender?.avatar" />
    </router-link>
    <aside class="notification-item-content">
      <div>
        <div>
          <router-link :to="route"
            ><span class="h6 mr-2">{{ notification?.sender?.name }}</span>
          </router-link>
          <span>
            {{ text }}
          </span>
        </div>
        <span class="-text-fs-2 text-gray-600">{{ timeAgo }}</span>
      </div>
      <FollowOrUnfollowBtn
        :userId="notification?.sender?._id"
        v-if="notification?.type === 'follow'"
        size="sm" />
      <Avatar
        :src="notification?.post?.photo"
        radius="rounded"
        v-if="
          notification?.type === 'like' ||
          notification?.type === 'comment' ||
          notification?.type === 'mention'
        " />
    </aside>
  </div>
</template>
