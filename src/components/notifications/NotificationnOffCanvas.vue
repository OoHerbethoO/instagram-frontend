<script lang="ts">
import { defineComponent, ref } from 'vue'
import NotificationItem from './NotificationItem.vue'
import Offcanvas from '../reusable/OffCanvas.vue'
import Button from '../reusable/Button.vue'
import { useGetNotificationsQuery } from '@/types/graphql.types'

export default defineComponent({
  name: 'NotificationOffCanvas',
  components: {
    NotificationItem,
    Offcanvas,
    Button,
  },
  setup() {
    const { result: notifications, loading, error } = useGetNotificationsQuery()
    return { notifications, loading, error }
  },
})
</script>

<template>
  <Offcanvas title="Notifications">
    <template v-slot:trigger>
      <Button
        icon="fa-solid:bell"
        radius="rounded-full"
        variant="transparent" />
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
