<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostImage',
  props: {
    photo: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <figure>
    <img
      :src="photo || ''"
      class="card-image"
      alt="" />
  </figure>
</template>
