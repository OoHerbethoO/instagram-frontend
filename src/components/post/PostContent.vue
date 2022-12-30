<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostContent',
  props: {
    content: {
      type: String,
      required: true,
    },
    trimText: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<template>
  <p
    class="card-title"
    :class="{ 'trim-text': trimText }"
    v-if="content">
    {{ content }}
  </p>
</template>
