<script lang="ts">
import { defineComponent, toRefs, watch, reactive } from 'vue'
import NotificationItem from './NotificationItem.vue'
import Offcanvas from '../reusable/OffCanvas.vue'
import Button from '../reusable/Button.vue'
import {
  useCountUnSeenNotificationsQuery,
  useGetNotificationsQuery,
  useMarkAllNotificationsSeenMutation,
  useNewNotificationSubscription,
} from '@/types/graphql.types'
import type { INotification } from '@/types/graphql.types'
import EmptyState from '../reusable/EmptyState.vue'

export default defineComponent({
  name: 'NotificationOffCanvas',
  components: {
    NotificationItem,
    Offcanvas,
    Button,
    EmptyState,
  },
  setup() {
    const state = reactive({
      notifications: [],
      countUnSeenNotifications: 0,
      isOffCanvasOpen: false,
    })

    const { onResult: onNewNotificationSubscriptionResult } = useNewNotificationSubscription()
    const { onResult: onGetNotificationsResult, loading: getNotificationsLoading } =
      useGetNotificationsQuery()
    const { onResult: countUnSeenNotificationsResult, loading: countUnSeenNotificationsLoading } =
      useCountUnSeenNotificationsQuery()
    const { mutate: markAllNotificationsSeen } = useMarkAllNotificationsSeenMutation({})

    onNewNotificationSubscriptionResult((data: any) => {
      const newNotification: INotification = data.data.newNotification
      if (newNotification.isRemoved) {
        state.notifications = state.notifications.filter(
          (notification) => notification._id !== newNotification._id
        )
      } else {
        const isExist = state.notifications.some(
          (notification) => notification._id === newNotification._id
        )
        if (!isExist) {
          state.notifications = [newNotification, ...state.notifications]
        }
      }
    })

    onGetNotificationsResult((data: any) => {
      state.notifications = data.data.getNotifications.reduce((acc, notification) => {
        if (notification.isRemoved) {
          return acc
        }
        return [...acc, notification]
      }, [])
    })

    watch(
      () => state.notifications,
      (notifications) => {
        state.countUnSeenNotifications = notifications.filter(
          (notification) => !notification.isSeen
        ).length

        if (state.countUnSeenNotifications > 0 && state.isOffCanvasOpen) {
          markAllNotificationsSeen()
        }
      }
    )

    countUnSeenNotificationsResult((data) => {
      state.countUnSeenNotifications = data.data.countUnSeenNotifications
    })

    const onClose = () => {
      if (state.countUnSeenNotifications) {
        state.notifications = state.notifications.map((notification) => {
          return {
            ...notification,
            isSeen: true,
          }
        })
        markAllNotificationsSeen()
      }
      state.isOffCanvasOpen = false
      state.countUnSeenNotifications = 0
    }

    return {
      ...toRefs(state),
      getNotificationsLoading,
      countUnSeenNotificationsLoading,
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
          v-if="!countUnSeenNotificationsLoading && countUnSeenNotifications > 0"
          class="absolute top-0 -right-1 bg-danger -text-fs-3 font-bold h-5 w-5 rounded-full grid place-items-center text-white">
          {{ countUnSeenNotifications }}
        </div>
      </div>
    </template>
    <template v-slot:body>
      <p v-if="getNotificationsLoading">Loading...</p>
      <p
        class="w-full text-center text-gray-400 mt-6"
        v-else-if="notifications?.length === 0">
        <EmptyState
          icon="/emptyNotfication.svg"
          title="No notifications"
          description="You don't have any notifications yet" />
      </p>
      <section
        class="notification-list"
        v-else>
        <NotificationItem
          v-for="notification in notifications"
          :key="notification?._id"
          :notification="notification" />
      </section>
    </template>
  </Offcanvas>
</template>
