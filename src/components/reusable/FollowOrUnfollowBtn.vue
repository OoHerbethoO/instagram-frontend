<script lang="ts">
import { useFollowOrUnfollowUserMutation, useMeQuery } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import Button from './Button.vue'

export default defineComponent({
  name: 'FollowOrUnfollowBtn',
  components: {
    Button,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    size: {
      type: String as () => 'sm' | 'md' | 'lg' | 'default',
      default: 'default',
    },
  },
  setup(props) {
    const { result: me, loading: meLoading, error: meError } = useMeQuery()

    const {
      mutate: followOrUnfollowUser,
      loading: followOrUnfollowUserLoading,
      error: followOrUnfollowUserError,
    } = useFollowOrUnfollowUserMutation({
      refetchQueries: ['GetUserById', 'Me'],
    })

    const handleFollowOrUnfollowUser = async () => {
      followOrUnfollowUser({
        userId: props.userId,
      })
    }

    return {
      me,
      meLoading,
      meError,
      followOrUnfollowUser,
      followOrUnfollowUserLoading,
      followOrUnfollowUserError,
      handleFollowOrUnfollowUser,
    }
  },
  computed: {
    followOrUnfollowBtn(): {
      text: string
      variant: 'primary' | 'outline'
    } {
      return this.me?.me?.following?.includes(this.userId)
        ? {
            text: 'Unfollow',
            variant: 'outline',
          }
        : this.me?.me?.followers?.includes(this.userId)
        ? {
            text: 'Follow Back',
            variant: 'primary',
          }
        : {
            text: 'Follow',
            variant: 'primary',
          }
    },
  },
})
</script>

<template>
  <Button
    :text="followOrUnfollowBtn.text"
    :variant="followOrUnfollowBtn.variant"
    :size="size"
    :disabled="followOrUnfollowUserLoading"
    @click="handleFollowOrUnfollowUser" />
</template>
