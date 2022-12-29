import { onMounted, reactive, toRefs } from 'vue'

interface Props {
  lgCols: number
  mdCols: number
  stateSuffix: string
}

const usePhotoGallery = (data: unknown[], props: Props) => {
  const mdScreen = 640
  const xlScreen = 1280

  const cols = {}
  for (let i = 1; i <= props.lgCols; i++) {
    cols[`${props.stateSuffix}${i}`] = []
  }

  const state = reactive({
    data: data,
    loading: true,
    ...cols,
  })

  const displayLgScreenData = () => {
    for (let i = 0; i <= props.lgCols; i++) {
      state[`${props.stateSuffix}${i + 1}`] = state.data
        .map((data: unknown, index: number) => (index % props.lgCols === i ? data : null))
        .filter(Boolean)
    }
  }

  const displayMdScreenData = () => {
    for (let i = 0; i <= props.mdCols; i++) {
      state[`${props.stateSuffix}${i + 1}`] = state.data
        .map((data: unknown, index: number) => (index % props.mdCols === i ? data : null))
        .filter(Boolean)
    }

    for (let i = props.mdCols + 1; i <= props.lgCols; i++) {
      state[`${props.stateSuffix}${i}`] = []
    }
  }

  const displaySmScreenData = () => {
    state[`${props.stateSuffix}${1}`] = state.data
    for (let i = 2; i <= props.lgCols; i++) {
      state[`${props.stateSuffix}${i}`] = []
    }
  }

  const setData = (data: unknown[]) => {
    state.loading = false
    state.data = data
    if (window.innerWidth >= xlScreen) {
      displayLgScreenData()
    } else if (window.innerWidth >= mdScreen) {
      displayMdScreenData()
    } else {
      displaySmScreenData()
    }
  }

  onMounted(() => {
    console.log('mounted', state)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= xlScreen) {
        displayLgScreenData()
      } else if (window.innerWidth >= mdScreen) {
        displayMdScreenData()
      } else {
        displaySmScreenData()
      }
    })
  })

  return {
    ...toRefs(state),
    setData,
  } as any
}

export default usePhotoGallery
