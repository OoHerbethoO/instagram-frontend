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
  <figure class="bg-gray-300 rounded-md">
    <img
      :src="photo || ''"
      class="card-image"
      alt="" />
  </figure>
</template>
