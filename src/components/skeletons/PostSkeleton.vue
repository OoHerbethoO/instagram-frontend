<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostCardSkeleton',
})
</script>

<template>
  <article class="post-card">
    <header class="card-header">
      <div class="flex items-center gap-3">
        <div class="avatar skeleton"></div>
        <h1 class="h-6 w-32 rounded skeleton"></h1>
      </div>
      <div class="avatar md skeleton"></div>
    </header>
    <div>
      <h1 class="h-4 w-full rounded skeleton mb-2"></h1>
      <h1 class="h-4 w-full rounded skeleton"></h1>
    </div>
    <div class="card-image skeleton h-64"></div>
    <footer class="card-footer">
      <div class="flex items-center gap-5">
        <div class="avatar skeleton md"></div>
        <div class="avatar skeleton md"></div>
      </div>
      <div class="avatar skeleton md"></div>
    </footer>
  </article>
</template>
