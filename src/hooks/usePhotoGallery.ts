import { onMounted, reactive, toRefs } from 'vue'

const usePhotoGallery = (data: unknown[]) => {
  const mdScreen = 640
  const xlScreen = 1280

  const state = reactive({
    data: data,
    loading: true,
    column1: [],
    column2: [],
    column3: [],
  })

  const displayLgScreenData = () => {
    state.column1 = state.data.map((post, i) => (i % 3 === 0 ? post : null)).filter(Boolean)
    state.column2 = state.data.map((post, i) => (i % 3 === 1 ? post : null)).filter(Boolean)
    state.column3 = state.data.map((post, i) => (i % 3 === 2 ? post : null)).filter(Boolean)
  }

  const displayMdScreenData = () => {
    state.column1 = state.data.map((post, i) => (i % 2 === 0 ? post : null)).filter(Boolean)
    state.column2 = state.data.map((post, i) => (i % 2 === 1 ? post : null)).filter(Boolean)
    state.column3 = []
  }

  const setData = (data: unknown[]) => {
    state.loading = false
    state.data = data
    if (window.innerWidth >= xlScreen) {
      displayLgScreenData()
    } else if (window.innerWidth >= mdScreen) {
      displayMdScreenData()
    } else {
      state.column1 = data
      state.column2 = []
      state.column3 = []
    }
  }

  onMounted(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= xlScreen) {
        displayLgScreenData()
      } else if (window.innerWidth >= mdScreen) {
        displayMdScreenData()
      } else {
        state.column1 = state.data
        state.column2 = []
        state.column3 = []
      }
    })
  })

  return {
    ...toRefs(state),
    setData,
  }
}

export default usePhotoGallery
