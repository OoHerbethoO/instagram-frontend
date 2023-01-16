import { ref, onMounted, watch } from 'vue'

export function useAutosizeTextarea(minRows = 1) {
  const textareaRef = ref(null)
  console.log('textarea.scrollHeight')

  onMounted(() => {
    const textarea = textareaRef.value
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight - 8}px`
    }
  })

  function updateSize() {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = textareaRef.value.scrollHeight - 8 + 'px'
    }
  }

  watch(
    textareaRef,
    (textarea) => {
      if (textarea) {
        console.log(textarea.scrollHeight)
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    },
    { immediate: true }
  )

  return { textareaRef, updateSize }
}
