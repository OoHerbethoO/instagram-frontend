<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import NotificationItem from './NotificationItem.vue'
import Offcanvas from '../reusable/OffCanvas.vue'
import Button from '../reusable/Button.vue'
import {
  useCountUnSeenNotificationsQuery,
  useGetNotificationsQuery,
  useMarkAllNotificationsSeenMutation,
} from '@/types/graphql.types'

export default defineComponent({
  name: 'NotificationOffCanvas',
  components: {
    NotificationItem,
    Offcanvas,
    Button,
  },
  setup() {
    const isOffCanvasOpen = ref(false)
    const isThereAnyUnSeenNotifications = ref(false)
    const { result: notifications, loading, error, refetch } = useGetNotificationsQuery()
    const { result: countUnSeenNotificationsResult, loading: countUnSeenNotificationsLoading } =
      useCountUnSeenNotificationsQuery()

    const { mutate: markAllNotificationsSeen } = useMarkAllNotificationsSeenMutation({
      updateQueries: {
        CountUnSeenNotifications: () => {
          return {
            countUnSeenNotifications: 0,
          }
        },
      },
    })

    watch(isOffCanvasOpen, () => {
      if (
        isOffCanvasOpen.value &&
        countUnSeenNotificationsResult?.value.countUnSeenNotifications > 0
      ) {
        markAllNotificationsSeen()
        isThereAnyUnSeenNotifications.value = true
      }
    })

    const onClose = () => {
      if (isThereAnyUnSeenNotifications) refetch()
      isOffCanvasOpen.value = false
      isThereAnyUnSeenNotifications.value = false
    }

    return {
      notifications,
      loading,
      error,
      countUnSeenNotificationsResult,
      countUnSeenNotificationsLoading,
      isOffCanvasOpen,
      onClose,
    }
  },
})
</script>

<template>
  <Offcanvas
    title="Notifications"
    @open="isOffCanvasOpen = true"
    @close="onClose">
    <template v-slot:trigger>
      <div class="relative">
        <Button
          icon="fa-solid:bell"
          radius="rounded-full"
          variant="transparent" />
        <div
          v-if="
            !countUnSeenNotificationsLoading &&
            countUnSeenNotificationsResult?.countUnSeenNotifications > 0
          "
          class="absolute top-0 -right-1 bg-danger -text-fs-3 font-bold h-5 w-5 rounded-full grid place-items-center text-white">
          {{ countUnSeenNotificationsResult?.countUnSeenNotifications }}
        </div>
      </div>
    </template>
    <template v-slot:body>
      <p v-if="loading">Loading...</p>
      <p
        class="w-full text-center text-gray-400 my-2"
        v-else-if="notifications.getNotifications.length === 0">
        There are no notifications
      </p>
      <section
        class="notification-list"
        v-else>
        <NotificationItem
          v-for="notification in notifications.getNotifications"
          :key="notification?._id"
          :notification="notification" />
      </section>
    </template>
  </Offcanvas>
</template>
